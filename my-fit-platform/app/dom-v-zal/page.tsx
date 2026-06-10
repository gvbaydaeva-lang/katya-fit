import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";

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

function PhotoSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-stone-200 ${className}`}>
      <p className="text-stone-400 text-xs text-center px-3 leading-relaxed">📷 {label}</p>
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

const modules = [
  { n: "01", title: "Тренировки\n(дом + зал)", desc: "Пошаговые тренировки для любого уровня подготовки. Можно заниматься дома или в зале." },
  { n: "02", title: "Питание без подсчёта калорий", desc: "Простая и гибкая система питания, без жёстких ограничений." },
  { n: "03", title: "Пошаговый план на 12 недель", desc: "Понятные этапы, которые помогут вам двигаться вперёд без откатов." },
  { n: "04", title: "Видео-уроки и техника", desc: "Подробные видео и инструкции для правильного выполнения упражнений." },
  { n: "05", title: "Поддержка и мотивация", desc: "Вы не одна. Поддержка тренера и коммьюнити на протяжении всей программы." },
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
      <section className="bg-[#FAF8F4] overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <h1 className="text-5xl font-bold text-stone-900 leading-tight sm:text-6xl lg:text-7xl">
                Из дома<br />в зал
              </h1>
              <p className="mt-3 text-sm font-medium text-[#C4956A] tracking-wider">— 12 недель, которые изменят не только ваше тело, но и вас</p>
              <p className="mt-4 max-w-lg text-base text-stone-500 leading-relaxed">
                Пошаговая программа для женщин, которые хотят начать тренироваться, похудеть, подтянуть тело и обрести уверенность — без стресса, диет и крайностей.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/checkout/self" className="rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                  ХОЧУ В ПРОГРАММУ
                </Link>
                <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-xs">▶</span>
                  <span className="text-left">СМОТРЕТЬ ВИДЕО<br /><span className="text-xs font-normal">о программе (1 мин)</span></span>
                </button>
              </div>
            </div>
            {/* Stats card */}
            <div className="rounded-sm border border-[#E8E2D9] bg-white p-6 text-center min-w-[140px]">
              <p className="text-5xl font-bold text-stone-900">12</p>
              <p className="text-xs font-medium text-[#C4956A] tracking-wider mt-1">НЕДЕЛЬ</p>
              <p className="text-xs text-stone-400 mt-1 leading-snug">пошаговая<br />трансформация</p>
              <div className="border-t border-[#E8E2D9] mt-4 pt-4">
                <p className="text-xs text-stone-500 leading-snug">Дома и в зале<br /><span className="font-medium text-stone-700">Вы выбираете<br />свой формат</span></p>
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
              <div key={m.n} className="rounded-sm bg-white border border-[#E8E2D9] overflow-hidden">
                <div className="aspect-square bg-stone-200 relative flex items-center justify-center">
                  <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#C4956A] text-white text-xs font-bold">
                    {m.n}
                  </div>
                  <p className="text-stone-300 text-2xl">📷</p>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-stone-900 whitespace-pre-line">{m.title}</p>
                  <p className="mt-2 text-xs text-stone-500 leading-relaxed">{m.desc}</p>
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
