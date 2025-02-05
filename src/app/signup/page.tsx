import { signup } from "@/actions/auth";
import AuthForm from "@/components/AuthForm";

export default function SignupForm() {
  return <AuthForm formType="signup" action={signup} />;
}
