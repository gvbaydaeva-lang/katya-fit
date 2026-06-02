import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { getPlanById, isValidPlanId } from "@/lib/stripe/plans";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const planId = String(body.planId ?? "");
  const email = body.email ? String(body.email) : undefined;

  if (!isValidPlanId(planId)) {
    return NextResponse.json({ error: "Неверный тариф" }, { status: 400 });
  }

  const plan = getPlanById(planId)!;
  const url = await createCheckoutSession({
    planId: plan.id,
    planName: plan.name,
    amountCents: plan.amountCents,
    email,
  });

  if (!url) {
    return NextResponse.json(
      {
        demo: true,
        checkoutUrl: `/checkout/${planId}`,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({ url });
}
