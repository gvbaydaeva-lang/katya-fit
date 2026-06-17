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
import { resolvePostLoginPath } from "@/lib/auth/post-login";
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

  // Обновляем сессию в cookies, чтобы не выбрасывало на /login между страницами
  await supabase.auth.getSession();

  if (isAdminPath(pathname)) {
    if (!user) {
      const loginUrl = new URL(AUTH_ROUTES.login, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!isTrainerUser(user.email)) {
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

    // Тренер имеет доступ в /app без подписки
    if (isTrainerUser(user.email)) {
      return response;
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
    if (isTrainerUser(user.email)) {
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
      const target = resolvePostLoginPath(callbackUrl, { isTrainer: true });
      return NextResponse.redirect(new URL(target, request.url));
    }

    const diagnosis = await diagnoseSubscriptionAccess(user.id, supabase);
    if (diagnosis.hasAccess) {
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
      const target = resolvePostLoginPath(callbackUrl, { isTrainer: false });
      return NextResponse.redirect(new URL(target, request.url));
    }

    // Авторизован, но без подписки — остаётся на /login (не зацикливаем редирект)
    return response;
  }

  return response;
}
