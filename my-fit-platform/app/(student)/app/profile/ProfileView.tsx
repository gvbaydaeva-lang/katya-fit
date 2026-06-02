"use client";

import { PageHeading } from "@/components/ui/PageHeading";
import { getBrowserSession, isStaticHosting } from "@/lib/auth/browser-session";

type ProfileViewProps = {
  email?: string;
  planName?: string;
};

export function ProfileView({ email, planName }: ProfileViewProps) {
  const browser = isStaticHosting() ? getBrowserSession() : null;

  return (
    <>
      <PageHeading
        title="Профиль"
        description="Данные ученика и активный тариф."
      />
      <dl className="max-w-lg divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-zinc-500">Email</dt>
          <dd className="text-sm font-medium text-zinc-900">
            {browser?.email ?? email ?? "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-zinc-500">Тариф</dt>
          <dd className="text-sm font-medium text-zinc-900">
            {browser?.planName ?? planName ?? "—"}
          </dd>
        </div>
        <div className="flex justify-between gap-4 px-5 py-4">
          <dt className="text-sm text-zinc-500">Статус</dt>
          <dd className="text-sm font-medium text-emerald-700">Активен</dd>
        </div>
      </dl>
    </>
  );
}
