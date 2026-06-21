"use client";

import Image from "next/image";
import { useState } from "react";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { HeroAudienceCard } from "@/components/landing/HeroAudienceCard";
import { LANDING_HERO_TITLE_CLASS, LANDING_HERO_OBJECT_DOM_V_ZAL } from "@/components/landing/landing-hero-styles";
import { ProgramLandingHero } from "@/components/landing/ProgramLandingHero";
import { CourseTimelineSection } from "@/components/landing/home-to-gym/CourseTimelineSection";
import { PricingCTASection } from "@/components/landing/home-to-gym/PricingCTASection";
import { FaqSection } from "@/components/landing/dom-v-zal/FaqSection";
import CheckoutModal from "@/components/public/CheckoutModal";
import domVZalForWhom from "@/public/images/dom-v-zal-for-whom.webp";
import katyaHero from "@/public/images/katya-hero.webp";

import { getPlanById } from "@/lib/stripe/plans";

const selfPlan = getPlanById("self")!;

const DOM_V_ZAL_CHECKOUT_PLAN = {
  id: selfPlan.id,
  name: selfPlan.name,
  price: selfPlan.price,
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

function WeeksCard({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const padding = compact ? "p-3" : "p-6";
  const width = compact ? "max-w-[140px]" : "min-w-[140px]";
  const numberSize = compact ? "text-3xl" : "text-5xl";
  const dividerSpacing = compact ? "mt-2 pt-2" : "mt-4 pt-4";

  return (
    <div
      className={`rounded-sm border border-[#E8E2D9] bg-white text-center shadow-[0_4px_20px_rgba(28,25,23,0.1)] ${width} ${padding} ${className}`}
    >
      <p className={`font-bold text-stone-900 ${numberSize}`}>12</p>
      <p className={`mt-1 font-medium tracking-wider text-[#C4956A] ${compact ? "text-[10px]" : "text-xs"}`}>
        НЕДЕЛЬ
      </p>
      {!compact && (
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
      {compact && (
        <p className="mt-1 text-[10px] leading-snug text-stone-500">пошаговая трансформация</p>
      )}
    </div>
  );
}

const heroAudience = [
  "Для тех, кто никогда не занимался в зале и боится начать",
  "Для тех, кто хочет тренироваться и дома, и в зале — по ситуации",
  "Для тех, кто устал от хаотичных тренировок без системы",
  "Для тех, кто хочет видимый результат за 12 недель",
] as const;

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
      <ProgramLandingHero
        image={katyaHero}
        imageAlt="Катя — фитнес-тренер KATY D."
        imagePosition="right"
        imageEdgeFade
        imageObjectPosition={LANDING_HERO_OBJECT_DOM_V_ZAL}
        imageOverlay={
          <div className="absolute bottom-5 left-5 z-10 sm:bottom-6 sm:left-6">
            <WeeksCard compact />
          </div>
        }
      >
        <div className="flex flex-col lg:h-full">
          <div>
            <h1 className={`text-stone-900 ${LANDING_HERO_TITLE_CLASS}`}>
              Из дома в зал
            </h1>
            <p className="mt-3 text-sm font-medium tracking-wider text-[#C4956A]">
              — 12 недель, которые изменят не только ваше тело, но и вас
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone-500">
              Пошаговая программа для женщин, которые хотят начать тренироваться, похудеть, подтянуть тело и обрести уверенность — без стресса, диет и крайностей.
            </p>
          </div>
          <div className="mt-8 lg:hidden">
            <button type="button" onClick={openCheckout} className={checkoutButtonClassName}>
              ХОЧУ В ПРОГРАММУ
            </button>
          </div>
          <div className="mt-8 hidden flex-wrap items-center gap-4 lg:flex">
            <button type="button" onClick={openCheckout} className={checkoutButtonClassName}>
              ХОЧУ В ПРОГРАММУ
            </button>
            <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-xs">▶</span>
              <span className="text-left">СМОТРЕТЬ ВИДЕО<br /><span className="text-xs font-normal">о программе (1 мин)</span></span>
            </button>
          </div>
          <HeroAudienceCard
            title="Кому подходит программа"
            items={heroAudience}
            variant="plain"
            className="mt-8 lg:hidden"
          />
          <div className="mt-auto hidden pt-8 lg:block">
            <HeroAudienceCard title="Кому подходит программа" items={heroAudience} />
          </div>
        </div>
      </ProgramLandingHero>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[160px_1fr_1px_1fr_160px] lg:items-stretch">
            <div className="relative hidden aspect-[3/4] h-full w-full overflow-hidden rounded-sm lg:block">
              <Image
                src={domVZalForWhom}
                alt="Эта программа для вас"
                fill
                className="object-cover object-center"
                sizes="160px"
              />
            </div>
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
            <div className="relative hidden aspect-[3/4] h-full w-full overflow-hidden rounded-sm lg:block">
              <Image
                src="/images/katya-result.jpg"
                alt="Катя — результат программы"
                fill
                className="object-cover object-top"
                sizes="160px"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white px-6 pb-8 pt-2 md:hidden">
        <div className="mx-auto flex max-w-6xl justify-center">
          <button type="button" onClick={openCheckout} className={checkoutButtonClassName}>
            ПОЛУЧИТЬ ДОСТУП
          </button>
        </div>
      </div>

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
