import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/routes";
import { getAuthUser } from "@/lib/auth/session";

/** Единственный тренер с доступом в /admin */
const TRAINER_EMAIL = "gv.baydaeva@gmail.com";

/** Доступ в /admin — только по email тренера */
export function isTrainerUser(email?: string | null): boolean {
  if (!email?.trim()) return false;
  return email.trim().toLowerCase() === TRAINER_EMAIL;
}

export function isTrainerConfigured(): boolean {
  return true;
}

/** Редирект, если не тренер. Возвращает user id. */
export async function requireTrainer(): Promise<string> {
  const user = await getAuthUser();

  if (!user) {
    redirect(`${AUTH_ROUTES.login}?callbackUrl=/admin/clients`);
  }

  if (!isTrainerUser(user.email)) {
    redirect("/?adminDenied=1");
  }

  return user.id;
}
