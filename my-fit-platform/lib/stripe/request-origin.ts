/** Origin для success/cancel URL Stripe Checkout (Netlify, Vercel, localhost). */
export function getRequestOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost ?? request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (host) {
    const proto = forwardedProto?.split(",")[0]?.trim() ?? "https";
    return `${proto}://${host}`;
  }

  return new URL(request.url).origin;
}
