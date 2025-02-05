"use client";

import { verifyUserByEmail } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const verifyEmail = async () => {
      const { errmsg } = await verifyUserByEmail(token);
      if (errmsg) {
        router.push("/login");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <CircularProgress size={40} className="mb-4" />
        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          Verifying your email...
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Please wait while we verify your email address.
        </p>
      </div>
    </div>
  );
}
