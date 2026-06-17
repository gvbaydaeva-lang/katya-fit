"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPhone("");
      setError("");
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      setError("Укажите корректный email");
      return;
    }

    if (!trimmedPhone) {
      setError("Укажите телефон");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          email: trimmedEmail,
          phone: trimmedPhone,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (data.url) {
        window.location.href = data.url;
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
          {planName} · {planPrice}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm text-[#1c1917]">
            Email для доступа к кабинету
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
              className="mt-1.5 w-full rounded-sm border border-[#E8E2D9] bg-white px-4 py-3 text-sm focus:border-[#C4956A] focus:outline-none"
              autoComplete="tel"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
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
