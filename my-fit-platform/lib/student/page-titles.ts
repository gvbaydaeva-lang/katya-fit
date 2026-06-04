import { STUDENT_ROUTES } from "@/lib/auth/routes";

const LESSON_PATH = /^\/app\/workouts\/[^/]+$/;

/** Заголовок в sticky-шапке; null — шапку не показываем (заголовок на самой странице) */
export function getStudentPageTitle(pathname: string): string | null {
  if (pathname === STUDENT_ROUTES.profile || pathname === STUDENT_ROUTES.settings) {
    return "Профиль";
  }
  if (LESSON_PATH.test(pathname)) {
    return null;
  }
  if (pathname === STUDENT_ROUTES.myWorkouts) {
    return null;
  }
  if (pathname === STUDENT_ROUTES.dashboard) {
    return null;
  }
  return null;
}
