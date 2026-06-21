import { NextResponse } from "next/server";
import { handleStripeWebhook } from "@/lib/stripe/handle-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get("stripe-signature");
  const { status, body } = await handleStripeWebhook(payload, signature);

  return NextResponse.json(body, { status });
}
