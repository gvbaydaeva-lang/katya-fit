import { emailConfig, isResendConfigured } from "@/lib/email/config";

type SendPurchaseAccessEmailParams = {
  to: string;
  accessLink: string;
};

export async function sendPurchaseAccessEmail(
  params: SendPurchaseAccessEmailParams,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isResendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY или RESEND_FROM_EMAIL не заданы" };
  }

  const text = [
    "Здравствуйте!",
    "",
    "Спасибо за покупку в Katya Fit. Ваш доступ к платформе готов.",
    "Пожалуйста, перейдите по ссылке ниже, чтобы установить пароль и войти в личный кабинет:",
    "",
    params.accessLink,
  ].join("\n");

  const html = `
    <p>Здравствуйте!</p>
    <p>Спасибо за покупку в Katya Fit. Ваш доступ к платформе готов.</p>
    <p>Пожалуйста, перейдите по ссылке ниже, чтобы установить пароль и войти в личный кабинет:</p>
    <p><a href="${params.accessLink}">${params.accessLink}</a></p>
  `.trim();

  const { Resend } = await import("resend");
  const resend = new Resend(emailConfig.resendApiKey);

  const { error } = await resend.emails.send({
    from: emailConfig.from,
    to: params.to,
    subject: "Ваш доступ к Katya Fit",
    text,
    html,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
