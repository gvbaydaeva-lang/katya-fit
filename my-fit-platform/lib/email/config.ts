export const emailConfig = {
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  from: process.env.RESEND_FROM_EMAIL ?? "",
};

export function isResendConfigured(): boolean {
  return Boolean(emailConfig.resendApiKey && emailConfig.from);
}
