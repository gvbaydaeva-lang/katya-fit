"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeading } from "@/components/ui/PageHeading";
import { STUDENT_ROUTES } from "@/lib/auth/routes";

/** На GitHub Pages Stripe success URL ведёт сюда; для демо — в кабинет */
export function CheckoutSuccessClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      router.replace(STUDENT_ROUTES.dashboard);
    }
  }, [searchParams, router]);

  return (
    <section className="mx-auto max-w-md px-4 py-16 text-center">
      <PageHeading
        title="Оплата прошла успешно"
        description="Перенаправляем в личный кабинет…"
      />
    </section>
  );
}
