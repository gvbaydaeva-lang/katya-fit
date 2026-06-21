"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  CHECKOUT_CURRENCIES,
  formatPlanPrice,
  getCurrencyLabel,
  type CheckoutCurrency,
} from "@/lib/stripe/currencies";
import { getPlanById } from "@/lib/stripe/plans";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  planPrice: string;
};

export default function CheckoutModal({
  isOpen,
  onClose,
  planId,
  planName,
  planPrice,
}: CheckoutModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState<CheckoutCurrency>("usd");
  const [consent, setConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const plan = useMemo(() => getPlanById(planId), [planId]);
  const selectedPrice = plan
    ? formatPlanPrice(plan, currency)
    : planPrice;

  const trimmedFullName = fullName.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const isFormValid =
    trimmedFullName.length > 0 &&
    trimmedEmail.includes("@") &&
    trimmedPhone.length > 0 &&
    consent;

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFullName("");
      setEmail("");
      setPhone("");
      setCurrency("usd");
      setConsent(false);
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!trimmedFullName) {
      setError("Укажите имя и фамилию");
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Укажите корректный email");
      return;
    }

    if (!trimmedPhone) {
      setError("Укажите телефон");
      return;
    }

    if (!consent) {
      setError("Необходимо согласие на обработку персональных данных");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          fullName: trimmedFullName,
          email: trimmedEmail,
          phone: trimmedPhone,
          currency,
          cancelPath: `${window.location.pathname}${window.location.hash}`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.url) {
        window.location.assign(data.url);
        return;
      }

      if (data.demo && data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }

      setError(data.error ?? "Не удалось перейти к оплате. Попробуйте ещё раз.");
    } catch {
      setError("Не удалось перейти к оплате. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-black/50 px-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative mx-auto mt-20 w-full max-w-md rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-stone-400 transition-colors hover:text-stone-700"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>

        <h2
          id="checkout-modal-title"
          className="pr-8 text-xl font-semibold text-[#1c1917]"
        >
          Оформление доступа
        </h2>
        <p className="mt-2 text-[#C4956A]">
          {planName} · {selectedPrice}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <fieldset className="space-y-2">
            <legend className="text-sm text-[#1c1917]">Валюта оплаты</legend>
            <div className="grid grid-cols-2 gap-2">
              {CHECKOUT_CURRENCIES.map((option) => (
                <label
                  key={option}
                  className={`cursor-pointer rounded-sm border px-4 py-3 text-center text-sm transition-colors ${
                    currency === option
                      ? "border-[#C4956A] bg-[#C4956A]/10 text-[#1c1917]"
                      : "border-[#E8E2D9] bg-white text-stone-600 hover:border-[#C4956A]/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="currency"
                    value={option}
                    checked={currency === option}
                    onChange={() => setCurrency(option)}
                    className="sr-only"
                  />
                  {getCurrencyLabel(option)}
                </label>
              ))}
            </div>
            <p className="text-xs text-stone-500">
              Сумма в Stripe Checkout: {selectedPrice}
            </p>
          </fieldset>
          <label className="block text-sm text-[#1c1917]">
            Имя, Фамилия
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Иван Иванов"
              required
              className="mt-1.5 w-full rounded-sm border border-[#E8E2D9] bg-white px-4 py-3 text-sm focus:border-[#C4956A] focus:outline-none"
              autoComplete="name"
            />
          </label>

          <label className="block text-sm text-[#1c1917]">
            Email для доступа к кабинету
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1.5 w-full rounded-sm border border-[#E8E2D9] bg-white px-4 py-3 text-sm focus:border-[#C4956A] focus:outline-none"
              autoComplete="email"
            />
          </label>

          <label className="block text-sm text-[#1c1917]">
            Телефон (WhatsApp)
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
              className="mt-1.5 w-full rounded-sm border border-[#E8E2D9] bg-white px-4 py-3 text-sm focus:border-[#C4956A] focus:outline-none"
              autoComplete="tel"
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-[#1c1917]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-1 h-4 w-4 shrink-0 rounded-sm border-[#E8E2D9] accent-[#C4956A]"
            />
            <span>
              Я согласен на обработку персональных данных.{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C4956A] underline underline-offset-2 hover:text-[#B07D54]"
                onClick={(e) => e.stopPropagation()}
              >
                Политика конфиденциальности
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full rounded-sm bg-[#3D3530] py-4 text-sm font-medium text-white transition-colors hover:bg-[#C4956A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? "Загрузка..." : "Перейти к оплате →"}
          </button>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <p className="text-center text-xs text-stone-500">
            Безопасная оплата через Stripe · Доступ сразу после оплаты
          </p>
        </form>
      </div>
    </div>
  );
}
