"use server";

// https://docs.stripe.com/billing/quickstart
// https://docs.stripe.com/billing/subscriptions/build-subscriptions
// freaking confusing

import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export type MembershipStatus = Stripe.Subscription.Status;

export async function checkMembershipStatus(): Promise<Stripe.Subscription | null> {
  try {
    const { userId } = await verifySession();
    const membership = await prisma.membership.findUnique({
      where: { userId },
    });

    if (!membership) {
      return null;
    }

    const sub = await stripe.subscriptions.retrieve(
      membership.stripeSubscriptionId!,
    );

    return {
      ...sub,
      current_period_end: sub.current_period_end * 1000,
      current_period_start: sub.current_period_start * 1000,
      cancel_at: sub.cancel_at ? sub.cancel_at * 1000 : null,
      canceled_at: sub.canceled_at ? sub.canceled_at * 1000 : null,
    };
  } catch (error) {
    console.error("Error checking subscription:", error);
    throw new Error("fail to check memebership status");
  }
}

export async function createStripeSession() {
  try {
    const { userId } = await verifySession();

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    let customerId = user.stripeCustomerId;
    if (!customerId) {
      customerId = (
        await stripe.customers.create({
          metadata: { userId },
        })
      ).id;
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: { userId },
      success_url: `${process.env.SITE_URL}/payment-completion?success=1`,
      cancel_url: `${process.env.SITE_URL}/payment-completion?canceled=1`,
    });

    return { url: session.url, sessionId: session.id };
  } catch (e) {
    console.error("Error:", e);
    throw new Error("Error creating subscription");
  }
}

export async function createStripePortalSession() {
  try {
    const { userId } = await verifySession();

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { stripeCustomerId: true },
    });

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId!,
      return_url: `${process.env.SITE_URL}/dashboard/user`,
    });

    return { url: session.url, sessionId: session.id };
  } catch (e) {
    console.error("Error:", e);
    throw new Error("Error creating portal session");
  }
}
