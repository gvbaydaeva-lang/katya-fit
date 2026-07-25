"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  planPrice: string;
  rublePaymentUrl?: string;
};

export default function CheckoutModal({
  isOpen,
  onClose,
  planId,
  planName,
  planPrice,
  rublePaymentUrl,
}: CheckoutModalProps) {
  const [currency, setCurrency] = useState<"rub" | "usd">(
    rublePaymentUrl ? "rub" : "usd",
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const trimmedFullName = fullName.trim();
  const trimmedEmail = email.trim();
  const trimmedPhone = phone.trim();
  const isFormValid =
    trimmedFullName.length > 0 &&
    trimmedEmail.includes("@") &&
    trimmedPhone.length > 0 &&
    consent &&
    offerAccepted;

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleClose() {
    setCurrency(rublePaymentUrl ? "rub" : "usd");
    setFullName("");
    setEmail("");
    setPhone("");
    setConsent(false);
    setOfferAccepted(false);
    setError("");
    setIsLoading(false);
    onClose();
  }

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

    if (!offerAccepted) {
      setError("Необходимо принять условия публичной оферты");
      return;
    }

    setIsLoading(true);

    if (currency === "rub" && rublePaymentUrl) {
      window.location.assign(rublePaymentUrl);
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          fullName: trimmedFullName,
          email: trimmedEmail,
          phone: trimmedPhone,
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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-4 sm:py-20"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="relative mx-auto w-full max-w-md rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-modal-title"
      >
        <button
          type="button"
          onClick={handleClose}
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
          {planName}
          {!rublePaymentUrl && ` · ${planPrice}`}
        </p>

        {rublePaymentUrl && (
          <div className="mt-6">
            <p className="mb-2 text-sm text-[#1c1917]">
              Выберите валюту оплаты
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCurrency("rub")}
                aria-pressed={currency === "rub"}
                className={`whitespace-nowrap rounded-sm border px-2 py-3 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                  currency === "rub"
                    ? "border-[#3D3530] bg-[#3D3530] text-white"
                    : "border-[#E8E2D9] bg-white text-[#1c1917] hover:border-[#C4956A]"
                }`}
              >
                Оплата в рублях ₽
              </button>
              <button
                type="button"
                onClick={() => setCurrency("usd")}
                aria-pressed={currency === "usd"}
                className={`whitespace-nowrap rounded-sm border px-2 py-3 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                  currency === "usd"
                    ? "border-[#3D3530] bg-[#3D3530] text-white"
                    : "border-[#E8E2D9] bg-white text-[#1c1917] hover:border-[#C4956A]"
                }`}
              >
                Оплата в долларах $
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
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
              Я согласен на обработку персональных данных в соответствии с{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C4956A] underline underline-offset-2 hover:text-[#B07D54]"
                onClick={(e) => e.stopPropagation()}
              >
                Политикой конфиденциальности
              </Link>
            </span>
          </label>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-[#1c1917]">
            <input
              type="checkbox"
              checked={offerAccepted}
              onChange={(e) => setOfferAccepted(e.target.checked)}
              required
              className="mt-1 h-4 w-4 shrink-0 rounded-sm border-[#E8E2D9] accent-[#C4956A]"
            />
            <span>
              Я принимаю условия{" "}
              <Link
                href="/documents/public-offer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C4956A] underline underline-offset-2 hover:text-[#B07D54]"
                onClick={(e) => e.stopPropagation()}
              >
                Публичной оферты
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="w-full rounded-sm bg-[#3D3530] py-4 text-sm font-medium text-white transition-colors hover:bg-[#C4956A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading
              ? "Загрузка..."
              : currency === "rub"
                ? "Перейти к оплате в рублях →"
                : "Перейти к оплате в долларах →"}
          </button>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
