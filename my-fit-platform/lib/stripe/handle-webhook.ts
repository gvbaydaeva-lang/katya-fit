import type Stripe from "stripe";
import { stripeConfig } from "@/lib/stripe/config";
import { savePaymentFromCheckoutSession } from "@/lib/stripe/save-payment";

export async function handleStripeWebhook(
  payload: string,
  signature: string | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  if (!stripeConfig.secretKey) {
    return { status: 500, body: { error: "STRIPE_SECRET_KEY не задан" } };
  }

  if (!stripeConfig.webhookSecret) {
    return { status: 500, body: { error: "STRIPE_WEBHOOK_SECRET не задан" } };
  }

  if (!signature) {
    return { status: 400, body: { error: "Missing stripe-signature header" } };
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeConfig.secretKey);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      stripeConfig.webhookSecret,
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook signature";
    console.error("[stripe/webhook] signature verification failed:", message);
    return { status: 400, body: { error: message } };
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const result = await savePaymentFromCheckoutSession(session);

    if (!result.ok) {
      console.error("[stripe/webhook] save payment failed:", result.error);
      return { status: 500, body: { error: result.error } };
    }
  }

  return { status: 200, body: { received: true } };
}
