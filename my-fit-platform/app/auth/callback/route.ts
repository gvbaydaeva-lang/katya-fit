import { NextResponse } from "next/server";
import { isTrainerUser } from "@/lib/auth/admin";
import { resolvePostLoginPath } from "@/lib/auth/post-login";
import { getAppOrigin } from "@/lib/app-url";
import { createAuthRouteClientWithResponse } from "@/lib/supabase/auth-route";
import { AUTH_ROUTES, STUDENT_ROUTES } from "@/lib/auth/routes";

function isSafeSetPasswordPath(path: string): boolean {
  if (!path.startsWith(`${AUTH_ROUTES.setPassword}`)) return false;

  try {
    const url = new URL(path, "http://local");
    return (
      url.pathname === AUTH_ROUTES.setPassword &&
      !url.searchParams.get("next")?.startsWith("//")
    );
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appOrigin = getAppOrigin();
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? STUDENT_ROUTES.dashboard;

  if (!code) {
    return NextResponse.redirect(`${appOrigin}/login?error=auth_callback_failed`);
  }

  const cookieJar = NextResponse.json({ ok: true });
  const { supabase, applyCookiesTo } =
    await createAuthRouteClientWithResponse(cookieJar);
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    return NextResponse.redirect(`${appOrigin}/login?error=auth_callback_failed`);
  }

  const target = isSafeSetPasswordPath(next)
    ? next
    : resolvePostLoginPath(next, {
        isTrainer: isTrainerUser(data.user.email),
      });

  const redirect = NextResponse.redirect(`${appOrigin}${target}`);
  applyCookiesTo(redirect);
  return redirect;
}
