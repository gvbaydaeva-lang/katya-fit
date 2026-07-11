import { NextResponse } from "next/server";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";
import { createAuthRouteClientWithResponse } from "@/lib/supabase/auth-route";

const ALLOWED_TYPES = new Set(["invite", "recovery"]);

function getSafeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return STUDENT_ROUTES.dashboard;
  }

  return value.startsWith("/app") ? value : STUDENT_ROUTES.dashboard;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = getSafeNext(searchParams.get("next"));

  if (!tokenHash || !type || !ALLOWED_TYPES.has(type)) {
    return NextResponse.redirect(`${origin}${AUTH_ROUTES.login}?error=auth_link_invalid`);
  }

  const cookieJar = NextResponse.json({ ok: true });
  const { supabase, applyCookiesTo } =
    await createAuthRouteClientWithResponse(cookieJar);

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type,
  });

  if (error) {
    return NextResponse.redirect(`${origin}${AUTH_ROUTES.login}?error=auth_link_expired`);
  }

  const setPasswordPath = `${AUTH_ROUTES.setPassword}?next=${encodeURIComponent(next)}`;
  const redirect = NextResponse.redirect(`${origin}${setPasswordPath}`);
  applyCookiesTo(redirect);
  return redirect;
}
