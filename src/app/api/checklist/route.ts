import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { loadChecklistState, saveChecklistState } from "@/lib/checklist-db";
import { normalizeChecklistState } from "@/app/declutter-checklist/lib/state";

async function getUserIdFromSession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  const userId = typeof session?.userId === "string" ? session.userId : null;
  return userId;
}

export async function GET() {
  const userId = await getUserIdFromSession();

  if (!userId) {
    return NextResponse.json({
      loggedIn: false,
      hasData: false,
      state: null,
    });
  }

  const result = await loadChecklistState(userId);
  return NextResponse.json({
    loggedIn: true,
    hasData: result.hasData,
    state: result.hasData ? result.state : null,
  });
}

export async function PUT(request: Request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = normalizeChecklistState(await request.json());
    await saveChecklistState(userId, payload);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("checklist put failed", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
