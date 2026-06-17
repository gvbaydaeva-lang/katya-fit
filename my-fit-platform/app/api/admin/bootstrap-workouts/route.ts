import { NextResponse } from "next/server";
import { ensureWorkoutsSchema } from "@/lib/admin/ensure-workouts-schema";
import { assertTrainerApi } from "@/lib/auth/assert-trainer-api";

export async function POST() {
  const auth = await assertTrainerApi();
  if (auth instanceof NextResponse) return auth;

  const result = await ensureWorkoutsSchema();
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
