import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isTrainerUser } from "@/lib/auth/admin";
import { mapAuthErrorMessage } from "@/lib/auth/auth-errors";
import { resolvePostLoginPath } from "@/lib/auth/post-login";
import { createAuthRouteClient } from "@/lib/supabase/auth-route";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  PLAN_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";
import type { PlanId } from "@/lib/stripe/plans";
import { isValidPlanId } from "@/lib/stripe/plans";

const WEEK_SECONDS = 60 * 60 * 24 * 7;

async function legacyLogin(email: string, planId: PlanId) {
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

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim();
  const password = body.password != null ? String(body.password) : undefined;
  const planId = String(body.planId ?? "coached");
  const callbackUrl =
    typeof body.callbackUrl === "string" ? body.callbackUrl : undefined;

  if (!isSupabaseConfigured()) {
    if (!email.includes("@")) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }
    const safePlan = isValidPlanId(planId) ? planId : "coached";
    return legacyLogin(email, safePlan);
  }

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }
  if (!password) {
    return NextResponse.json({ error: "Введите пароль" }, { status: 400 });
  }

  const { supabase, jsonWithSession } = await createAuthRouteClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: mapAuthErrorMessage(error.message) },
      { status: 401 },
    );
  }

  const redirectTo = resolvePostLoginPath(callbackUrl, {
    isTrainer: data.user ? isTrainerUser(data.user.email) : false,
  });

  return jsonWithSession({ ok: true, redirectTo });
}
