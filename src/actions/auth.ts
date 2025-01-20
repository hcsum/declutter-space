"use server";
// https://nextjs.org/docs/app/building-your-application/authentication

import { createSession, deleteSession } from "@/lib/session";
import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
} from "@/lib/definitions";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Use bcryptjs instead
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // Create user session
  await createSession(user.id);

  // Redirect user to main page
  redirect("/dashboard");
}

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  // If no user found or password doesn't match
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      message: "Invalid email or password",
    };
  }

  // Create user session
  await createSession(user.id);

  // Redirect user to main page
  redirect("/main");
}

export async function logout() {
  deleteSession();
  redirect("/login");
}
