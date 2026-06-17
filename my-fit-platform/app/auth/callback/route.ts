import { NextResponse } from "next/server";
import { isTrainerUser } from "@/lib/auth/admin";
import { resolvePostLoginPath } from "@/lib/auth/post-login";
import { createAuthRouteClientWithResponse } from "@/lib/supabase/auth-route";
import { STUDENT_ROUTES } from "@/lib/auth/routes";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? STUDENT_ROUTES.dashboard;

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  const cookieJar = NextResponse.json({ ok: true });
  const { supabase, applyCookiesTo } =
    await createAuthRouteClientWithResponse(cookieJar);
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  }

  const target = resolvePostLoginPath(next, {
    isTrainer: isTrainerUser(data.user.email),
  });

  const redirect = NextResponse.redirect(`${origin}${target}`);
  applyCookiesTo(redirect);
  return redirect;
}
