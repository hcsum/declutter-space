"use server";

import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

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

    return { success: true };
  } catch (error) {
    console.error("Error canceling membership:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
