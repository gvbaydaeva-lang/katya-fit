import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { isStripeConfigured } from "@/lib/stripe/config";
import { getPlanById, isValidPlanId } from "@/lib/stripe/plans";
import { getRequestOrigin } from "@/lib/stripe/request-origin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const planId = String(body.planId ?? "");
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const cancelPath = String(body.cancelPath ?? "").trim();

  if (!isValidPlanId(planId)) {
    return NextResponse.json({ error: "Неверный тариф" }, { status: 400 });
  }

  if (!fullName) {
    return NextResponse.json({ error: "Укажите имя и фамилию" }, { status: 400 });
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Укажите корректный email" }, { status: 400 });
  }

  if (!phone) {
    return NextResponse.json({ error: "Укажите телефон" }, { status: 400 });
  }

  const origin = getRequestOrigin(request);
  const cancelUrl = cancelPath.startsWith("/")
    ? `${origin}${cancelPath}`
    : undefined;

  // TODO: создать таблицу pending_checkouts (id, email, phone, plan_id, stripe_session_id, created_at)
  // и пока пропустить insert без throw
  try {
    const { createAdminClient } = await import("@/lib/supabase/admin");
    const supabase = createAdminClient();
    await supabase.from("pending_checkouts").insert({
      full_name: fullName,
      email,
      phone,
      plan_id: planId,
    });
  } catch {
    // Таблица может ещё не существовать — не блокируем оплату
  }

  const plan = getPlanById(planId)!;

  try {
    const url = await createCheckoutSession({
      planId: plan.id,
      planName: plan.name,
      amountCents: plan.amountCents,
      fullName,
      email,
      phone,
      origin,
      cancelUrl,
    });

    if (!url) {
      if (isStripeConfigured) {
        return NextResponse.json(
          { error: "Не удалось создать сессию оплаты Stripe" },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          demo: true,
          checkoutUrl: `/checkout/${planId}`,
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[stripe/checkout]", error);
    return NextResponse.json(
      { error: "Не удалось создать сессию оплаты Stripe" },
      { status: 500 },
    );
  }
}
