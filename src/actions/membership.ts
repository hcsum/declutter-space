"use server";

import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { revalidatePath } from "next/cache";

export type MembershipStatus = "active" | "canceled" | "expired" | "free_trial";

export async function checkMembershipStatus(): Promise<{
  status: MembershipStatus;
  currentPeriodEnd: Date | null;
}> {
  try {
    const { userId } = await verifySession();
    const membership = await prisma.membership.findUnique({
      where: { userId },
    });

    if (!membership) {
      return { status: "free_trial", currentPeriodEnd: null };
    }

    const now = new Date();

    // Check expiration first
    if (membership.currentPeriodEnd && membership.currentPeriodEnd < now) {
      return {
        status: "expired",
        currentPeriodEnd: membership.currentPeriodEnd,
      };
    }

    // If not expired, check if it's canceled
    if (membership.canceledAt) {
      return {
        status: "canceled",
        currentPeriodEnd: membership.currentPeriodEnd,
      };
    }

    // If there's a valid subscription that's not expired or canceled, it's active
    if (membership.currentPeriodEnd) {
      return {
        status: "active",
        currentPeriodEnd: membership.currentPeriodEnd,
      };
    }

    // Fallback to free trial
    return { status: "free_trial", currentPeriodEnd: null };
  } catch (error) {
    console.error("Error checking subscription:", error);
    return { status: "expired", currentPeriodEnd: null };
  }
}

export async function cancelMembership() {
  try {
    const { userId } = await verifySession();

    const membership = await prisma.membership.findUnique({
      where: { userId },
      select: { stripeSubscriptionId: true },
    });

    if (!membership || !membership.stripeSubscriptionId) {
      throw new Error("No active membership found");
    }

    // Cancel the Stripe subscription
    await stripe.subscriptions.update(membership.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update the membership in the database
    await prisma.membership.update({
      where: { userId },
      data: { canceledAt: new Date() },
    });

    revalidatePath("/dashboard/user");
  } catch (error) {
    console.error("Error canceling membership:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export async function createPaymentIntent() {
  try {
    const { userId } = await verifySession();

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { stripeCustomerId: true, id: true },
    });

    const customerId =
      user?.stripeCustomerId ||
      (
        await stripe.customers.create({
          metadata: { userId },
        })
      ).id;

    // Save the customerId if it's new
    if (!user?.stripeCustomerId) {
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      });
    }

    const membership = await prisma.membership.findUnique({
      where: {
        userId: user.id,
      },
    });

    const subscription =
      membership && membership.stripeSubscriptionId
        ? await stripe.subscriptions.retrieve(membership.stripeSubscriptionId)
        : await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: process.env.STRIPE_PRICE_ID! }],
            payment_behavior: "default_incomplete",
            expand: ["latest_invoice.payment_intent"],
            metadata: { userId },
          });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error creating subscription");
  }
}
