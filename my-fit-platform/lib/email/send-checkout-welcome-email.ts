import { Resend } from "resend";
import type Stripe from "stripe";
import { getAppOrigin } from "@/lib/app-url";
import { emailConfig, isResendConfigured } from "@/lib/email/config";
import { createAdminClient } from "@/lib/supabase/admin";

function getCheckoutEmail(session: Stripe.Checkout.Session): string {
  return (
    session.customer_details?.email ??
    session.customer_email ??
    session.metadata?.email ??
    ""
  ).trim();
}

export async function sendCheckoutWelcomeEmail(
  session: Stripe.Checkout.Session,
  stripeCheckoutSessionId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  console.log("[stripe/webhook][email] start", {
    stripeCheckoutSessionId,
    resendConfigured: isResendConfigured(),
    resendApiKeyLength: emailConfig.resendApiKey.length,
    from: emailConfig.from,
  });

  const admin = createAdminClient();
  const { data: payment, error: paymentError } = await admin
    .from("payments")
    .select("welcome_email_sent_at")
    .eq("stripe_checkout_session_id", stripeCheckoutSessionId)
    .maybeSingle();

  if (paymentError) {
    console.error("[stripe/webhook][email] payment lookup failed:", paymentError.message);
    return { ok: false, error: paymentError.message };
  }

  if (payment?.welcome_email_sent_at) {
    console.log("[stripe/webhook][email] already sent, skipping", {
      welcomeEmailSentAt: payment.welcome_email_sent_at,
    });
    return { ok: true };
  }

  if (!isResendConfigured()) {
    const error = "RESEND_API_KEY не задан";
    console.error("[stripe/webhook][email]", error);
    return { ok: false, error };
  }

  const to = getCheckoutEmail(session);
  if (!to) {
    const error = "Checkout session has no customer email";
    console.error("[stripe/webhook][email]", error, {
      customerDetailsEmail: session.customer_details?.email ?? null,
      customerEmail: session.customer_email ?? null,
      metadataEmail: session.metadata?.email ?? null,
    });
    return { ok: false, error };
  }

  const siteUrl = getAppOrigin();
  const resend = new Resend(emailConfig.resendApiKey);

  console.log("[stripe/webhook][email] sending via Resend", {
    from: emailConfig.from,
    to,
    siteUrl,
  });

  try {
    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      subject: "Доступ к платформе Katya Fit",
      html: `Здравствуйте! Спасибо за покупку. Ваш доступ к платформе активирован. Ссылка для входа: <a href="${siteUrl}">${siteUrl}</a>`,
    });

    if (error) {
      console.error("[stripe/webhook][email] Resend API error:", error);
      return { ok: false, error: error.message };
    }

    console.log("[stripe/webhook][email] sent successfully", {
      resendEmailId: data?.id ?? null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Resend send error";
    console.error("[stripe/webhook][email] unexpected send failure:", message);
    return { ok: false, error: message };
  }

  const { error: markError } = await admin
    .from("payments")
    .update({ welcome_email_sent_at: new Date().toISOString() })
    .eq("stripe_checkout_session_id", stripeCheckoutSessionId);

  if (markError) {
    console.error(
      "[stripe/webhook][email] welcome email sent but mark failed:",
      markError.message,
    );
  } else {
    console.log("[stripe/webhook][email] marked welcome_email_sent_at");
  }

  return { ok: true };
}
