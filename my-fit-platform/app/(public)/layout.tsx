import { Suspense } from "react";
import { SubscriptionRedirectLogger } from "@/components/debug/SubscriptionRedirectLogger";
import { HashScrollHandler } from "@/components/public/HashScrollHandler";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Header } from "@/components/Header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <Suspense fallback={null}>
        <SubscriptionRedirectLogger />
      </Suspense>
      <HashScrollHandler />
      <Header />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
