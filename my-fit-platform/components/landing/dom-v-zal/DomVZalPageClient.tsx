"use client";

import Image from "next/image";
import { useState } from "react";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { CourseTimelineSection } from "@/components/landing/home-to-gym/CourseTimelineSection";
import { PricingCTASection } from "@/components/landing/home-to-gym/PricingCTASection";
import { FaqSection } from "@/components/landing/dom-v-zal/FaqSection";
import CheckoutModal from "@/components/public/CheckoutModal";
import katyaHero from "@/public/images/katya-hero.webp";

const DOM_V_ZAL_CHECKOUT_PLAN = {
  id: "self",
  name: "Самостоятельно",
  price: "$79",
} as const;

const DOM_V_ZAL_NAV_OVERRIDES = [
  { label: "ОБО МНЕ", href: "/#my-story", target: "_blank" },
  { label: "ОТЗЫВЫ", href: "/#results", target: "_blank" },
];

function Check() {
  return (
    <svg className="h-4 w-4 text-[#C4956A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function HeroPhotoGradient() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[48%] bg-gradient-to-r from-[#FAF8F4] from-5% via-[#FAF8F4]/75 via-35% to-transparent" />
  );
}

function PhotoSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-stone-200 ${className}`}>
      <p className="text-stone-400 text-xs text-center px-3 leading-relaxed">📷 {label}</p>
    </div>
  );
}

function WeeksCard({
  className = "",
  compact = false,
  mini = false,
}: {
  className?: string;
  compact?: boolean;
  mini?: boolean;
}) {
  const padding = mini ? "p-2" : compact ? "p-3" : "p-6";
  const width = mini ? "max-w-[118px]" : compact ? "max-w-[140px]" : "min-w-[140px]";
  const numberSize = mini ? "text-2xl" : compact ? "text-3xl" : "text-5xl";
  const dividerSpacing = mini ? "mt-1.5 pt-1.5" : compact ? "mt-2 pt-2" : "mt-4 pt-4";

  return (
    <div className={`rounded-sm border border-[#E8E2D9] text-center ${width} ${padding} ${className}`}>
      <p className={`font-bold text-stone-900 ${numberSize}`}>12</p>
      <p className={`font-medium tracking-wider text-[#C4956A] ${mini ? "mt-0.5 text-[10px]" : "mt-1 text-xs"}`}>
        НЕДЕЛЬ
      </p>
      {!mini && (
        <>
          <p className="mt-1 text-xs leading-snug text-stone-400">пошаговая<br />трансформация</p>
          <div className={`border-t border-[#E8E2D9] ${dividerSpacing}`}>
            <p className="text-xs leading-snug text-stone-500">
              Дома и в зале<br />
              <span className="font-medium text-stone-700">Вы выбираете<br />свой формат</span>
            </p>
          </div>
        </>
      )}
      {mini && (
        <p className="mt-1 text-[9px] leading-snug text-stone-500">дома и в зале</p>
      )}
    </div>
  );
}

const forWhom = [
  "Хотите привести тело в форму, но не знаете, с чего начать",
  "Устали от диет и подсчёта калорий",
  "Хотите тренироваться безопасно и эффективно",
  "Хотите больше энергии, лёгкости и уверенности в себе",
  "Готовы уделять себе 30–60 минут 3–5 раз в неделю",
];

const results12 = [
  "Стройное и подтянутое тело",
  "Снижение веса и объёмов",
  "Уверенность и энергия",
  "Привычка тренироваться и правильно питаться",
  "Понимание своего тела и прогресса",
];

const checkoutButtonClassName =
  "rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors";

export function DomVZalPageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);

  function openCheckout() {
    setSelectedPlan(DOM_V_ZAL_CHECKOUT_PLAN);
    setModalOpen(true);
  }

  return (
    <LandingChrome navOverrides={DOM_V_ZAL_NAV_OVERRIDES}>
      <section className="overflow-hidden bg-[#FAF8F4]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-stretch">
            <div className="flex min-w-0 flex-col">
              <h1 className="text-5xl font-bold text-stone-900 leading-tight sm:text-6xl lg:text-7xl">
                Из дома<br />в зал
              </h1>
              <p className="mt-3 text-sm font-medium text-[#C4956A] tracking-wider">— 12 недель, которые изменят не только ваше тело, но и вас</p>
              <p className="mt-4 max-w-lg text-base text-stone-500 leading-relaxed">
                Пошаговая программа для женщин, которые хотят начать тренироваться, похудеть, подтянуть тело и обрести уверенность — без стресса, диет и крайностей.
              </p>
              <div className="mt-8 hidden flex-wrap items-center gap-4 md:flex">
                <button type="button" onClick={openCheckout} className={checkoutButtonClassName}>
                  ХОЧУ В ПРОГРАММУ
                </button>
                <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-xs">▶</span>
                  <span className="text-left">СМОТРЕТЬ ВИДЕО<br /><span className="text-xs font-normal">о программе (1 мин)</span></span>
                </button>
              </div>
              <div className="relative mt-8 h-[min(68vw,400px)] w-full overflow-hidden rounded-sm md:hidden">
                <Image
                  src={katyaHero}
                  alt="Катя — фитнес-тренер KATY D."
                  fill
                  className="object-cover object-[right_50%]"
                  sizes="100vw"
                  priority
                />
                <HeroPhotoGradient />
                <div className="absolute bottom-2 left-2 z-10 max-w-[42%]">
                  <WeeksCard mini className="w-full bg-[#FAF8F4]/88 backdrop-blur-sm" />
                </div>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:hidden">
                <button type="button" onClick={openCheckout} className={checkoutButtonClassName}>
                  ХОЧУ В ПРОГРАММУ
                </button>
                <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-xs">▶</span>
                  <span className="text-left">СМОТРЕТЬ ВИДЕО<br /><span className="text-xs font-normal">о программе (1 мин)</span></span>
                </button>
              </div>
            </div>
            <div className="relative hidden min-h-0 md:block">
              <div className="relative h-full w-full overflow-hidden rounded-sm">
                <Image
                  src={katyaHero}
                  alt="Катя — фитнес-тренер KATY D."
                  fill
                  className="object-cover object-[right_50%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <HeroPhotoGradient />
                <div className="absolute bottom-3 left-3 z-10 max-w-[38%]">
                  <WeeksCard compact className="w-full bg-[#FAF8F4]/88 backdrop-blur-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[160px_1fr_1px_1fr_160px] lg:items-start">
            <PhotoSlot label="фото" className="hidden lg:flex aspect-[2/3] rounded-sm" />
            <div>
              <h3 className="text-xl font-bold text-stone-900">Эта программа для вас, если вы:</h3>
              <ul className="mt-6 space-y-3">
                {forWhom.map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-stone-600"><Check />{t}</li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:block self-stretch bg-[#E8E2D9]" />
            <div>
              <h3 className="text-xl font-bold text-stone-900">Результат за 12 недель:</h3>
              <ul className="mt-6 space-y-3">
                {results12.map((t) => (
                  <li key={t} className="flex gap-3 text-sm text-stone-600"><Check />{t}</li>
                ))}
              </ul>
            </div>
            <PhotoSlot label="фото" className="hidden lg:flex aspect-[2/3] rounded-sm" />
          </div>
        </div>
      </section>

      <CourseTimelineSection />

      <PricingCTASection onCheckout={openCheckout} />

      <FaqSection onCheckout={openCheckout} />

      {selectedPlan && (
        <CheckoutModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          planId={selectedPlan.id}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </LandingChrome>
  );
}
