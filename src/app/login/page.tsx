import { login } from "@/actions/auth";
import AuthForm from "@/components/AuthForm";

export default function LoginForm() {
  return <AuthForm formType="login" action={login} />;
}
