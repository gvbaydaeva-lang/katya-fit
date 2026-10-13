import type { PlanId } from "@/lib/stripe/plans";
import { RUBLE_PAYMENT_LINKS } from "@/lib/payments/ruble-payment-links";

export type PaymentOptionId =
  | "home-to-gym"
  | "coaching-together"
  | "coaching-controlled-3-months"
  | "coaching-controlled-6-months";

export type PaymentOption = {
  id: PaymentOptionId;
  planId: PlanId;
  name: string;
  rublePrice: string;
  usdPrice: string;
  usdAmountCents: number;
  rublePaymentUrl: string;
};

export const PAYMENT_OPTIONS = {
  homeToGym: {
    id: "home-to-gym",
    planId: "self",
    name: "Из дома в зал",
    rublePrice: "3 999 ₽",
    usdPrice: "$49",
    usdAmountCents: 4_900,
    rublePaymentUrl: RUBLE_PAYMENT_LINKS.homeToGym,
  },
  coachingTogether: {
    id: "coaching-together",
    planId: "coached",
    name: "Персональный план — 3 месяца",
    rublePrice: "14 999 ₽",
    usdPrice: "$199",
    usdAmountCents: 19_900,
    rublePaymentUrl: RUBLE_PAYMENT_LINKS.coachingTogether,
  },
  coachingControlled3Months: {
    id: "coaching-controlled-3-months",
    planId: "platform",
    name: "Всё под контролем — 3 месяца",
    rublePrice: "46 665 ₽",
    usdPrice: "$549",
    usdAmountCents: 54_900,
    rublePaymentUrl: RUBLE_PAYMENT_LINKS.coachingControlled3Months,
  },
  coachingControlled6Months: {
    id: "coaching-controlled-6-months",
    planId: "platform",
    name: "Всё под контролем — 6 месяцев",
    rublePrice: "67 915 ₽",
    usdPrice: "$799",
    usdAmountCents: 79_900,
    rublePaymentUrl: RUBLE_PAYMENT_LINKS.coachingControlled6Months,
  },
} as const satisfies Record<string, PaymentOption>;

const PAYMENT_OPTION_LIST = Object.values(PAYMENT_OPTIONS);

export function getPaymentOptionById(
  paymentOptionId: string,
): PaymentOption | undefined {
  return PAYMENT_OPTION_LIST.find((option) => option.id === paymentOptionId);
}
