import { isStripeConfigured, stripeConfig } from "@/lib/stripe/config";
import type { PlanId } from "@/lib/stripe/plans";
import { isValidPlanId } from "@/lib/stripe/plans";

type CreateCheckoutParams = {
  planId: PlanId;
  planName: string;
  amountCents: number;
  email?: string;
};

export async function createCheckoutSession(
  params: CreateCheckoutParams,
): Promise<string | null> {
  if (!isStripeConfigured) return null;

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeConfig.secretKey);

  const origin =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.email,
    line_items: [
      {
        price_data: {
          currency: "rub",
          unit_amount: params.amountCents,
          product_data: {
            name: params.planName,
            description: "Доступ к платформе Катя Fit",
          },
        },
        quantity: 1,
      },
    ],
    metadata: { planId: params.planId },
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/#pricing`,
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
  const planId = session.metadata?.planId ?? "";

  if (!email || !isValidPlanId(planId)) return null;

  return { email, planId };
}
