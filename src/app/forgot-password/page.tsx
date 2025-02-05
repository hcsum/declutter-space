import { ForgotPasswordForm } from "./forgot-password-form";

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const token = searchParams.token;

  return <ForgotPasswordForm token={token} />;
}
