import type Stripe from "stripe";
import { sendCheckoutWelcomeEmail } from "@/lib/email/send-checkout-welcome-email";
import { stripeConfig } from "@/lib/stripe/config";
import { fulfillCheckoutAccess } from "@/lib/stripe/fulfill-checkout-access";
import { savePaymentFromCheckoutSession } from "@/lib/stripe/save-payment";

function getCheckoutEmail(session: Stripe.Checkout.Session): string {
  return (
    session.customer_details?.email ??
    session.customer_email ??
    session.metadata?.email ??
    ""
  ).trim();
}

export async function handleStripeWebhook(
  payload: string,
  signature: string | null,
): Promise<{ status: number; body: Record<string, unknown> }> {
  console.log("[stripe/webhook] request received", {
    hasSignature: Boolean(signature),
    payloadLength: payload.length,
    resendApiKeyConfigured: Boolean(process.env.RESEND_API_KEY),
    resendApiKeyLength: process.env.RESEND_API_KEY?.length ?? 0,
  });

  if (!stripeConfig.secretKey) {
    console.error("[stripe/webhook] STRIPE_SECRET_KEY не задан");
    return { status: 500, body: { error: "STRIPE_SECRET_KEY не задан" } };
  }

  if (!stripeConfig.webhookSecret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET не задан");
    return { status: 500, body: { error: "STRIPE_WEBHOOK_SECRET не задан" } };
  }

  if (!signature) {
    console.error("[stripe/webhook] missing stripe-signature header");
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

  console.log("[stripe/webhook] event verified", {
    eventId: event.id,
    eventType: event.type,
  });

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("[stripe/webhook] checkout.session.completed", {
        sessionId: session.id,
        paymentStatus: session.payment_status,
        customerEmail: getCheckoutEmail(session),
        planId: session.metadata?.plan_id ?? session.metadata?.planId ?? null,
      });

      const result = await savePaymentFromCheckoutSession(session);
      console.log("[stripe/webhook] save payment result", {
        ok: result.ok,
        ...(result.ok
          ? {
              stripeCheckoutSessionId: result.stripeCheckoutSessionId,
              isNew: result.isNew,
            }
          : { error: result.error }),
      });

      if (!result.ok) {
        console.error("[stripe/webhook] save payment failed:", result.error);
        return { status: 500, body: { error: result.error } };
      }

      console.log("[stripe/webhook] starting fulfillCheckoutAccess (user + subscription)");

      const accessResult = await fulfillCheckoutAccess(
        session,
        result.stripeCheckoutSessionId,
      );

      console.log("[stripe/webhook] fulfillCheckoutAccess result", {
        ok: accessResult.ok,
        ...(accessResult.ok
          ? { userId: accessResult.userId }
          : { error: accessResult.error }),
      });

      if (!accessResult.ok) {
        console.error(
          "[stripe/webhook] fulfill checkout access failed:",
          accessResult.error,
        );
        return { status: 500, body: { error: accessResult.error } };
      }

      try {
        const emailResult = await sendCheckoutWelcomeEmail(
          session,
          result.stripeCheckoutSessionId,
        );

        if (!emailResult.ok) {
          console.error(
            "[stripe/webhook] welcome email failed (non-fatal):",
            emailResult.error,
          );
        } else {
          console.log("[stripe/webhook] welcome email sent or already sent");
        }
      } catch (emailError) {
        const message =
          emailError instanceof Error
            ? emailError.message
            : "Unknown welcome email error";
        console.error(
          "[stripe/webhook] welcome email threw (non-fatal):",
          message,
          emailError,
        );
      }

      console.log("[stripe/webhook] checkout flow completed successfully");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown checkout webhook error";
      console.error("[stripe/webhook] checkout handler crashed:", message, error);
      return { status: 500, body: { error: message } };
    }
  } else {
    console.log("[stripe/webhook] event ignored", { eventType: event.type });
  }

  return { status: 200, body: { received: true } };
}
