/** Публичные маршруты */
export const PUBLIC_ROUTES = {
  home: "/",
} as const;

export const CHECKOUT_ROUTES = {
  plan: (planId: string) => `/checkout/${planId}`,
  success: "/checkout/success",
} as const;

/** Страницы входа / регистрации */
export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
} as const;

/** Префикс закрытой зоны личного кабинета */
export const STUDENT_APP_PREFIX = "/app";

import { moduleListHref } from "@/lib/workouts/content-blocks";

export const STUDENT_ROUTES = {
  dashboard: "/app",
  myWorkouts: "/app/workouts",
  settings: "/app/profile",
  profile: "/app/profile",
  module: (moduleName: string) => moduleListHref(moduleName),
  lesson: (id: string, moduleName?: string) => {
    const path = `/app/workouts/${id}`;
    if (!moduleName?.trim()) return path;
    return `${path}?module=${encodeURIComponent(moduleName.trim())}`;
  },
} as const;

export const ADMIN_ROUTES = {
  root: "/admin",
  clients: "/admin/clients",
  content: "/admin/content",
} as const;

export function isAdminPath(pathname: string): boolean {
  return (
    pathname === ADMIN_ROUTES.root ||
    pathname.startsWith(`${ADMIN_ROUTES.root}/`)
  );
}

export function isProtectedPath(pathname: string): boolean {
  return (
    pathname === STUDENT_APP_PREFIX ||
    pathname.startsWith(`${STUDENT_APP_PREFIX}/`)
  );
}

export function isAuthPath(pathname: string): boolean {
  return pathname === AUTH_ROUTES.login || pathname === AUTH_ROUTES.register;
}

export function isCheckoutPath(pathname: string): boolean {
  return pathname.startsWith("/checkout");
}
