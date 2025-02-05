"use client";

import { verifyUserByEmail } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { CircularProgress } from "@mui/material";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [errmsg, setErrmsg] = useState("");
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const verifyEmail = async () => {
      const { errmsg } = await verifyUserByEmail(token);
      console.log("errmsg", errmsg);
      if (errmsg) {
        setErrmsg(errmsg);
      }
    };

    verifyEmail();
  }, [token, router]);

  if (errmsg) {
    return (
      <div className="text-center p-2">
        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          Can&apos;t verify your email
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{errmsg}</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <CircularProgress size={40} className="mb-4" />
      <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        Verifying your email...
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Please wait while we verify your email address.
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Suspense
        fallback={
          <div className="text-center">
            <CircularProgress size={40} className="mb-4" />
            <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              Loading...
            </h1>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
