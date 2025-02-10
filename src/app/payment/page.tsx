"use client";

import { useEffect, useState } from "react";
import PaymentForm from "@/components/PaymentForm";
import { createPaymentIntent } from "@/actions/payment";

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent()
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error("Payment Intent Error:", error));
  }, []);

  if (!clientSecret) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 pb-20">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Ready to complete your payment?
      </h1>
      <PaymentForm clientSecret={clientSecret} />
    </div>
  );
}
