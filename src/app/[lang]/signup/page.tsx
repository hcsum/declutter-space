import AuthForm from "@/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function SignupForm() {
  return <AuthForm formType="signup" />;
}
