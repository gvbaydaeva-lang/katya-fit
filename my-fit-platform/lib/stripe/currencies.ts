export const CHECKOUT_CURRENCIES = ["usd", "rub"] as const;

export type CheckoutCurrency = (typeof CHECKOUT_CURRENCIES)[number];

export function isValidCheckoutCurrency(
  value: string,
): value is CheckoutCurrency {
  return CHECKOUT_CURRENCIES.includes(value as CheckoutCurrency);
}

type PlanPricing = {
  amountCents: number;
  amountRub: number;
  price: string;
  priceRub: string;
};

export function getPlanAmount(
  plan: PlanPricing,
  currency: CheckoutCurrency,
): number {
  return currency === "rub" ? plan.amountRub : plan.amountCents;
}

export function formatPlanPrice(
  plan: PlanPricing,
  currency: CheckoutCurrency,
): string {
  return currency === "rub" ? plan.priceRub : plan.price;
}

export function getCurrencyLabel(currency: CheckoutCurrency): string {
  return currency === "rub" ? "RUB (₽)" : "USD ($)";
}
