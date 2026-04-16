import { ForgotPasswordForm } from "./forgot-password-form";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const token = (await searchParams).token;

  return <ForgotPasswordForm token={token} />;
}
