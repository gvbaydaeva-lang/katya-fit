import type Stripe from "stripe";
import { generatePasswordSetupLink } from "@/lib/auth/generate-password-setup-link";
import { upsertActiveSubscription } from "@/lib/auth/create-subscription";
import { isValidPlanId } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";

function getCheckoutEmail(session: Stripe.Checkout.Session): string {
  return (
    session.customer_details?.email ??
    session.customer_email ??
    session.metadata?.email ??
    ""
  ).trim();
}

function getCheckoutFullName(session: Stripe.Checkout.Session): string | undefined {
  const name =
    session.customer_details?.name?.trim() ||
    session.metadata?.full_name?.trim();
  return name || undefined;
}

function getCheckoutPlanId(session: Stripe.Checkout.Session): string {
  return session.metadata?.plan_id ?? session.metadata?.planId ?? "";
}

export async function fulfillCheckoutAccess(
  session: Stripe.Checkout.Session,
  stripeCheckoutSessionId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const admin = createAdminClient();

  const { data: payment, error: paymentError } = await admin
    .from("payments")
    .select("id")
    .eq("stripe_checkout_session_id", stripeCheckoutSessionId)
    .maybeSingle();

  if (paymentError) {
    return { ok: false, error: paymentError.message };
  }

  if (!payment) {
    return { ok: false, error: "Payment record not found" };
  }

  const email = getCheckoutEmail(session);
  if (!email) {
    return { ok: false, error: "Checkout session has no email" };
  }

  const linkResult = await generatePasswordSetupLink({
    email,
    fullName: getCheckoutFullName(session),
  });

  if (!linkResult.ok) {
    return { ok: false, error: linkResult.error };
  }

  const planId = getCheckoutPlanId(session);
  if (isValidPlanId(planId)) {
    const { error: subscriptionError } = await upsertActiveSubscription({
      userId: linkResult.userId,
      planId,
      stripeCheckoutSessionId: session.id,
      stripeCustomerId:
        typeof session.customer === "string" ? session.customer : undefined,
      periodDays: 3650,
    });

    if (subscriptionError) {
      return { ok: false, error: subscriptionError };
    }
  }

  return { ok: true };
}
