import { Resend } from "resend";
import type Stripe from "stripe";
import { getAppOrigin } from "@/lib/app-url";
import { emailConfig, isResendConfigured } from "@/lib/email/config";
import { createAdminClient } from "@/lib/supabase/admin";

type SendCheckoutWelcomeEmailParams = {
  session: Stripe.Checkout.Session;
  stripeCheckoutSessionId: string;
  actionLink: string;
};

function getCheckoutEmail(session: Stripe.Checkout.Session): string {
  return (
    session.customer_details?.email ??
    session.customer_email ??
    session.metadata?.email ??
    ""
  ).trim();
}

function buildCheckoutWelcomeEmailHtml(actionLink: string): string {
  return `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #000;">Здравствуйте!</h2>
  <p>Спасибо за покупку в <strong>Katya Fit</strong>.</p>
  <p>Ваш доступ к платформе готов. Пожалуйста, перейдите по кнопке ниже, чтобы установить пароль и войти в личный кабинет:</p>
  
  <a href="${actionLink}" style="display: inline-block; padding: 12px 24px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0;">Установить пароль и войти</a>
  
  <p style="font-size: 14px; color: #666;">Если кнопка не работает, скопируйте эту ссылку в браузер:<br>
  ${actionLink}</p>
  
  <p>С уважением,<br>Команда Katya Fit</p>
</div>`;
}

export async function sendCheckoutWelcomeEmail(
  params: SendCheckoutWelcomeEmailParams,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { session, stripeCheckoutSessionId, actionLink } = params;

  try {
    console.log("[stripe/webhook][email] start", {
      stripeCheckoutSessionId,
      resendConfigured: isResendConfigured(),
      resendApiKeyLength: emailConfig.resendApiKey.length,
      from: emailConfig.from,
      hasActionLink: Boolean(actionLink),
    });

    if (!actionLink) {
      const error = "Password setup link is missing";
      console.error("[stripe/webhook][email]", error);
      return { ok: false, error };
    }

    const admin = createAdminClient();
    const { data: payment, error: paymentError } = await admin
      .from("payments")
      .select("welcome_email_sent_at")
      .eq("stripe_checkout_session_id", stripeCheckoutSessionId)
      .maybeSingle();

    if (paymentError) {
      console.error(
        "[stripe/webhook][email] payment lookup failed:",
        paymentError.message,
      );
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

    const { data, error } = await resend.emails.send({
      from: emailConfig.from,
      to,
      subject: "Доступ к платформе Katya Fit",
      html: buildCheckoutWelcomeEmailHtml(actionLink),
    });

    if (error) {
      console.error("[stripe/webhook][email] Resend API error:", error);
      return { ok: false, error: error.message };
    }

    console.log("[stripe/webhook][email] sent successfully", {
      resendEmailId: data?.id ?? null,
    });

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
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Resend send error";
    console.error("[stripe/webhook][email] unexpected failure:", message, error);
    return { ok: false, error: message };
  }
}
