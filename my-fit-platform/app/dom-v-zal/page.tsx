import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { SectionShell } from "@/components/landing/SectionShell";
import { LANDING_ROUTES } from "@/lib/landing/routes";
import { landingNewTabProps } from "@/lib/landing/link-props";

export const metadata = {
  title: "Из дома в зал — KATY D.",
  description:
    "12-недельная пошаговая система для женщин, которые хотят перестать бояться тренажерного зала и начать тренироваться уверенно.",
};

const audience = [
  "Никогда не занимались в зале",
  "Боитесь тренажеров",
  "Не знаете, с чего начать",
  "Тренируетесь дома и хотите перейти в зал",
  "Откладываете старт месяцами",
  "Хотите уверенно чувствовать себя в тренажерном зале",
];

const modules = [
  {
    title: "Модуль 1. Подготовка к залу",
    items: [
      "как начать",
      "как отслеживать прогресс",
      "как выбрать нагрузку",
      "как перестать бояться зала",
    ],
  },
  {
    title: "Модуль 2. 4 недели домашних тренировок",
    items: [
      "3 тренировки в неделю",
      "видео техники",
      "постепенное увеличение нагрузки",
    ],
  },
  {
    title: "Модуль 3. Переход в зал",
    items: [
      "знакомство с тренажерами",
      "выбор рабочего веса",
      "адаптация в зале",
    ],
  },
  {
    title: "Модуль 4. 8 недель тренировок в зале",
    items: [
      "готовая программа",
      "видео техники",
      "прогрессия нагрузок",
    ],
  },
  {
    title: "Модуль 5. Питание без диет",
    items: [
      "система тарелки",
      "белок",
      "клетчатка",
      "питание без запретов",
    ],
  },
];

const whatYouGet = [
  "Личный кабинет",
  "Видеоуроки",
  "Видео техники",
  "Тренировки дома",
  "Тренировки в зале",
  "Материалы по питанию",
  "Доступ навсегда",
];

const faqItems = [
  {
    q: "Подойдет ли программа новичку?",
    a: "Да. Она создана именно для новичков.",
  },
  {
    q: "Нужен ли опыт тренировок?",
    a: "Нет.",
  },
  {
    q: "Нужен ли инвентарь дома?",
    a: "Желательно иметь резинки и коврик.",
  },
  {
    q: "Что если я ни разу не была в зале?",
    a: "Программа как раз создана для такого старта.",
  },
  {
    q: "Будет ли питание?",
    a: "Да. Есть отдельный модуль по питанию и бонусное меню.",
  },
  {
    q: "Будет ли обратная связь?",
    a: "Нет. Это самостоятельный продукт.",
  },
  {
    q: "Как я получу доступ?",
    a: "Сразу после оплаты.",
  },
  {
    q: "На сколько сохраняется доступ?",
    a: "Навсегда.",
  },
];

export default function DomVZalPage() {
  return (
    <LandingChrome>
      <section id="hero" className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 lg:py-28">
          <h1 className="text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Из дома в зал
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-600">
            12-недельная пошаговая система для женщин, которые хотят перестать
            бояться тренажерного зала и начать тренироваться уверенно.
          </p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-stone-900">$79</span>
          </div>
          <Link
            href="/checkout/self"
            className="mt-6 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
          >
            Получить доступ
          </Link>
        </div>
      </section>

      <SectionShell id="audience" title="Для кого программа">
        <ul className="grid gap-3 sm:grid-cols-2">
          {audience.map((text) => (
            <li key={text} className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700">
              <span className="text-stone-800 font-medium">✔</span>
              {text}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="my-story" title="Моя история" className="bg-stone-50/60">
        <div className="max-w-2xl space-y-4 text-stone-600">
          <p>Когда я только начинала возвращаться к себе после родов и переезда в США, у меня не было идеальных условий.</p>
          <p>Я начинала с коротких домашних тренировок по 20–30 минут.</p>
          <p>Потом появились резинки.</p>
          <p>Потом первый поход в тренажерный зал.</p>
          <p>И я очень хорошо помню чувство растерянности: что делать, куда идти и как пользоваться всеми этими тренажерами.</p>
          <p>Именно поэтому появилась программа «Из дома в зал». Чтобы вы не гадали, с чего начать, а получили понятный пошаговый путь от домашних тренировок до уверенности в тренажерном зале.</p>
        </div>
      </SectionShell>

      <SectionShell id="program" title="Что внутри программы">
        <div className="space-y-4">
          {modules.map((mod) => (
            <div key={mod.title} className="rounded-2xl border border-stone-200 bg-white p-6">
              <h3 className="font-semibold text-stone-900">{mod.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {mod.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-stone-400">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="outcomes" title="Что вы получите" className="bg-stone-50/60">
        <ul className="grid gap-3 sm:grid-cols-2">
          {whatYouGet.map((text) => (
            <li key={text} className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700">
              <span className="text-stone-800 font-medium">✔</span>
              {text}
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6">
          <p className="font-medium text-stone-900">🎁 Бонус: Меню на 3 дня без подсчета калорий</p>
          <ul className="mt-3 space-y-1.5 text-sm text-stone-600">
            <li className="flex gap-2"><span className="text-stone-400">·</span> Готовое меню на 3 дня</li>
            <li className="flex gap-2"><span className="text-stone-400">·</span> Список покупок</li>
            <li className="flex gap-2"><span className="text-stone-400">·</span> Правило тарелки</li>
            <li className="flex gap-2"><span className="text-stone-400">·</span> Варианты замены продуктов</li>
          </ul>
        </div>
      </SectionShell>

      <SectionShell id="pricing" title="Стоимость">
        <article className="mx-auto max-w-sm rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <p className="text-4xl font-semibold text-stone-900">$79</p>
          <p className="mt-2 text-sm text-stone-500">полный доступ · навсегда</p>
          <Link
            href="/checkout/self"
            className="mt-6 inline-flex w-full justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
          >
            Получить доступ
          </Link>
        </article>
      </SectionShell>

      <SectionShell id="faq" title="FAQ" className="bg-stone-50/60">
        <dl className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.q} className="rounded-2xl border border-stone-200 bg-white p-6">
              <dt className="font-medium text-stone-900">{item.q}</dt>
              <dd className="mt-2 text-sm text-stone-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </SectionShell>
    </LandingChrome>
  );
}
