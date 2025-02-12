"use client";

import { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-completion`,
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "An error occurred");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || isLoading}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? "Processing..." : "Submit"}
      </button>
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </form>
  );
};

export default function PaymentForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const isDarkMode = localStorage.getItem("theme") === "dark";

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: isDarkMode ? "night" : "stripe",
          variables: {
            colorText: isDarkMode ? "#ffffff" : "#30313d",
            colorBackground: isDarkMode ? "#1a1a1a" : "#ffffff",
          },
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
