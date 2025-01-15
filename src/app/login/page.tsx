"use client";

import { login } from "@/actions/auth";
import AuthForm from "@/components/SignupLoginForm";

export default function LoginForm() {
  return <AuthForm formType="login" action={login} />;
}
