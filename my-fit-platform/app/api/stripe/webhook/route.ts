import { NextResponse } from "next/server";

export async function POST() {
  // TODO: verify Stripe signature, обработать checkout.session.completed
  return NextResponse.json({ received: true });
}
