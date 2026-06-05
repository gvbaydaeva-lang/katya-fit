import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { MyStorySection } from "@/components/landing/MyStorySection";
import { SectionShell } from "@/components/landing/SectionShell";

export const metadata = {
  title: "Онлайн сопровождение — Катя Fit",
  description:
    "Персональная программа, разбор техники и еженедельный контроль с тренером.",
};

const soloBlockers = [
  "Нет внешней ответственности — легко пропустить тренировку",
  "Сложно понять, правильно ли вы делаете упражнения",
  "Мотивация есть, но не хватает структуры на неделю вперёд",
];

const threeMonthChanges = [
  "Стабильный ритм тренировок без «рывков»",
  "Понимание питания без жёстких диет",
  "Уверенность в технике и в своём теле",
];

const workSteps = [
  "Диагностика целей и текущего уровня",
  "Персональный план тренировок и питания",
  "Еженедельная обратная связь",
  "Разбор техники по видео",
  "Корректировки под ваш график",
  "Поддержка в чате в течение дня",
];

const onlineStory = [
  {
    period: "Проблема",
    text: "Знала, что нужно делать, но без сопровождения регулярность постоянно срывалась.",
  },
  {
    period: "Решение",
    text: "Выстроила формат, где тренер рядом: план, контроль и спокойная коррекция без давления.",
  },
  {
    period: "Сегодня",
    text: "Так же работаю с ученицами — не через запреты, а через систему и поддержку.",
  },
];

export default function OnlinePage() {
  return (
    <LandingChrome>
      {/* Экран 1 */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50"
      >
        <div className="mx-auto max-w-5xl px-4 py-20 lg:py-28">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-600">
            Онлайн-сопровождение
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
            Вы знаете, что нужно делать. Но вам сложно делать это регулярно
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600">
            Персональная программа, разбор техники и еженедельный контроль —
            чтобы движение к цели стало привычкой, а не подвигом.
          </p>
          <Link
            href="#pricing"
            className="mt-8 inline-flex rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
          >
            Выбрать тариф
          </Link>
        </div>
      </section>

      {/* Экран 2 */}
      <SectionShell
        id="blockers"
        title="Почему не получается самостоятельно"
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {soloBlockers.map((text) => (
            <li
              key={text}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700"
            >
              {text}
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* Экран 3 */}
      <SectionShell
        id="three-months"
        title="Что изменится через 3 месяца"
      >
        <ul className="space-y-4">
          {threeMonthChanges.map((text) => (
            <li
              key={text}
              className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-zinc-700"
            >
              <span className="text-rose-600">✓</span>
              {text}
            </li>
          ))}
        </ul>
      </SectionShell>

      <MyStorySection
        description="Интеграция блока «Моя история» — почему сопровождение изменило мой подход к телу."
        timeline={onlineStory}
      />

      {/* Экран 4 */}
      <SectionShell
        id="how-it-works"
        title="Как проходит работа"
        description="6 шагов сопровождения от старта до устойчивого результата."
      >
        <ol className="space-y-4">
          {workSteps.map((text, index) => (
            <li
              key={text}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-zinc-700"
            >
              <span className="font-medium text-zinc-900">Шаг {index + 1}.</span>{" "}
              {text}
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* Экран 5 */}
      <SectionShell
        id="pricing"
        title="Тарифы"
        className="bg-zinc-50/80"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900">База</h3>
            <p className="mt-4 text-3xl font-semibold text-zinc-900">$99</p>
            <p className="mt-2 text-sm text-zinc-600">
              Программа и материалы — вы идёте в своём темпе.
            </p>
            <Link
              href="/checkout/self"
              className="mt-6 inline-flex w-full justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
            >
              Выбрать База
            </Link>
          </article>
          <article className="rounded-2xl border border-rose-300 bg-white p-6 shadow-lg shadow-rose-100">
            <span className="rounded-full bg-rose-600 px-3 py-0.5 text-xs font-medium text-white">
              Популярный
            </span>
            <h3 className="mt-3 text-lg font-semibold text-zinc-900">Вместе</h3>
            <p className="mt-4 text-3xl font-semibold text-zinc-900">по запросу</p>
            <p className="mt-2 text-sm text-zinc-600">
              Полное сопровождение с еженедельной обратной связью.
            </p>
            <Link
              href="/checkout/coached"
              className="mt-6 inline-flex w-full justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
            >
              Выбрать Вместе
            </Link>
          </article>
        </div>
      </SectionShell>
    </LandingChrome>
  );
}
