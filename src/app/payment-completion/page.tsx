"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function PaymentCompletionContent() {
  const [status, setStatus] = useState<string>("processing");

  const searchParams = useSearchParams();

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
            Payment Successful
          </h1>
          <p className="mb-4">
            Thank you for your purchase. Let&apos;s get started
          </p>
          <Link href="/dashboard" className="text-blue-500 hover:text-blue-700">
            Return to Dashboard
          </Link>
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
    </div>
  );
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function PaymentCompletion() {
  return (
    <Elements stripe={stripePromise}>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentCompletionContent />
      </Suspense>
    </Elements>
  );
}
