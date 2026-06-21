import type Stripe from "stripe";
import { getPlanById } from "@/lib/stripe/plans";
import { createAdminClient } from "@/lib/supabase/admin";

export async function savePaymentFromCheckoutSession(
  session: Stripe.Checkout.Session,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (session.payment_status !== "paid") {
    return { ok: false, error: "Checkout session is not paid" };
  }

  const stripeCheckoutSessionId = session.id;
  const email =
    session.customer_details?.email ??
    session.customer_email ??
    session.metadata?.email ??
    "";
  const userName =
    session.metadata?.full_name?.trim() ||
    session.customer_details?.name?.trim() ||
    "—";
  const phone =
    session.metadata?.phone?.trim() ||
    session.customer_details?.phone?.trim() ||
    null;
  const planId =
    session.metadata?.plan_id ?? session.metadata?.planId ?? "";
  const plan = getPlanById(planId);
  const planName =
    session.metadata?.plan_name?.trim() ||
    plan?.name ||
    planId ||
    "—";
  const amount = session.amount_total ?? 0;

  if (!email) {
    return { ok: false, error: "Checkout session has no email" };
  }

  if (amount <= 0) {
    return { ok: false, error: "Checkout session has invalid amount" };
  }

  const admin = createAdminClient();
  const { error } = await admin.from("payments").upsert(
    {
      stripe_checkout_session_id: stripeCheckoutSessionId,
      user_name: userName,
      email,
      phone,
      amount,
      plan_name: planName,
    },
    { onConflict: "stripe_checkout_session_id", ignoreDuplicates: true },
  );

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
