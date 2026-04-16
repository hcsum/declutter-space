"use client";

import { verifyUserByEmail } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useI18n } from "@/i18n/i18n-provider";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const [errmsg, setErrmsg] = useState("");
  const router = useRouter();
  const { t, localePath } = useI18n();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push(localePath("/login"));
      return;
    }

    const verifyEmail = async () => {
      const { errmsg } = await verifyUserByEmail(token);
      if (errmsg) {
        setErrmsg(errmsg);
      }
    };

    verifyEmail();
  }, [token, router, localePath]);

  if (errmsg) {
    return (
      <div className="text-center p-2">
        <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
          {t("verifyEmail.cantVerify")}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{errmsg}</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <CircularProgress size={40} className="mb-4" />
      <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        {t("verifyEmail.verifying")}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t("verifyEmail.pleaseWait")}
      </p>
    </div>
  );
}

export default function VerifyEmailPage() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Suspense
        fallback={
          <div className="text-center">
            <CircularProgress size={40} className="mb-4" />
            <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t("verifyEmail.loading")}
            </h1>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
