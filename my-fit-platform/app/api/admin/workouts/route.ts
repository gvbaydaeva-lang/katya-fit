import { NextResponse } from "next/server";
import { createWorkout } from "@/lib/admin/workouts";
import { assertTrainerApi } from "@/lib/auth/assert-trainer-api";
import { isValidPlanId } from "@/lib/stripe/plans";
import { normalizeContentBlocks } from "@/lib/workouts/content-blocks";

export async function POST(request: Request) {
  const auth = await assertTrainerApi();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json().catch(() => ({}));
  const tariffsRaw = Array.isArray(body.tariffs) ? body.tariffs : [];
  const tariffs = tariffsRaw
    .map((value: unknown) => String(value))
    .filter((value: string): value is "self" | "coached" | "platform" =>
      isValidPlanId(value),
    );

  const result = await createWorkout({
    title: String(body.title ?? ""),
    module_name: String(body.module_name ?? body.moduleName ?? ""),
    position: Number(body.position ?? 1),
    is_published: Boolean(body.is_published),
    content_blocks: normalizeContentBlocks(body.content_blocks),
    tariffs,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, id: result.id });
}
