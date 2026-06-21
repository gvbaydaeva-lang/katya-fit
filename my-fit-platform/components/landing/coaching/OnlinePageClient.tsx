"use client";

import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useState } from "react";
import { HowItWorksSection } from "@/components/landing/coaching/HowItWorksSection";
import { ReadySection } from "@/components/landing/coaching/ReadySection";
import { WhatYouGetSection } from "@/components/landing/coaching/WhatYouGetSection";
import { LandingChrome } from "@/components/landing/LandingChrome";
import CheckoutModal from "@/components/public/CheckoutModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import onlineHero from "@/public/images/online-hero.webp";

const ONLINE_HERO_MASK: CSSProperties = {
  WebkitMaskImage: [
    "linear-gradient(to right, transparent 0%, black 4%)",
    "linear-gradient(to right, black 0%, black 90%, transparent 100%)",
    "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
  ].join(", "),
  maskImage: [
    "linear-gradient(to right, transparent 0%, black 4%)",
    "linear-gradient(to right, black 0%, black 90%, transparent 100%)",
    "linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)",
  ].join(", "),
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const COACHED_CHECKOUT_PLAN = {
  id: "coached",
  name: "Персональный старт",
  price: "$149",
} as const;

function Check() {
  return (
    <svg className="h-4 w-4 text-[#C4956A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const heroFeatures = [
  "Персональный план питания и тренировок",
  "Регулярные корректировки",
  "Поддержка 24/7",
  "Помощь при срывах и плато",
];

const forWhom = [
  "Для занятых мам",
  "Для женщин в эмиграции",
  "Для тех, кто устал от диет и срывов",
  "Для тех, кто хочет устойчивый результат",
];

const faqItems = [
  { q: "Что делать, если у меня был неудачный опыт похудения раньше?", a: "Я это слышу очень часто  и понимаю. Мы не строим очередную диету, мы выстраиваем систему, которую комфортно соблюдать каждый день. Без срывов и чувства вины." },
  { q: "Нужно ли покупать спортивное питание?", a: "Нет. Никаких обязательных добавок, только еда, движение и режим. Всё, что нужно, уже есть в программе." },
  { q: "Нужно ли полностью отказаться от любимых продуктов?", a: "Нет, и это принципиально. Запреты не работают долго. Мы учимся встраивать любимое в рацион так, чтобы это не мешало результату." },
  { q: "Можно ли совмещать программу с семейным питанием?", a: "Да. Программа не требует готовить отдельно, принципы питания подходят для всей семьи." },
  { q: "Что будет после завершения программы?", a: "У вас останется понимание, как поддерживать результат самостоятельно. Плюс — доступ к материалам, чтобы вернуться и освежить при необходимости." },
  { q: "Что если я пропущу тренировку или собьюсь с плана?", a: "Это нормально. Главное не перфекционизм, а возвращение. Программа построена так, чтобы легко войти обратно в ритм." },
  { q: "Через сколько я увижу первые изменения?", a: "Многие замечают разницу уже в первые 2–3 недели, в энергии, сне, самочувствии. Внешние изменения приходят чуть позже, но стабильно." },
];

export function OnlinePageClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    name: string;
    price: string;
  } | null>(null);

  function openCheckout() {
    setSelectedPlan(COACHED_CHECKOUT_PLAN);
    setModalOpen(true);
  }

  return (
    <LandingChrome>
      <section className="bg-[#FAF8F4] overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative aspect-[3/4]">
                <Image
                  src={onlineHero}
                  alt="Катя — онлайн сопровождение"
                  fill
                  className="object-cover object-[62%_top]"
                  style={ONLINE_HERO_MASK}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div>
              <h1 className="max-w-xl text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
                Онлайн<br />сопровождение
              </h1>
              <p className="mt-2 text-sm text-[#C4956A] font-medium tracking-wide">
                Индивидуальная работа со мной для тех,<br />кто хочет получить максимальный результат
              </p>
              <ul className="mt-6 space-y-3">
                {heroFeatures.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-stone-600"><Check />{f}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="#pricing" className="rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                  ХОЧУ В СОПРОВОЖДЕНИЕ
                </Link>
                <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-xs">▶</span>
                  <span className="text-left">СМОТРЕТЬ ВИДЕО<br /><span className="text-xs font-normal">о программе (1 мин)</span></span>
                </button>
              </div>
              <div className="mt-8 rounded-sm border border-[#E8E2D9] bg-white p-5">
                <p className="text-sm font-semibold text-stone-900">Для кого это подходит?</p>
                <ul className="mt-3 space-y-2">
                  {forWhom.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-stone-600">
                      <span className="text-[#C4956A] shrink-0 mt-0.5">◎</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhatYouGetSection />

      <HowItWorksSection />

      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Тарифы</h2>
          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
            <article className="flex h-full flex-col rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-8">
              <h3 className="text-xl font-bold text-stone-900">Персональный старт</h3>
              <p className="text-sm text-stone-400 mt-1">12 недель персональной работы</p>
              <ul className="mt-6 space-y-3">
                {["Подробная анкета", "Расчет КБЖУ", "Персональный план питания", "Программа тренировок", "Видео техники упражнений", "1 онлайн-тренировка по видеосвязи", "Ежемесячная корректировка плана"].map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-stone-600"><Check />{f}</li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <p className="text-xl text-[#9ca3af] line-through">$209</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-stone-900">$149</span>
                  <span className="text-sm text-stone-400">/ 12 недель</span>
                </div>
              </div>
              <button
                type="button"
                onClick={openCheckout}
                className="mt-4 inline-flex w-full justify-center rounded-sm bg-[#C4956A] px-5 py-3 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors"
              >
                КУПИТЬ
              </button>
            </article>
            <article className="flex h-full flex-col rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-8">
              <h3 className="text-xl font-bold text-stone-900">Вместе</h3>
              <p className="text-sm text-stone-400 mt-1">Полное онлайн сопровождение</p>
              <ul className="mt-6 space-y-3">
                {["Всё из тарифа «Персональный старт»", "Еженедельные отчеты", "Поддержка", "Ответы на вопросы", "Контроль питания", "Контроль тренировок", "Корректировки по мере необходимости"].map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-stone-600"><Check />{f}</li>
                ))}
              </ul>
              <div className="mt-auto rounded-sm bg-stone-100 p-4 text-center">
                <p className="text-sm text-stone-600">Индивидуальные условия. Заполните анкету, чтобы обсудить детали.</p>
              </div>
              <Link href="#" className="mt-4 inline-flex w-full justify-center rounded-sm bg-[#C4956A] px-5 py-3 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                ЗАПОЛНИТЬ АНКЕТУ
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-12 text-center text-3xl font-semibold text-[#1c1917] md:text-4xl">
            Частые вопросы
          </h2>

          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="!rounded-none !border-none !bg-transparent !shadow-none border-b border-[#E8E2D9]"
              >
                <AccordionTrigger className="!px-0 !pl-0 pr-8 !text-base py-4 text-left font-medium text-[#1c1917] hover:bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:text-[#C4956A]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="!px-0 !text-sm">
                  <p className="!px-0 pb-4 pt-1 pr-8 !text-sm leading-relaxed text-[#6b5e54]">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <ReadySection />

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
