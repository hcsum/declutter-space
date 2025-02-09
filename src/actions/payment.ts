"use server";

import { stripe } from "@/lib/stripe";
import { verifySession } from "@/lib/session";

export async function createPaymentIntent() {
  try {
    const { userId } = await verifySession();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 300, // Stripe expects amounts in cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        userId,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error creating payment intent");
  }
}
