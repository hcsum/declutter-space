"use server";

import { stripe } from "@/lib/stripe";

export async function createPaymentIntent() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 300, // Stripe expects amounts in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error creating payment intent");
  }
}
