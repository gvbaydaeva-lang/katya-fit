"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import { HowItWorksSection } from "@/components/landing/coaching/HowItWorksSection";
import { ClientResultsSection } from "@/components/landing/ClientResultsSection";
import { ReadySection } from "@/components/landing/coaching/ReadySection";
import { WhatYouGetSection } from "@/components/landing/coaching/WhatYouGetSection";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { HeroAudienceCard } from "@/components/landing/HeroAudienceCard";
import { LANDING_HERO_TITLE_CLASS, LANDING_HERO_OBJECT_ONLINE } from "@/components/landing/landing-hero-styles";
import { ProgramLandingHero } from "@/components/landing/ProgramLandingHero";
import CheckoutModal from "@/components/public/CheckoutModal";
import { PAYMENT_OPTIONS } from "@/lib/payments/payment-options";
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

const ONLINE_CHECKOUT_PLANS = {
  together: PAYMENT_OPTIONS.coachingTogether,
  controlled3Months: PAYMENT_OPTIONS.coachingControlled3Months,
  controlled6Months: PAYMENT_OPTIONS.coachingControlled6Months,
} as const;

const ONLINE_NAV_OVERRIDES = [{ label: "ОТЗЫВЫ", href: "#results" }];

function Check() {
  return (
    <svg className="h-4 w-4 text-[#C4956A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const heroFeatures = [
  "Два формата работы под разный уровень поддержки",
  "Персональный план питания и тренировок",
  "Самостоятельная работа или полное сопровождение",
  "Корректировки в зависимости от выбранного формата",
];

const PERSONAL_PLAN_FEATURES = [
  "Индивидуальный план питания",
  "Персональная программа тренировок",
  "Видео техники и подробные инструкции",
  "Корректировка плана 1 раз в месяц",
];

const CONTROLLED_FEATURES = [
  "Постоянная связь и ответы на вопросы",
  "Контроль питания и корректировки",
  "Контроль тренировок и техники",
  "Еженедельные отчёты",
  "Помощь при срывах, плато и снижении мотивации",
  "Работа на результат и формирование привычек",
];

const FORMAT_COMPARISON = [
  {
    label: "Индивидуальный план питания и тренировок",
    personal: "Включено",
    controlled: "Включено",
  },
  {
    label: "Корректировка плана",
    personal: "1 раз в месяц",
    controlled: "По мере необходимости",
  },
  {
    label: "Еженедельные отчёты",
    personal: "Не входит",
    controlled: "Включено",
  },
  {
    label: "Поддержка и ответы на вопросы",
    personal: "Не входит",
    controlled: "Включено",
  },
  {
    label: "Контроль питания, тренировок и техники",
    personal: "Не входит",
    controlled: "Включено",
  },
  {
    label: "Помощь при срывах, плато и потере мотивации",
    personal: "Не входит",
    controlled: "Включено",
  },
] as const;

const forWhom = [
  "Для занятых мам",
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
  const [controlledMonths, setControlledMonths] = useState<3 | 6>(6);
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof ONLINE_CHECKOUT_PLANS)[keyof typeof ONLINE_CHECKOUT_PLANS] | null
  >(null);

  const controlledPlan =
    controlledMonths === 3
      ? ONLINE_CHECKOUT_PLANS.controlled3Months
      : ONLINE_CHECKOUT_PLANS.controlled6Months;

  function openCheckout(plan: (typeof ONLINE_CHECKOUT_PLANS)[keyof typeof ONLINE_CHECKOUT_PLANS]) {
    setSelectedPlan(plan);
    setModalOpen(true);
  }

  return (
    <LandingChrome navOverrides={ONLINE_NAV_OVERRIDES}>
      <ProgramLandingHero
        image={onlineHero}
        imageAlt="Катя — персональная работа онлайн"
        imageObjectPosition={LANDING_HERO_OBJECT_ONLINE}
        imageMask={ONLINE_HERO_MASK}
      >
        <div className="flex flex-col">
        <h1 className={`text-stone-900 ${LANDING_HERO_TITLE_CLASS}`}>
          Персональная работа онлайн
        </h1>
        <p className="mt-2 text-sm font-medium tracking-wide text-[#C4956A]">
          Выберите комфортный уровень поддержки:<br />персональный план или полное сопровождение
        </p>
        <ul className="order-3 mt-6 space-y-3">
          {heroFeatures.map((f) => (
            <li key={f} className="flex gap-3 text-sm text-stone-600"><Check />{f}</li>
          ))}
        </ul>
        <HeroAudienceCard
          title="Для кого это подходит?"
          items={forWhom}
          className="order-4 mt-8 lg:order-5"
        />
        <div className="order-5 mt-8 flex flex-wrap items-center gap-4 lg:order-4">
          <Link href="#pricing" className="rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
            ВЫБРАТЬ ФОРМАТ
          </Link>
          <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-xs">▶</span>
            <span className="text-left">СМОТРЕТЬ ВИДЕО<br /><span className="text-xs font-normal">о программе (1 мин)</span></span>
          </button>
        </div>
        </div>
      </ProgramLandingHero>

      <WhatYouGetSection />

      <HowItWorksSection />

      <ClientResultsSection />

      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4956A]">
              Два формата — один результат
            </p>
            <h2 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
              Выберите, как вам комфортнее идти к цели
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-500 sm:text-base">
              В обоих форматах вы получаете индивидуальный план питания и тренировок.
              Разница — в уровне моей поддержки и контроля.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-5">
            <article className="flex h-full flex-col rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-6 sm:p-8 lg:col-span-2">
              <div className="flex items-center gap-3">
                <span className="rounded-sm bg-[#F1E7DC] px-2.5 py-1 text-xs font-semibold text-[#9C6B43]">
                  01
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                  Самостоятельный формат
                </p>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-stone-900">Персональный план</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                Я составляю индивидуальный маршрут, а вы двигаетесь к цели самостоятельно.
              </p>

              <ul className="mt-6 space-y-3">
                {PERSONAL_PLAN_FEATURES.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed text-stone-600">
                    <Check />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-sm border border-[#E8E2D9] bg-white px-4 py-3">
                <p className="text-xs leading-relaxed text-stone-500">
                  <span className="font-semibold text-stone-700">Важно:</span>{" "}
                  постоянная поддержка и контроль в этот формат не входят.
                </p>
              </div>

              <div className="mt-auto pt-8">
                <div className="border-t border-[#E8E2D9] pt-6 text-center">
                  <p className="text-4xl font-bold text-stone-900">
                    {ONLINE_CHECKOUT_PLANS.together.usdPrice}
                  </p>
                  <p className="mt-1 text-sm text-stone-500">за 3 месяца</p>
                  <p className="mt-2 text-base font-medium text-stone-700">
                    {ONLINE_CHECKOUT_PLANS.together.rublePrice}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openCheckout(ONLINE_CHECKOUT_PLANS.together)}
                  className="mt-5 inline-flex w-full justify-center rounded-sm bg-[#C4956A] px-5 py-3.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-[#B07D54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4956A]"
                >
                  ПОЛУЧИТЬ ПЕРСОНАЛЬНЫЙ ПЛАН
                </button>
              </div>
            </article>

            <article className="relative flex h-full flex-col rounded-sm border border-[#A7426B]/35 bg-[#FCF7F9] p-6 shadow-[0_16px_40px_rgba(91,40,61,0.08)] sm:p-8 lg:col-span-3">
              <span className="absolute right-0 top-0 rounded-bl-sm bg-[#96365E] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                Самый популярный
              </span>
              <div className="flex items-center gap-3 pr-28">
                <span className="rounded-sm bg-[#F2DCE5] px-2.5 py-1 text-xs font-semibold text-[#96365E]">
                  02
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#96365E]">
                  Полное сопровождение
                </p>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-stone-900">Всё под контролем</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">
                Я сопровождаю вас на каждом этапе: контролирую питание и тренировки,
                отслеживаю прогресс и корректирую план по мере необходимости.
              </p>

              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {CONTROLLED_FEATURES.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm leading-relaxed text-stone-600">
                    <Check />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  Выберите срок сопровождения
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3" role="group" aria-label="Срок сопровождения">
                  <button
                    type="button"
                    onClick={() => setControlledMonths(3)}
                    aria-pressed={controlledMonths === 3}
                    className={`rounded-sm border px-3 py-3 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96365E] ${
                      controlledMonths === 3
                        ? "border-[#96365E] bg-white text-[#96365E]"
                        : "border-[#E8D9DF] bg-white/60 text-stone-500 hover:border-[#C98DA6]"
                    }`}
                  >
                    <span className="block text-sm font-semibold">3 месяца</span>
                    <span className="mt-1 block text-xs">$480</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setControlledMonths(6)}
                    aria-pressed={controlledMonths === 6}
                    className={`relative rounded-sm border px-3 py-3 text-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96365E] ${
                      controlledMonths === 6
                        ? "border-[#96365E] bg-white text-[#96365E]"
                        : "border-[#E8D9DF] bg-white/60 text-stone-500 hover:border-[#C98DA6]"
                    }`}
                  >
                    <span className="block text-sm font-semibold">6 месяцев</span>
                    <span className="mt-1 block text-xs">$600 · лучшая цена</span>
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <div className="rounded-sm border border-[#E8D9DF] bg-white px-5 py-5 text-center">
                  <p className="text-4xl font-bold text-stone-900">{controlledPlan.usdPrice}</p>
                  <p className="mt-1 text-sm text-stone-500">
                    за {controlledMonths} {controlledMonths === 3 ? "месяца" : "месяцев"}
                  </p>
                  <p className="mt-2 text-base font-medium text-stone-700">
                    {controlledPlan.rublePrice}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[#96365E]">
                    {controlledMonths === 6
                      ? "$100 в месяц · всего на $120 больше, чем 3 месяца"
                      : "Полное сопровождение в течение трёх месяцев"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openCheckout(controlledPlan)}
                  className="mt-5 inline-flex w-full justify-center rounded-sm bg-[#96365E] px-5 py-3.5 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-[#7F2D50] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#96365E]"
                >
                  НАЧАТЬ СОПРОВОЖДЕНИЕ
                </button>
              </div>
            </article>
          </div>

          <div className="mt-10 rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#96365E] text-sm text-white">
                ★
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-stone-600">
                <span className="font-semibold text-stone-900">Бонус для новых клиентов:</span>{" "}
                первая онлайн-тренировка по видеосвязи в подарок при выборе любого тарифа.
              </p>
            </div>
          </div>

          <div className="mt-14 overflow-hidden rounded-sm border border-[#E8E2D9]">
            <div className="bg-[#FAF8F4] px-5 py-5 sm:px-6">
              <h3 className="text-xl font-bold text-stone-900">Сравнение форматов</h3>
              <p className="mt-1 text-sm text-stone-500">
                Главное отличие — частота обратной связи и уровень контроля.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-t border-[#E8E2D9] bg-white">
                    <th className="w-[46%] px-5 py-4 font-medium text-stone-500 sm:px-6">Что входит</th>
                    <th className="w-[27%] px-5 py-4 font-semibold text-stone-900">Персональный план</th>
                    <th className="w-[27%] bg-[#FCF7F9] px-5 py-4 font-semibold text-[#96365E]">Всё под контролем</th>
                  </tr>
                </thead>
                <tbody>
                  {FORMAT_COMPARISON.map((row) => (
                    <tr key={row.label} className="border-t border-[#E8E2D9]">
                      <th className="px-5 py-4 font-medium text-stone-600 sm:px-6">{row.label}</th>
                      <td className={`px-5 py-4 ${row.personal === "Не входит" ? "text-stone-400" : "text-stone-700"}`}>
                        {row.personal}
                      </td>
                      <td className="bg-[#FCF7F9] px-5 py-4 font-medium text-stone-700">{row.controlled}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-2xl min-w-0 px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-semibold text-[#1c1917] sm:mb-12 sm:text-3xl md:text-4xl">
            Частые вопросы
          </h2>

          <Accordion type="single" collapsible className="min-w-0">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.q}
                value={`faq-${index}`}
                className="!rounded-none !border-none !bg-transparent !shadow-none border-b border-[#E8E2D9]"
              >
                <AccordionTrigger className="!items-start !gap-3 !px-0 py-4 text-left text-[15px] font-medium leading-snug text-[#1c1917] hover:bg-transparent focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:!text-base [&_svg]:mt-1 [&_svg]:text-[#C4956A]">
                  <span className="min-w-0 flex-1 break-words pr-1">{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="!px-0 !text-sm">
                  <p className="!px-0 pb-4 pt-0 text-sm leading-relaxed text-[#6b5e54]">
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
          planId={selectedPlan.planId}
          paymentOptionId={selectedPlan.id}
          planName={selectedPlan.name}
          usdPrice={selectedPlan.usdPrice}
          rublePrice={selectedPlan.rublePrice}
          rublePaymentUrl={selectedPlan.rublePaymentUrl}
        />
      )}
    </LandingChrome>
  );
}
