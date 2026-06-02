import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/lib/auth/routes";
import { getAuthUser } from "@/lib/auth/session";

/** UUID тренера из Supabase Authentication → Users */
export function getTrainerUserId(): string | undefined {
  const id = process.env.TRAINER_USER_ID?.trim();
  return id || undefined;
}

export function isTrainerUser(userId: string): boolean {
  const trainerId = getTrainerUserId();
  return Boolean(trainerId && userId === trainerId);
}

export function isTrainerConfigured(): boolean {
  return Boolean(getTrainerUserId());
}

/** Редирект, если не тренер. Возвращает user id тренера. */
export async function requireTrainer(): Promise<string> {
  const user = await getAuthUser();

  if (!user) {
    redirect(`${AUTH_ROUTES.login}?callbackUrl=/admin/clients`);
  }

  if (!isTrainerUser(user.id)) {
    redirect("/?adminDenied=1");
  }

  return user.id;
}
