"use server";
// https://nextjs.org/docs/app/building-your-application/authentication

import { createSession, deleteSession, verifySession } from "@/lib/session";
import {
  SignupFormSchema,
  AuthFormState,
  LoginFormSchema,
  ForgotPasswordFormSchema,
  ResetPasswordFormSchema,
} from "@/lib/definitions";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { BrevoAdapter } from "@/lib/brevo";
import { createUser1HToken, verifyUser1HToken } from "@/lib/jwt";

const brevo = BrevoAdapter.getInstance();

export async function signup(state: AuthFormState, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = SignupFormSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: { name: name as string, email: email as string },
    };
  }

  const {
    name: parsedName,
    email: parsedEmail,
    password: parsedPassword,
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(parsedPassword, 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: parsedEmail },
  });

  if (existingUser) {
    return {
      errmsg: "User already exists. Please login instead.",
    };
  }

  const user = await prisma.user.create({
    data: {
      email: parsedEmail,
      name: parsedName,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      errmsg: "An error occurred while creating your account.",
    };
  }

  const token = await createUser1HToken(user.id);

  await brevo.sendVerificationEmail(parsedEmail, token);

  return {
    message:
      "Account created successfully. Please check your email for a verification link.",
  };
}

export async function login(state: AuthFormState, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: { email: email as string },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: email as string },
  });

  if (!user || !(await bcrypt.compare(password as string, user.password))) {
    return {
      errmsg: "Invalid email or password",
      formData: { email: email as string },
    };
  }

  await createSession(user.id);

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function forgotPassword(
  state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = formData.get("email");

  const validatedFields = ForgotPasswordFormSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });

    if (user) {
      const token = await createUser1HToken(user.id);
      await brevo.sendPasswordResetEmail(email as string, token);
    }

    return {
      message:
        "If an account exists with this email, you will receive a password reset link shortly.",
    };
  } catch (error) {
    console.error(error);
    return {
      errmsg: "An error occurred while sending the password reset link.",
    };
  }
}

export async function resetPassword(
  state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const token = formData.get("token");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const validatedFields = ResetPasswordFormSchema.safeParse({
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const decryptedToken = await verifyUser1HToken(token as string);

    if (!decryptedToken) {
      return {
        errmsg:
          "Invalid link or the link has expired. Please request a new one.",
      };
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);

    await prisma.user.update({
      where: { id: decryptedToken.userId as string },
      data: { password: hashedPassword },
    });

    return {
      message: "Password reset successful",
    };
  } catch (error) {
    console.error(error);
    return {
      errmsg: "An error occurred while resetting your password.",
    };
  }
}

export async function verifyUserByEmail(token: string) {
  const decryptedToken = await verifyUser1HToken(token);
  if (!decryptedToken) {
    return {
      errmsg: "Invalid link or the link has expired. Please request a new one.",
    };
  }

  try {
    await prisma.user.update({
      where: { id: decryptedToken.userId as string },
      data: { isVerified: true },
    });

    await createSession(decryptedToken.userId as string);
    redirect("/dashboard");
  } catch (error) {
    console.error("Failed to verify email", error);
    return {
      errmsg: "An error occurred while verifying your email. Please try again.",
    };
  }
}

export async function sendVerificationEmail() {
  try {
    const { userId } = await verifySession();
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    const token = await createUser1HToken(userId);
    await brevo.sendVerificationEmail(user?.email as string, token);

    return {
      sent: true,
    };
  } catch (error) {
    console.error("Failed to send verification email", error);
    return {
      errmsg:
        "Fail to send verification email. Please contact us for assistance.",
    };
  }
}
