import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { MyStorySection } from "@/components/landing/MyStorySection";
import { SectionShell } from "@/components/landing/SectionShell";

export const metadata = {
  title: "Из дома в зал — Катя Fit",
  description:
    "Программа перехода от домашних тренировок к уверенной работе в зале.",
};

const pains = [
  "Страх зала и ощущение, что все смотрят",
  "Незнание, какие тренажёры использовать и в каком порядке",
  "Страх сделать упражнение неправильно и получить травму",
];

const modules = [
  "Модуль 1: Домашняя база — техника и привычка",
  "Модуль 2: Мобильность и подготовка суставов",
  "Модуль 3: Первые шаги в зале",
  "Модуль 4: Программа на тренажёрах",
  "Модуль 5: Самостоятельные тренировки без страха",
];

const outcomes = [
  "Понимание, что делать в зале с первого дня",
  "Готовая программа на 8–12 недель",
  "Видео-разборы техники базовых упражнений",
  "Чек-листы для спокойного старта",
];

const audience = [
  "Новички, которые хотят перейти из дома в зал",
  "Те, кто давно откладывает поход в фитнес-клуб",
  "Девушки, которым нужна структура, а не хаос в тренировках",
];

const gymStory = [
  {
    period: "Начало",
    text: "Сначала тренировалась только дома — коврик, гантели, страх перед залом.",
  },
  {
    period: "Переход",
    text: "Выстроила пошаговый маршрут: от простых движений к тренажёрам без паники.",
  },
  {
    period: "Результат",
    text: "Теперь зал — рабочий инструмент, а не место, где «все смотрят».",
  },
];

const faqItems = [
  {
    q: "Нужен ли абонемент в зал сразу?",
    a: "Нет. Первые недели можно проходить дома, зал подключается по плану программы.",
  },
  {
    q: "Подойдёт ли без опыта?",
    a: "Да, программа рассчитана на новичков.",
  },
];

export default function DomVZalPage() {
  return (
    <LandingChrome>
      {/* Экран 1 */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50"
      >
        <div className="mx-auto max-w-5xl px-4 py-20 lg:py-28">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-600">
            Программа 8–12 недель
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
            Из дома в зал
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600">
            Пошаговый переход от домашних тренировок к уверенной работе в зале —
            без стресса и страха тренажёров.
          </p>
          <Link
            href="#pricing"
            className="mt-8 inline-flex rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
          >
            Начать программу
          </Link>
        </div>
      </section>

      {/* Экран 2 */}
      <SectionShell
        id="pains"
        title="Знакомые мысли перед залом"
        description="Программа закрывает типичные страхи новичков."
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {pains.map((text) => (
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
      <MyStorySection
        description="Личный опыт перехода из дома в зал — без идеальной картинки из Instagram."
        timeline={gymStory}
      />

      {/* Экран 4 */}
      <SectionShell
        id="program"
        title="Что внутри программы"
        description="5 модулей — от домашней базы до самостоятельных тренировок в зале."
      >
        <ol className="space-y-4">
          {modules.map((text, index) => (
            <li
              key={text}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-zinc-700"
            >
              <span className="font-medium text-zinc-900">{index + 1}.</span>{" "}
              {text}
            </li>
          ))}
        </ol>
      </SectionShell>

      {/* Экран 5 */}
      <SectionShell id="outcomes" title="Что получите">
        <ul className="grid gap-4 sm:grid-cols-2">
          {outcomes.map((text) => (
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

      {/* Экран 6 */}
      <SectionShell id="audience" title="Для кого подходит">
        <ul className="space-y-4">
          {audience.map((text) => (
            <li
              key={text}
              className="rounded-xl border border-zinc-200 bg-white p-4 text-zinc-700"
            >
              {text}
            </li>
          ))}
        </ul>
      </SectionShell>

      {/* Экран 7 */}
      <SectionShell
        id="pricing"
        title="Стоимость"
        className="bg-zinc-50/80"
      >
        <article className="mx-auto max-w-md rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-lg shadow-rose-100">
          <p className="text-4xl font-semibold text-zinc-900">$49</p>
          <p className="mt-2 text-sm text-zinc-600">полный доступ к программе</p>
          <Link
            href="/checkout/self"
            className="mt-6 inline-flex w-full justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
          >
            Купить программу
          </Link>
        </article>
      </SectionShell>

      {/* Экран 8 */}
      <SectionShell id="faq" title="FAQ">
        <dl className="space-y-6">
          {faqItems.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <dt className="font-medium text-zinc-900">{item.q}</dt>
              <dd className="mt-2 text-sm text-zinc-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </SectionShell>
    </LandingChrome>
  );
}
