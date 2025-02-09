"use server";

import { verifySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "expired"
  | "free_trial";

export async function checkSubscriptionStatus(): Promise<SubscriptionStatus> {
  try {
    const { userId } = await verifySession();

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    console.log("subscription", subscription);

    if (!subscription) {
      return "free_trial";
    }

    if (subscription.canceledAt) {
      return "canceled";
    }

    const now = new Date();

    if (subscription.currentPeriodEnd < now) {
      return "expired";
    }

    return "active";
  } catch (error) {
    console.error("Error checking subscription:", error);
    return "expired";
  }
}
