"use client";

import PaymentForm from "@/components/PaymentForm";
import { createPaymentIntent } from "@/actions/payment";
import useSWR from "swr";

export default function PaymentPage() {
  const { data, error, isLoading } = useSWR(
    "payment-intent",
    createPaymentIntent,
  );
  const clientSecret = data?.clientSecret;

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">
            Error
          </h2>
          <p className="text-red-600 dark:text-red-400">
            Unable to initialize payment. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !clientSecret) {
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
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Subscription Details
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600 dark:text-gray-300">
            Monthly subscription
          </span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            $3.00
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          You will be charged $3.00 every month. Cancel anytime.
        </p>
      </div>
      <PaymentForm clientSecret={clientSecret} />
    </div>
  );
}
