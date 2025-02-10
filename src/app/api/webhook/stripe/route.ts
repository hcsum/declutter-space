import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log("invoice", invoice);
        if (invoice.subscription) {
          const stripeSubscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string,
          );

          await prisma.membership.upsert({
            where: { userId: stripeSubscription.metadata.userId },
            create: {
              userId: stripeSubscription.metadata.userId,
              stripeSubscriptionId: stripeSubscription.id,
              currentPeriodEnd: new Date(
                stripeSubscription.current_period_end * 1000,
              ),
            },
            update: {
              currentPeriodEnd: new Date(
                stripeSubscription.current_period_end * 1000,
              ),
            },
          });
        }
        break;
      }

      case "customer.subscription.deleted": {
        const stripeSubscription = event.data.object as Stripe.Subscription;

        await prisma.membership.update({
          where: { userId: stripeSubscription.metadata.userId },
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
