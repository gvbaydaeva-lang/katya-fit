import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { grantDemoSubscription } from "@/lib/auth/create-subscription";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  PLAN_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";
import { getPlanById, isValidPlanId } from "@/lib/stripe/plans";
import { createCheckoutSession } from "@/lib/stripe/checkout";
import { getRequestOrigin } from "@/lib/stripe/request-origin";

const WEEK_SECONDS = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const planId = String(body.planId ?? "");
  const email = String(body.email ?? "").trim();

  if (!isValidPlanId(planId)) {
    return NextResponse.json({ error: "Неверный тариф" }, { status: 400 });
  }
  if (!email.includes("@")) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }

  const plan = getPlanById(planId)!;
  const origin = getRequestOrigin(request);
  const stripeUrl = await createCheckoutSession({
    planId: plan.id,
    planName: plan.name,
    amountCents: plan.amountCents,
    email,
    origin,
  });

  if (stripeUrl) {
    return NextResponse.json({ url: stripeUrl });
  }

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    let userId: string | null = null;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      userId = user.id;
    } else {
      return NextResponse.json(
        {
          error: "Войдите или зарегистрируйтесь перед оплатой",
          needAuth: true,
        },
        { status: 401 },
      );
    }

    const { error } = await grantDemoSubscription(userId, planId);
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, email, {
    httpOnly: true,
    path: "/",
    maxAge: WEEK_SECONDS,
    sameSite: "lax",
  });
  cookieStore.set(PLAN_COOKIE_NAME, planId, {
    httpOnly: true,
    path: "/",
    maxAge: WEEK_SECONDS,
    sameSite: "lax",
  });

  return NextResponse.json({ ok: true });
}
