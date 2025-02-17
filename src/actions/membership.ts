"use server";

// https://docs.stripe.com/billing/quickstart
// https://docs.stripe.com/billing/subscriptions/build-subscriptions this is the way to go

import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function checkMembershipStatus(): Promise<
  (Stripe.Subscription & { isActive: boolean }) | null
> {
  try {
    const { userId } = await verifySession();
    const membership = await prisma.membership.findUnique({
      where: { userId },
    });

    if (!membership) {
      return null;
    }

    // https://docs.stripe.com/api?lang=node
    const sub = await stripe.subscriptions.retrieve(
      membership.stripeSubscriptionId!,
    );

    return {
      ...sub,
      isActive: sub.status === "active",
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
      select: { stripeCustomerId: true, email: true },
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
          price:
            user.email === "sumtsui@outlook.com"
              ? process.env.STRIPE_PRICE_ID_TEST!
              : process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: { userId },
      success_url: `${process.env.SITE_URL}/dashboard/user`,
      cancel_url: `${process.env.SITE_URL}/dashboard/user`,
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
