/** Ключи Stripe из переменных окружения (Netlify: STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY). */
export const stripeConfig = {
  publishableKey:
    process.env.STRIPE_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
    "",
  secretKey: process.env.STRIPE_SECRET_KEY ?? "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
};

export const isStripeConfigured = Boolean(
  stripeConfig.secretKey && stripeConfig.publishableKey,
);
