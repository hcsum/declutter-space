"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentCompletionContent() {
  const [status, setStatus] = useState<"success" | "failure" | "processing">(
    "processing",
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");

    if (paymentIntent) {
      setStatus("success");
    }
  }, [searchParams]);

  return (
    <div className="max-w-md mx-auto p-6 text-center text-gray-800 dark:text-gray-200">
      {status === "success" ? (
        <>
          <h1 className="text-2xl font-bold text-green-600 mb-4 mt-20">
            Payment Successful
          </h1>
          <p className="mb-4">
            Thank you for your purchase. Let&apos;s get started
          </p>
        </>
      ) : status === "processing" ? (
        <h1 className="text-2xl font-bold text-yellow-600 mb-4">
          Processing payment...
        </h1>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Payment Failed
          </h1>
          <p className="mb-4">
            Something went wrong with your payment. Please try again. If the
            problem persists, please contact hi@declutterspace.net.
          </p>
        </>
      )}
      <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
        Return to Dashboard
      </Link>
    </div>
  );
}

export default function PaymentCompletion() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentCompletionContent />
    </Suspense>
  );
}
