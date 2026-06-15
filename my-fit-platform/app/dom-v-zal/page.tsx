import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LandingChrome } from "@/components/landing/LandingChrome";
import katyaHero from "@/public/images/katya-hero.webp";

const ACCENT = "#C4956A";

function IconWorkouts() {
  return (
    <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="13" y="27" width="46" height="13" rx="6.5" />
      <rect x="7" y="33" width="8" height="8" rx="4" />
      <rect x="57" y="33" width="8" height="8" rx="4" />
      <path d="M25 27V19M47 27V19" />
      <path d="M23 19h26" />
      <path d="M27 40v12M45 40v12" />
      <path d="M23 52h8M41 52h8" />
    </svg>
  );
}

function IconNutrition() {
  return (
    <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M36 14c-9 0-18 6-18 16 0 6 3 11 9 14v4h18v-4c6-3 9-8 9-14 0-10-9-16-18-16z" />
      <path d="M27 38c0 0 3 5 9 5s9-5 9-5" />
      <circle cx="28" cy="31" r="2" fill={ACCENT} stroke="none" />
      <circle cx="44" cy="31" r="2" fill={ACCENT} stroke="none" />
      <path d="M27 48h18M29 52h14" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="13" y="14" width="46" height="46" rx="3" />
      <path d="M13 27h46" />
      <path d="M25 14v13M47 14v13" />
      <rect x="22" y="35" width="8" height="8" rx="1" />
      <rect x="32" y="35" width="8" height="8" rx="1" />
      <rect x="42" y="35" width="8" height="8" rx="1" />
      <rect x="22" y="45" width="8" height="8" rx="1" />
      <rect x="32" y="45" width="8" height="8" rx="1" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="17" width="54" height="36" rx="4" />
      <path d="M9 45h54" />
      <path d="M27 53h18M36 49v4" />
      <path d="M29 30l15-7v14z" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg width="64" height="64" viewBox="0 0 72 72" fill="none" stroke={ACCENT} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M35 22c-8 0-15 6-15 13 0 5 3 9 7 11l-3 9 11-5.5" />
      <path d="M37 22c8 0 15 6 15 13 0 8-8 15-19 15-2 0-4-.3-6-.8" />
      <circle cx="29" cy="35" r="2.2" fill={ACCENT} stroke="none" />
      <circle cx="36" cy="35" r="2.2" fill={ACCENT} stroke="none" />
      <circle cx="43" cy="35" r="2.2" fill={ACCENT} stroke="none" />
    </svg>
  );
}

export const metadata = {
  title: "Из дома в зал — KATY D.",
  description: "12-недельная пошаговая система для женщин, которые хотят начать тренироваться, похудеть, подтянуть тело и обрести уверенность.",
};

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

const modules: { n: string; title: string; desc: string; icon: ReactNode }[] = [
  { n: "01", title: "Тренировки\n(дом + зал)", desc: "Пошаговые тренировки для любого уровня подготовки. Можно заниматься дома или в зале.", icon: <IconWorkouts /> },
  { n: "02", title: "Питание без подсчёта калорий", desc: "Простая и гибкая система питания, без жёстких ограничений.", icon: <IconNutrition /> },
  { n: "03", title: "Пошаговый план на 12 недель", desc: "Понятные этапы, которые помогут вам двигаться вперёд без откатов.", icon: <IconCalendar /> },
  { n: "04", title: "Видео-уроки и техника", desc: "Подробные видео и инструкции для правильного выполнения упражнений.", icon: <IconVideo /> },
  { n: "05", title: "Поддержка и мотивация", desc: "Вы не одна. Поддержка тренера и коммьюнити на протяжении всей программы.", icon: <IconSupport /> },
];

const whyWorks = [
  { icon: "🧘", text: "Система без стресса и крайностей" },
  { icon: "⏱", text: "Гибкость под ваш график и образ жизни" },
  { icon: "⚖️", text: "Баланс тренировок и питания" },
  { icon: "🤝", text: "Поддержка и ответственность" },
  { icon: "📈", text: "Реальные результаты и прогресс" },
];

export default function DomVZalPage() {
  return (
    <LandingChrome>

      {/* ─── HERO ─── */}
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
                <Link href="/checkout/self" className="rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                  ХОЧУ В ПРОГРАММУ
                </Link>
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
                <Link href="/checkout/self" className="rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                  ХОЧУ В ПРОГРАММУ
                </Link>
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

      {/* ─── ДЛЯ КОГО + РЕЗУЛЬТАТ ─── */}
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

      {/* ─── ЧТО ВХОДИТ ─── */}
      <section className="bg-[#FAF8F4] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 text-center sm:text-4xl">Что входит в программу</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {modules.map((m) => (
              <div key={m.n} className="rounded-sm border border-[#E8E2D9] bg-white">
                <div className="flex flex-col p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C4956A] text-xs font-bold text-white">
                    {m.n}
                  </div>
                  <div className="mt-4 flex justify-center">{m.icon}</div>
                  <p className="mt-4 text-sm font-semibold text-stone-900 whitespace-pre-line">{m.title}</p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6b5e52]">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ПОЧЕМУ РАБОТАЕТ ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Почему эта программа работает?</h2>
              <div className="mt-8 flex flex-wrap gap-3">
                {whyWorks.map((w) => (
                  <div key={w.text} className="flex items-center gap-3 rounded-full border border-[#E8E2D9] bg-[#FAF8F4] px-4 py-2">
                    <span className="text-lg">{w.icon}</span>
                    <span className="text-xs text-stone-600">{w.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <PhotoSlot label="Фото для секции" className="aspect-[4/3] rounded-sm" />
          </div>
        </div>
      </section>

      {/* ─── ТЁМНЫЙ CTA ─── */}
      <section className="bg-[#3D3530] py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
            Вы готовы начать путь<br />к сильной, здоровой<br />и уверенной себе?
          </h2>
          <p className="mt-4 text-stone-400">Тогда пора действовать.</p>
          <Link href="/checkout/self" className="mt-8 inline-flex rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
            ХОЧУ В ПРОГРАММУ
          </Link>
        </div>
      </section>

      {/* ─── ЦЕНА ─── */}
      <section className="bg-[#FAF8F4] py-16">
        <div className="mx-auto max-w-sm px-6 text-center">
          <p className="text-5xl font-bold text-stone-900">$79</p>
          <p className="mt-2 text-sm text-stone-400">полный доступ · навсегда</p>
          <Link href="/checkout/self" className="mt-6 inline-flex w-full justify-center rounded-sm bg-[#C4956A] px-5 py-3 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
            ПОЛУЧИТЬ ДОСТУП
          </Link>
        </div>
      </section>

    </LandingChrome>
  );
}
