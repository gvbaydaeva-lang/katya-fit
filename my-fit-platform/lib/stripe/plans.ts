export type PlanId = "self" | "coached" | "platform";

export const PLANS = [
  {
    id: "self",
    name: "Из дома в зал",
    price: "$1",
    amountCents: 100,
    description:
      "Программа мягкого перехода от домашних тренировок к уверенной работе в зале.",
  },
  {
    id: "coached",
    name: "Онлайн сопровождение",
    price: "$199",
    amountCents: 19900,
    description:
      "Персональный контроль тренера, обратная связь и корректировка программы.",
  },
  {
    id: "platform",
    name: "Вместе",
    price: "$49",
    amountCents: 4900,
    description:
      "Расширенный формат с доступом к материалам и более плотной поддержкой.",
  },
] as const;

export type Plan = (typeof PLANS)[number] & {
  period?: string;
  features?: string[];
};

export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find((p) => p.id === planId);
}

export function isValidPlanId(planId: string): planId is PlanId {
  return PLANS.some((p) => p.id === planId);
}
