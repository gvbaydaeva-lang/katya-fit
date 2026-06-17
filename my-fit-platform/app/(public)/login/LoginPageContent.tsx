"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/app/(public)/login/LoginForm";
import { PageHeading } from "@/components/ui/PageHeading";

function LoginPageInner() {
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") ?? "/admin/clients";

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <PageHeading
        title="Вход"
        description="Для учеников, которые уже оплатили тариф."
      />
      {callbackUrl && (
        <p className="-mt-4 mb-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
          После входа: {callbackUrl}
        </p>
      )}
      <LoginForm callbackUrl={callbackUrl} />
    </section>
  );
}

export function LoginPageContent() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-md px-4 py-16 text-sm text-zinc-500">
          Загрузка…
        </section>
      }
    >
      <LoginPageInner />
    </Suspense>
  );
}
