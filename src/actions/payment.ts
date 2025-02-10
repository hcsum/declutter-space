"use server";

import { stripe } from "@/lib/stripe";
import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function createPaymentIntent() {
  try {
    const { userId } = await verifySession();

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
      select: { stripeCustomerId: true },
    });

    const customerId =
      subscription?.stripeCustomerId ||
      (
        await stripe.customers.create({
          metadata: { userId },
        })
      ).id;

    // Create a subscription
    const newSubscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID! }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      metadata: { userId },
    });

    const invoice = newSubscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error creating subscription");
  }
}
