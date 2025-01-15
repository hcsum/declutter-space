"use client";

import { signup } from "@/actions/auth";
import AuthForm from "@/components/SignupLoginForm";

export default function SignupForm() {
  return <AuthForm formType="signup" action={signup} />;
}
