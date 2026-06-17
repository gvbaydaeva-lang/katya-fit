export type PlanId = "self" | "coached" | "platform";

export const PLANS = [
  {
    id: "self",
    name: "Самостоятельно",
    price: "$79",
    amountCents: 7900,
    description:
      "Готовая программа тренировок и материалы — вы занимаетесь в своём темпе.",
  },
  {
    id: "coached",
    name: "С личным сопровождением",
    price: "$199",
    amountCents: 19900,
    description:
      "Персональный контроль тренера, обратная связь и корректировка программы.",
  },
  {
    id: "platform",
    name: "Доступ к платформе",
    price: "$49",
    amountCents: 4900,
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
