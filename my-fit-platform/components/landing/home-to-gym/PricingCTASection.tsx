"use client";

import { Button } from "@/components/ui/Button";
import { PAYMENT_OPTIONS } from "@/lib/payments/payment-options";

const homeToGymPlan = PAYMENT_OPTIONS.homeToGym;

const INCLUDED_ITEMS = [
  "Видеоуроки с разбором техники",
  "Тренировки дома",
  "Тренировки в зале",
  "Материалы по питанию",
  "Личный кабинет",
  "Доступ навсегда",
] as const;

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-center gap-3 text-base font-medium text-[#1c1917] sm:text-lg">
      <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C4956A]" aria-hidden />
      {children}
    </li>
  );
}

type PricingCTASectionProps = {
  onCheckout: () => void;
};

export function PricingCTASection({ onCheckout }: PricingCTASectionProps) {
  return (
    <section id="what-you-get" className="scroll-mt-20 bg-white py-16 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-2xl font-bold uppercase tracking-widest text-[#1c1917]">
          Что вы получите
        </h2>

        <ul className="mx-auto grid w-fit max-w-full grid-cols-1 justify-center gap-y-4 sm:grid-cols-[max-content_max-content] sm:gap-x-20 sm:gap-y-4">
          {INCLUDED_ITEMS.map((item) => (
            <CheckItem key={item}>{item}</CheckItem>
          ))}
        </ul>

        <div className="mx-auto mt-8 max-w-md rounded-sm border border-[#C4956A]/40 bg-[#C4956A]/10 px-6 py-3">
          <p className="text-base font-semibold text-[#1c1917]">
            <span className="text-lg">🎁</span> Бонус: Меню на 3 дня без подсчёта калорий
          </p>
        </div>

        <div className="mt-8">
          <p className="text-3xl font-bold text-stone-900">
            {homeToGymPlan.usdPrice}
          </p>
          <p className="mt-1.5 text-base font-medium text-stone-600">
            {homeToGymPlan.rublePrice}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            onClick={onCheckout}
            className="w-fit rounded-sm !bg-[#C4956A] px-10 py-4 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:!bg-[#B07D54]"
          >
            ПОЛУЧИТЬ ДОСТУП
          </Button>
        </div>
      </div>
    </section>
  );
}
