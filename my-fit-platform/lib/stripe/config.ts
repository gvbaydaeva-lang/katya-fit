/** Заготовка под Stripe — ключи из .env.local */
export const stripeConfig = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  secretKey: process.env.STRIPE_SECRET_KEY ?? "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
};

export const isStripeConfigured = Boolean(
  stripeConfig.secretKey && stripeConfig.publishableKey,
);
