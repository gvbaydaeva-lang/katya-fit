import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@/lib/supabase/route-handler";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import {
  PLAN_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/session";

export async function POST() {
  const response = NextResponse.json({ ok: true });

  if (isSupabaseConfigured()) {
    const supabase = await createRouteHandlerClient(response);
    await supabase.auth.signOut();
  }

  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(PLAN_COOKIE_NAME);

  response.cookies.delete(SESSION_COOKIE_NAME);
  response.cookies.delete(PLAN_COOKIE_NAME);

  return response;
}
