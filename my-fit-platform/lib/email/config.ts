export const emailConfig = {
  resendApiKey: process.env.RESEND_API_KEY?.trim() ?? "",
  from: process.env.RESEND_FROM_EMAIL?.trim() ?? "",
};

export function isResendConfigured(): boolean {
  return Boolean(emailConfig.resendApiKey && emailConfig.from);
}

export function getResendConfigError(): string | null {
  if (!emailConfig.resendApiKey) return "RESEND_API_KEY не задан";
  if (!emailConfig.from) return "RESEND_FROM_EMAIL не задан";
  if (!emailConfig.from.includes("@")) {
    return "RESEND_FROM_EMAIL должен быть email-адресом отправителя";
  }
  return null;
}
