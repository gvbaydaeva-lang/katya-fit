import {
  ADMIN_ROUTES,
  STUDENT_APP_PREFIX,
  STUDENT_ROUTES,
} from "@/lib/auth/routes";

function isSafeInternalPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//");
}

function isAdminCallback(path: string): boolean {
  return (
    path === ADMIN_ROUTES.root || path.startsWith(`${ADMIN_ROUTES.root}/`)
  );
}

function isStudentCallback(path: string): boolean {
  return (
    path === STUDENT_APP_PREFIX || path.startsWith(`${STUDENT_APP_PREFIX}/`)
  );
}

/**
 * Куда отправить пользователя после успешного входа.
 * Тренер может попасть и в /admin, и в /app.
 */
export function resolvePostLoginPath(
  callbackUrl: string | null | undefined,
  options?: { isTrainer?: boolean },
): string {
  if (
    callbackUrl &&
    isSafeInternalPath(callbackUrl) &&
    (isAdminCallback(callbackUrl) || isStudentCallback(callbackUrl))
  ) {
    return callbackUrl;
  }

  if (options?.isTrainer) {
    return ADMIN_ROUTES.clients;
  }

  return STUDENT_ROUTES.dashboard;
}
