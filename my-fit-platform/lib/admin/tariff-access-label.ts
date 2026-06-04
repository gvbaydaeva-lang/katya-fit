import { isValidPlanId, PLANS, type PlanId } from "@/lib/stripe/plans";

export function normalizeWorkoutTariffs(tariffs: string[] | null | undefined): PlanId[] {
  return Array.from(
    new Set(
      (tariffs ?? []).filter((tariff): tariff is PlanId => isValidPlanId(tariff)),
    ),
  );
}

/** Краткая подпись для колонки «Доступ»: «Все тарифы», «2 тарифа», «1 тариф». */
export function formatTariffAccessLabel(tariffIds: PlanId[]): string {
  const count = tariffIds.length;
  const total = PLANS.length;

  if (count === 0) {
    return "Нет доступа";
  }
  if (count >= total) {
    return "Все тарифы";
  }
  if (count === 1) {
    return "1 тариф";
  }
  if (count === 2) {
    return "2 тарифа";
  }
  return `${count} тарифа`;
}
