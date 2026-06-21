import { isStripeConfigured, stripeConfig } from "@/lib/stripe/config";
import {
  CHECKOUT_CURRENCIES,
  type CheckoutCurrency,
} from "@/lib/stripe/currencies";
import type { PlanId } from "@/lib/stripe/plans";
import { isValidPlanId } from "@/lib/stripe/plans";

type CreateCheckoutParams = {
  planId: PlanId;
  planName: string;
  amountUsd: number;
  amountRub: number;
  currency: CheckoutCurrency;
  fullName?: string;
  email?: string;
  phone?: string;
  origin?: string;
  cancelUrl?: string;
};

export async function createCheckoutSession(
  params: CreateCheckoutParams,
): Promise<string | null> {
  if (!isStripeConfigured) return null;

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeConfig.secretKey);

  const origin =
    params.origin ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";
  const cancelUrl = params.cancelUrl ?? `${origin}/#pricing`;
  const selectedAmount =
    params.currency === "rub" ? params.amountRub : params.amountUsd;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.email,
    currency: params.currency,
    adaptive_pricing: { enabled: true },
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: params.amountUsd,
          product_data: {
            name: params.planName,
            description: "Доступ к платформе KATY D.",
          },
          currency_options: {
            rub: {
              unit_amount: params.amountRub,
            },
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      plan_id: params.planId,
      planId: params.planId,
      full_name: params.fullName ?? "",
      email: params.email ?? "",
      phone: params.phone ?? "",
      currency: params.currency,
      amount: String(selectedAmount),
      supported_currencies: CHECKOUT_CURRENCIES.join(","),
    },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
  });

  return session.url;
}

export async function grantAccessFromStripeSession(
  sessionId: string,
): Promise<{ email: string; planId: PlanId } | null> {
  if (!isStripeConfigured || !sessionId) return null;

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeConfig.secretKey);

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") return null;

  const email =
    session.customer_details?.email ??
    session.customer_email ??
    "";
  const planId =
    session.metadata?.plan_id ?? session.metadata?.planId ?? "";

  if (!email || !isValidPlanId(planId)) return null;

  return { email, planId };
}
