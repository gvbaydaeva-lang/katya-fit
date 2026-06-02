import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  diagnoseSubscriptionAccess,
  logSubscriptionDiagnosis,
} from "@/lib/auth/subscription";
import {
  getSupabaseAnonKey,
  getSupabaseUrl,
  isSupabaseConfigured,
} from "@/lib/supabase/env";
import { isTrainerUser } from "@/lib/auth/admin";
import {
  AUTH_ROUTES,
  isAdminPath,
  isAuthPath,
  isProtectedPath,
  STUDENT_ROUTES,
} from "@/lib/auth/routes";
import { getSessionFromRequest } from "@/lib/auth/session";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  if (!isSupabaseConfigured()) {
    const legacy = getSessionFromRequest(request);

    if (isProtectedPath(pathname) && !legacy) {
      console.log("[KatyaFit middleware] Редирект → /login (демо, нет cookie-сессии)");
      const loginUrl = new URL(AUTH_ROUTES.login, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (isAuthPath(pathname) && legacy) {
      return NextResponse.redirect(
        new URL(STUDENT_ROUTES.dashboard, request.url),
      );
    }
    return response;
  }

  const supabase = createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (isAdminPath(pathname)) {
    if (!user) {
      const loginUrl = new URL(AUTH_ROUTES.login, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isTrainerUser(user.id)) {
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("adminDenied", "1");
      return NextResponse.redirect(homeUrl);
    }
    return response;
  }

  if (isProtectedPath(pathname)) {
    if (!user) {
      console.log(
        "[KatyaFit middleware] Редирект → /login: пользователь не авторизован (getUser() пустой)",
      );
      const loginUrl = new URL(AUTH_ROUTES.login, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const diagnosis = await diagnoseSubscriptionAccess(user.id, supabase);

    if (!diagnosis.hasAccess) {
      logSubscriptionDiagnosis(
        `Редирект ${pathname} → /#pricing?needSubscription=1 (см. также F12 в браузере)`,
        diagnosis,
      );

      const pricingUrl = new URL("/#pricing", request.url);
      pricingUrl.searchParams.set("needSubscription", "1");
      const redirectResponse = NextResponse.redirect(pricingUrl);
      redirectResponse.headers.set(
        "x-katya-fit-debug",
        encodeURIComponent(diagnosis.reasons.join(" | ")),
      );
      return redirectResponse;
    }

    console.log("[KatyaFit middleware] Доступ в /app разрешён для", user.id);
  }

  if (isAuthPath(pathname) && user) {
    const diagnosis = await diagnoseSubscriptionAccess(user.id, supabase);
    if (diagnosis.hasAccess) {
      return NextResponse.redirect(
        new URL(STUDENT_ROUTES.dashboard, request.url),
      );
    }
  }

  return response;
}
