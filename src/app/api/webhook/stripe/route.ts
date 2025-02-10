import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// this help make the api public in Vercel preview?
// by default, Vercel guard all api routes in preview.
export const config = {
  api: {
    bodyParser: false,
  },
  runtime: "edge",
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(req: Request) {
  if (req.body === null) {
    return NextResponse.json({ error: "No body provided" }, { status: 400 });
  }

  console.log("webhook received");
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    console.log("event", event);

    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.upsert({
          where: { userId: subscription.metadata.userId },
          create: {
            userId: subscription.metadata.userId,
            stripeId: subscription.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          update: {
            stripeId: subscription.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { userId: subscription.metadata.userId },
          data: {
            canceledAt: new Date(),
          },
        });
        break;
      }
    }

    console.log("webhook processed");

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 },
    );
  }
}
