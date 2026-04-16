"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useI18n } from "@/i18n/i18n-provider";

function PaymentCompletionContent() {
  const [status, setStatus] = useState<string>("processing");
  const searchParams = useSearchParams();
  const { t, localePath } = useI18n();

  useEffect(() => {
    const success = searchParams.get("success");
    if (success) {
      setStatus("succeeded");
    } else {
      setStatus("canceled");
    }
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto p-6 text-center text-gray-800 dark:text-gray-200">
      {status === "succeeded" ? (
        <>
          <h1 className="text-2xl font-bold text-green-600 mb-4 mt-20">
            {t("payment.successTitle")}
          </h1>
          <p className="mb-4">{t("payment.successMessage")}</p>
          <Link
            href={localePath("/dashboard")}
            className="text-blue-500 hover:text-blue-700"
          >
            {t("payment.returnToDashboard")}
          </Link>
        </>
      ) : status === "processing" ? (
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          {t("payment.processing")}
        </h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            {t("payment.failedTitle")}
          </h1>
          <p className="mb-4">{t("payment.failedMessage")}</p>
        </>
      )}
    </div>
  );
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function PaymentCompletion() {
  const { t } = useI18n();
  return (
    <Elements stripe={stripePromise}>
      <Suspense fallback={<div>{t("payment.loading")}</div>}>
        <PaymentCompletionContent />
      </Suspense>
    </Elements>
  );
}
