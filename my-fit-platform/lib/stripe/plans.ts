export type PlanId = "self" | "coached" | "platform";

export type Plan = {
  id: PlanId;
  name: string;
  price: string;
  amountCents: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "self",
    name: "Самостоятельно",
    price: "2 990",
    amountCents: 299000,
    period: "мес",
    description:
      "Готовая программа тренировок и материалы — вы занимаетесь в своём темпе.",
    features: [
      "План на 4 недели с прогрессией",
      "Видео с разбором техники",
      "Чек-листы и шаблоны",
    ],
  },
  {
    id: "coached",
    name: "С личным сопровождением",
    price: "6 990",
    amountCents: 699000,
    period: "мес",
    description:
      "Персональная программа и еженедельная обратная связь от тренера.",
    features: [
      "Корректировки плана каждую неделю",
      "Разбор техники и питания",
      "Приоритетный чат с Катей",
    ],
    highlighted: true,
  },
  {
    id: "platform",
    name: "Доступ к платформе без тренера",
    price: "1 990",
    amountCents: 199000,
    period: "мес",
    description:
      "Библиотека тренировок и записи эфиров — без индивидуального ведения.",
    features: [
      "Полный архив видео",
      "Новые записи каждую неделю",
      "Доступ с любого устройства",
    ],
  },
];

export function getPlanById(planId: string): Plan | undefined {
  return PLANS.find((p) => p.id === planId);
}

export function isValidPlanId(planId: string): planId is PlanId {
  return PLANS.some((p) => p.id === planId);
}
