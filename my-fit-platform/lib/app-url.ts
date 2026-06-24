export function getAppOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "") ||
    "http://localhost:3000"
  );
}
