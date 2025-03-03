import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
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
      case "checkout.session.completed": {
        const checkoutSession = event.data.object as Stripe.Checkout.Session;
        const user = await prisma.user.findUniqueOrThrow({
          where: {
            id: checkoutSession.metadata!.userId as string,
          },
        });

        const membership = await prisma.membership.findFirst({
          where: {
            stripeSubscriptionId: checkoutSession.subscription as string,
          },
        });

        if (!membership) {
          await prisma.membership.create({
            data: {
              stripeSubscriptionId: checkoutSession.subscription as string,
              userId: user.id,
            },
          });
        }
        break;
      }
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("invoice", invoice);

        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("invoice", invoice);
        // notify customer to update payment method
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
