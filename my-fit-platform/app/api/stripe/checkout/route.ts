import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { getPlanById, isValidPlanId } from "@/lib/stripe/plans";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const planId = String(body.planId ?? "");
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();

  if (!isValidPlanId(planId)) {
    return NextResponse.json({ error: "Неверный тариф" }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Укажите корректный email" }, { status: 400 });
  }

  if (!phone) {
    return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });
  }

  // TODO: создать таблицу pending_checkouts (id, email, phone, plan_id, stripe_session_id, created_at)
  // и пока пропустить insert без throw
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    await supabase.from("pending_checkouts").insert({
      email,
      phone,
      plan_id: planId,
    });
  } catch {
    // Таблица может ещё не существовать — не блокируем оплату
  }

  const plan = getPlanById(planId)!;
  const url = await createCheckoutSession({
    planId: plan.id,
    planName: plan.name,
    amountCents: plan.amountCents,
    email,
    phone,
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
