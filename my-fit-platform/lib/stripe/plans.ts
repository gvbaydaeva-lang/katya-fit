export type PlanId = "self" | "coached" | "platform";

export const PLANS = [
  {
    id: "self",
    name: "Самостоятельно",
    price: "$1",
    priceRub: "100 ₽",
    amountCents: 100,
    amountRub: 10000,
    description:
      "Готовая программа тренировок и материалы — вы занимаетесь в своём темпе.",
  },
  {
    id: "coached",
    name: "С личным сопровождением",
    price: "$199",
    priceRub: "19 900 ₽",
    amountCents: 19900,
    amountRub: 1990000,
    description:
      "Персональный контроль тренера, обратная связь и корректировка программы.",
  },
  {
    id: "platform",
    name: "Доступ к платформе",
    price: "$49",
    priceRub: "4 900 ₽",
    amountCents: 4900,
    amountRub: 490000,
    description:
      "Доступ ко всем урокам платформы без личного сопровождения.",
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
