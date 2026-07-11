import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAppOrigin } from "@/lib/app-url";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";
import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/supabase/env";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!email.includes("@")) {
    return NextResponse.json({ error: "Укажите корректный email" }, { status: 400 });
  }

  const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const setPasswordPath = `${AUTH_ROUTES.setPassword}?next=${encodeURIComponent(STUDENT_ROUTES.dashboard)}`;
  const redirectTo = `${getAppOrigin()}/auth/callback?next=${encodeURIComponent(setPasswordPath)}`;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
