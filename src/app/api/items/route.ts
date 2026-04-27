import { NextResponse } from "next/server";
import { getItems } from "@/actions/items";

export async function GET() {
  try {
    const { items } = await getItems(1, 30);
    const serialized = items.map((item) => ({
      id: item.id,
      name: item.name,
      deadline: item.deadline.toISOString(),
      startDate: item.startDate.toISOString(),
      image: item.image ?? null,
    }));
    return NextResponse.json({ items: serialized });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
