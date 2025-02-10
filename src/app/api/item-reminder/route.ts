import { BrevoAdapter } from "@/lib/brevo";
import prisma from "@/lib/prisma";
import { groupBy } from "lodash";

// todo: add secret
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const expiringItems = await prisma.item.findMany({
      where: {
        deadline: {
          gte: today,
          lt: tomorrow,
        },
      },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });

    const groupedItems = groupBy(expiringItems, "user.email");

    const brevo = BrevoAdapter.getInstance();

    for (const email in groupedItems) {
      const items = groupedItems[email];
      await brevo.sendItemDeadlineReachedEmail({ items, user: items[0].user });
    }
    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending item reminder emails:", error);
    return Response.json(
      { error: "Failed to send item reminder emails" },
      { status: 500 },
    );
  }
}
