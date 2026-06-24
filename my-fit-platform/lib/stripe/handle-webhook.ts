import { Resend } from "resend";
import type Stripe from "stripe";
import { getAppOrigin } from "@/lib/app-url";
import { stripeConfig } from "@/lib/stripe/config";
import { fulfillCheckoutAccess } from "@/lib/stripe/fulfill-checkout-access";
import { savePaymentFromCheckoutSession } from "@/lib/stripe/save-payment";
import { createAdminClient } from "@/lib/supabase/admin";

function getCheckoutEmail(session: Stripe.Checkout.Session): string {
  return (
    session.customer_details?.email ??
    session.customer_email ??
    session.metadata?.email ??
    ""
  ).trim();
}

async function sendCheckoutWelcomeEmail(
  session: Stripe.Checkout.Session,
  stripeCheckoutSessionId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = createAdminClient();
  const { data: payment, error: paymentError } = await admin
    .from("payments")
    .select("welcome_email_sent_at")
    .eq("stripe_checkout_session_id", stripeCheckoutSessionId)
    .maybeSingle();

  if (paymentError) {
    return { ok: false, error: paymentError.message };
  }

  if (payment?.welcome_email_sent_at) {
    return { ok: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY не задан" };
  }

  const to = getCheckoutEmail(session);
  if (!to) {
    return { ok: false, error: "Checkout session has no customer email" };
  }

  const siteUrl = getAppOrigin();
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject: "Доступ к платформе Katya Fit",
    html: `Здравствуйте! Спасибо за покупку. Ваш доступ к платформе активирован. Ссылка для входа: <a href="${siteUrl}">${siteUrl}</a>`,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  const { error: markError } = await admin
    .from("payments")
    .update({ welcome_email_sent_at: new Date().toISOString() })
    .eq("stripe_checkout_session_id", stripeCheckoutSessionId);

  if (markError) {
    console.error(
      "[stripe/webhook] welcome email sent but mark failed:",
      markError.message,
    );
  }

  return { ok: true };
}

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

    const accessResult = await fulfillCheckoutAccess(
      session,
      result.stripeCheckoutSessionId,
    );

    if (!accessResult.ok) {
      console.error(
        "[stripe/webhook] fulfill checkout access failed:",
        accessResult.error,
      );
      return { status: 500, body: { error: accessResult.error } };
    }

    const emailResult = await sendCheckoutWelcomeEmail(
      session,
      result.stripeCheckoutSessionId,
    );
    if (!emailResult.ok) {
      console.error("[stripe/webhook] welcome email failed:", emailResult.error);
      return { status: 500, body: { error: emailResult.error } };
    }
  }

  return { status: 200, body: { received: true } };
}
