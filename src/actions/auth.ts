"use server";
// https://nextjs.org/docs/app/building-your-application/authentication

import { createSession, deleteSession } from "@/lib/session";
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
import { encrypt, decrypt } from "@/lib/jwt";

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
      message: "An error occurred while creating your account.",
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
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id);

  redirect("/dashboard");
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
      const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour
      const token = await encrypt({ userId: user.id, exp: expiresAt });
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
    const decryptedToken = await decrypt(token as string);

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
