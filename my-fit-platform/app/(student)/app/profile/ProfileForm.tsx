"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  getBrowserSession,
  isStaticHosting,
} from "@/lib/auth/browser-session";
import { dsDivider, dsElevated, dsInput } from "@/lib/ds-theme";
import type { StudentProfileForm } from "@/lib/student/profile";
import {
  hasProfileFieldErrors,
  validateProfileForm,
  type ProfileFieldErrors,
} from "@/lib/student/profile-validation";
import {
  loadStaticProfileForm,
  saveStaticProfileForm,
} from "@/lib/student/profile-storage";

export type ProfileAccountInfo = {
  email: string;
  planName: string;
  subscriptionPeriod: string;
};

type ProfileFormProps = {
  initial: StudentProfileForm;
  account: ProfileAccountInfo;
};

const fieldClass = `${dsInput}`;
const fieldInvalidClass = "ring-2 ring-red-500/40 ring-inset";

function fieldClassName(invalid: boolean): string {
  return invalid ? `${fieldClass} ${fieldInvalidClass}` : fieldClass;
}

function ReadOnlyRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className={`flex flex-col gap-1 border-b ${dsDivider} px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4`}
    >
      <dt className="text-sm text-ds-muted">{label}</dt>
      <dd className="text-sm font-medium text-ds-text">{value || "—"}</dd>
    </div>
  );
}

export function ProfileForm({ initial, account: accountProp }: ProfileFormProps) {
  const staticMode = isStaticHosting();
  const [account, setAccount] = useState(accountProp);

  useEffect(() => {
    if (!staticMode) return;
    const browser = getBrowserSession();
    if (browser) {
      setAccount({
        email: browser.email,
        planName: browser.planName,
        subscriptionPeriod: "—",
      });
    }
  }, [staticMode]);

  const [form, setForm] = useState<StudentProfileForm>(() => {
    if (staticMode) {
      return loadStaticProfileForm() ?? initial;
    }
    return initial;
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});

  function updateField<K extends keyof StudentProfileForm>(
    key: K,
    value: StudentProfileForm[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in fieldErrors) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof ProfileFieldErrors];
        return next;
      });
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const validation = validateProfileForm(form);
    if (hasProfileFieldErrors(validation)) {
      setFieldErrors(validation);
      setError("Заполните обязательные поля: фамилия, имя и телефон.");
      return;
    }
    setFieldErrors({});

    setSaving(true);

    if (staticMode) {
      saveStaticProfileForm(form);
      setMessage("Изменения сохранены локально (демо-режим).");
      setSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.fieldErrors && typeof data.fieldErrors === "object") {
          setFieldErrors(data.fieldErrors as ProfileFieldErrors);
        }
        setError(data.error ?? "Не удалось сохранить");
        return;
      }
      setMessage("Изменения сохранены");
    } catch {
      setError("Ошибка сети");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl" noValidate>
      <section className={`${dsElevated} overflow-hidden`}>
        <dl>
          <ReadOnlyRow label="E-mail" value={account.email} />
          <ReadOnlyRow label="Тариф" value={account.planName} />
          <ReadOnlyRow
            label="Срок действия подписки"
            value={account.subscriptionPeriod}
          />
        </dl>
      </section>

      <section className={`mt-5 grid gap-4 sm:grid-cols-2 ${dsElevated} p-5`}>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-ds-text">
            Фамилия <span className="text-rose-600">*</span>
          </span>
          <input
            type="text"
            name="last_name"
            required
            className={fieldClassName(Boolean(fieldErrors.last_name))}
            value={form.last_name}
            onChange={(e) => updateField("last_name", e.target.value)}
            autoComplete="family-name"
            aria-invalid={Boolean(fieldErrors.last_name)}
            aria-describedby={fieldErrors.last_name ? "err-last_name" : undefined}
          />
          {fieldErrors.last_name && (
            <p id="err-last_name" className="mt-1 text-xs text-red-700">
              {fieldErrors.last_name}
            </p>
          )}
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-ds-text">
            Имя <span className="text-rose-600">*</span>
          </span>
          <input
            type="text"
            name="first_name"
            required
            className={fieldClassName(Boolean(fieldErrors.first_name))}
            value={form.first_name}
            onChange={(e) => updateField("first_name", e.target.value)}
            autoComplete="given-name"
            aria-invalid={Boolean(fieldErrors.first_name)}
            aria-describedby={fieldErrors.first_name ? "err-first_name" : undefined}
          />
          {fieldErrors.first_name && (
            <p id="err-first_name" className="mt-1 text-xs text-red-700">
              {fieldErrors.first_name}
            </p>
          )}
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ds-text">
            Отчество
          </span>
          <input
            type="text"
            name="middle_name"
            className={fieldClass}
            value={form.middle_name}
            onChange={(e) => updateField("middle_name", e.target.value)}
            autoComplete="additional-name"
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-ds-text">
            Дата рождения
          </span>
          <input
            type="date"
            name="birth_date"
            className={fieldClass}
            value={form.birth_date}
            onChange={(e) => updateField("birth_date", e.target.value)}
          />
        </label>
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-sm font-medium text-ds-text">
            Телефон <span className="text-rose-600">*</span>
          </span>
          <input
            type="tel"
            name="phone"
            required
            className={fieldClassName(Boolean(fieldErrors.phone))}
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            autoComplete="tel"
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
          />
          {fieldErrors.phone && (
            <p id="err-phone" className="mt-1 text-xs text-red-700">
              {fieldErrors.phone}
            </p>
          )}
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ds-text">Город</span>
          <input
            type="text"
            name="city"
            className={fieldClass}
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            autoComplete="address-level2"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-sm font-medium text-ds-text">О себе</span>
          <textarea
            name="about"
            className={`${fieldClass} min-h-[120px] resize-y`}
            value={form.about}
            onChange={(e) => updateField("about", e.target.value)}
            rows={4}
          />
        </label>
      </section>

      {error && (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      {message && (
        <p className="mt-4 text-sm text-emerald-800" role="status">
          {message}
        </p>
      )}

      <div className="mt-6 pb-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Сохранение…" : "Сохранить изменения"}
        </Button>
      </div>
    </form>
  );
}
