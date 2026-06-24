export const emailConfig = {
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
};

export function isResendConfigured(): boolean {
  return Boolean(emailConfig.resendApiKey);
}
