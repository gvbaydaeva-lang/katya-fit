"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useState } from "react";
import { MobileCardCarousel } from "@/components/landing/MobileCardCarousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import programTrainingImage from "@/public/images/program-training-dom-zal.webp";

type IllustrationKind = "notebook" | "photo";

type ProgramCard = {
  number: string;
  title: string;
  description: string;
  fullDescription: string;
  details: readonly string[];
  illustration: IllustrationKind;
  imageSrc?: string;
  localImage?: StaticImageData;
  imageAlt?: string;
  imageClassName?: string;
  mediaClassName?: string;
};

const programCards: readonly ProgramCard[] = [
  {
    number: "01",
    title: "Тренировки (дом + зал)",
    description:
      "4 недели дома для техники и 8 недель в зале для уверенного прогресса.",
    fullDescription:
      "Сначала вы тренируетесь дома: привыкаете к режиму, учитесь чувствовать тело и спокойно осваиваете базовые движения без давления. После этого переходите в зал уже не с ощущением «я ничего не понимаю», а с понятной логикой тренировок, техникой и готовым планом.",
    details: [
      "Первые 4 недели — домашние тренировки для любого уровня подготовки",
      "Следующие 8 недель — тренировки в зале с постепенным ростом нагрузки",
      "Переход построен так, чтобы не было страха перед тренажёрами и весами",
    ],
    illustration: "photo",
    localImage: programTrainingImage,
    imageAlt: "Тренировки дома и в зале",
    imageClassName: "object-contain object-center",
  },
  {
    number: "02",
    title: "Питание без подсчёта калорий",
    description:
      "Простая и гибкая система питания, без жёстких ограничений.",
    fullDescription:
      "В программе есть понятные принципы питания, которые помогают худеть и подтягивать тело без жёстких запретов. Вы учитесь собирать рацион из обычных продуктов, не жить в калькуляторе калорий и не срываться из-за ощущения, что «ничего нельзя».",
    details: [
      "Рацион без крайностей, голодовок и сложных схем",
      "Фокус на сытость, белок, регулярность и простые привычки",
      "Подходит для обычной жизни, семьи, работы и поездок",
    ],
    illustration: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=450&fit=crop",
    imageAlt: "Здоровая еда",
  },
  {
    number: "03",
    title: "Пошаговый план на 12 недель",
    description:
      "Чёткая структура: база дома, адаптация к залу, рост нагрузки.",
    fullDescription:
      "Это не набор случайных тренировок, а маршрут с понятной последовательностью. Сначала вы готовите тело дома, затем переносите знакомые движения в зал, учитесь работать с гантелями и тренажёрами и постепенно увеличиваете нагрузку без хаоса и перегруза.",
    details: [
      "Недели 1–4: техника, ритм, базовая сила и уверенность дома",
      "Недели 5–8: знакомство с залом и безопасная работа с весами",
      "Недели 9–12: закрепление навыка и прогрессия нагрузки",
    ],
    illustration: "notebook",
    mediaClassName: "bg-[#F0EDE8]",
  },
  {
    number: "04",
    title: "Видео-уроки и техника",
    description:
      "Подробные видео и инструкции для правильного выполнения упражнений.",
    fullDescription:
      "Вы не остаётесь один на один с непонятными названиями упражнений. Видеоуроки показывают, как выполнять движения, на что обращать внимание, где часто ошибаются новички и как адаптировать упражнение под свой уровень.",
    details: [
      "Разбор техники базовых движений понятным языком",
      "Подсказки по положению корпуса, амплитуде и дыханию",
      "Варианты упражнений для дома и для тренажёрного зала",
    ],
    illustration: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=450&fit=crop",
    imageAlt: "Телефон с видеоуроком",
  },
  {
    number: "05",
    title: "Поддержка и мотивация",
    description:
      "Вы не одна. Поддержка тренера и комьюнити на протяжении всей программы.",
    fullDescription:
      "Самое сложное в начале — не идеальная техника, а не бросить после первой неуверенности. Поэтому программа помогает держать темп: вы понимаете, что делать дальше, видите свой прогресс и не теряетесь, когда приходит время перейти из дома в зал.",
    details: [
      "Понятные ориентиры на каждом этапе программы",
      "Мотивация продолжать, даже если раньше вы уже начинали и бросали",
      "Ощущение, что у вас есть система, а не случайные тренировки",
    ],
    illustration: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=450&fit=crop",
    imageAlt: "Чашка кофе и дневник",
  },
];

function NotebookIllustration() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden
    >
      <rect
        x="20"
        y="10"
        width="80"
        height="70"
        rx="4"
        fill="#E8E2D9"
        stroke="#C4956A"
        strokeWidth="2"
      />
      <rect x="20" y="10" width="80" height="16" rx="4" fill="#C4956A" />
      <line
        x1="35"
        y1="38"
        x2="85"
        y2="38"
        stroke="#3D3530"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="50"
        x2="85"
        y2="50"
        stroke="#3D3530"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="62"
        x2="75"
        y2="62"
        stroke="#3D3530"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polyline
        points="35,38 39,42 47,34"
        stroke="#C4956A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="35,50 39,54 47,46"
        stroke="#C4956A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardMedia({
  card,
  compact = false,
}: {
  card: ProgramCard;
  compact?: boolean;
}) {
  const mediaClass = card.mediaClassName ?? "bg-[#E8E2D9]";
  const imageClass = card.imageClassName ?? "object-cover";

  return (
    <div
      className={`relative overflow-hidden ${
        compact
          ? "h-[clamp(8rem,24vh,13rem)] md:h-[clamp(8rem,24vh,14rem)]"
          : "aspect-[4/3]"
      } ${mediaClass}`}
    >
      {card.illustration === "notebook" && (
        <div className="flex h-full w-full items-center justify-center p-6">
          <NotebookIllustration />
        </div>
      )}
      {card.illustration === "photo" && card.localImage && (
        <Image
          src={card.localImage}
          alt={card.imageAlt ?? ""}
          fill
          className={imageClass}
          sizes="(max-width: 1024px) 50vw, 20vw"
        />
      )}
      {card.illustration === "photo" && card.imageSrc && !card.localImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.imageSrc}
            alt={card.imageAlt ?? ""}
            className={`h-full w-full ${imageClass}`}
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3D3530]/15 via-transparent to-[#FAF8F4]/10"
            aria-hidden
          />
        </>
      )}
      <span className="absolute left-3 top-3 z-10 rounded-sm bg-white/75 px-1.5 py-0.5 text-xs font-medium tracking-wider text-[#C4956A] backdrop-blur-[2px]">
        {card.number}
      </span>
    </div>
  );
}

function ProgramFeatureCard({
  card,
  className = "",
  onOpen,
}: {
  card: ProgramCard;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`block overflow-hidden rounded-sm border border-[#E8E2D9] bg-white text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C4956A]/35 ${className}`}
      aria-label={`Открыть полное описание модуля: ${card.title}`}
    >
      <CardMedia card={card} />
      <div className="p-4">
        <h3 className="text-base font-bold leading-snug text-[#1c1917]">{card.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#78716c]">
          {card.description}
        </p>
        <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-wider text-[#C4956A]">
          Подробнее
        </span>
      </div>
    </button>
  );
}

export function CourseTimelineSection() {
  const [selectedCard, setSelectedCard] = useState<ProgramCard | null>(null);

  return (
    <section className="overflow-hidden bg-[#FAF8F4] px-4 py-12 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#C4956A]">
          Программа курса
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#1c1917]">Что входит в программу</h2>
        <p className="mt-3 max-w-2xl text-base text-[#78716c]">
          5 модулей — от первых спокойных тренировок дома до уверенной работы с весами в зале
        </p>

        <div className="mt-10 md:hidden">
          <MobileCardCarousel
            items={programCards}
            getKey={(card) => card.number}
            ariaLabel="Что входит в программу"
            className="-mx-4"
            trackClassName="px-4"
            itemClassName="w-[72vw] max-w-[280px]"
            renderItem={(card) => (
              <ProgramFeatureCard
                card={card}
                className="h-full"
                onOpen={() => setSelectedCard(card)}
              />
            )}
          />
        </div>

        <ul className="mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-5">
          {programCards.map((card, index) => (
            <li
              key={card.number}
              className={index === programCards.length - 1 ? "col-span-2 lg:col-span-1" : ""}
            >
              <ProgramFeatureCard card={card} className="h-full" onOpen={() => setSelectedCard(card)} />
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={selectedCard !== null} onOpenChange={(open) => !open && setSelectedCard(null)}>
        {selectedCard && (
          <DialogContent className="max-h-[94dvh] max-w-2xl gap-0 overflow-y-auto overscroll-contain rounded-sm bg-white p-0">
            <div>
              <div className="p-6 pb-5">
                <DialogHeader>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C4956A]">
                    Модуль {selectedCard.number}
                  </p>
                  <DialogTitle className="text-2xl font-bold text-[#1c1917]">
                    {selectedCard.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
              <CardMedia card={selectedCard} compact />
              <div className="px-6 pb-16 pt-5">
                <DialogDescription className="text-base leading-relaxed text-[#57534e]">
                  {selectedCard.fullDescription}
                </DialogDescription>
                <ul className="mt-5 space-y-3">
                  {selectedCard.details.map((detail) => (
                    <li key={detail} className="flex gap-3 text-sm leading-relaxed text-[#57534e]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C4956A]" aria-hidden />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
