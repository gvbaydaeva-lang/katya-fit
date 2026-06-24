import { emailConfig, isResendConfigured } from "@/lib/email/config";

type SendPurchaseAccessEmailParams = {
  to: string;
  accessLink: string;
};

export async function sendPurchaseAccessEmail(
  params: SendPurchaseAccessEmailParams,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isResendConfigured()) {
    return { ok: false, error: "RESEND_API_KEY не задан" };
  }

  const html = `Здравствуйте! Спасибо за покупку. Ваш доступ к платформе активирован. Ссылка для входа: <a href="${params.accessLink}">${params.accessLink}</a>`;

  const { Resend } = await import("resend");
  const resend = new Resend(emailConfig.resendApiKey);

  const { error } = await resend.emails.send({
    from: emailConfig.from,
    to: params.to,
    subject: "Доступ к платформе Katya Fit",
    html,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}
