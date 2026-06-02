import { Suspense } from "react";
import { CheckoutSuccessClient } from "@/app/(public)/checkout/success/CheckoutSuccessClient";

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-md px-4 py-16 text-center text-sm text-zinc-500">
          Загрузка…
        </section>
      }
    >
      <CheckoutSuccessClient />
    </Suspense>
  );
}
