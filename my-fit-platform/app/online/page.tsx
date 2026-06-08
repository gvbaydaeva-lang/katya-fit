import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { SectionShell } from "@/components/landing/SectionShell";

export const metadata = {
  title: "Онлайн сопровождение — KATY D.",
  description:
    "Персональная работа: план питания, программа тренировок и регулярные корректировки.",
};

const plan1Features = [
  "Подробная анкета",
  "Расчет КБЖУ",
  "Персональный план питания",
  "Программа тренировок",
  "Видео техники упражнений",
  "1 онлайн-тренировка по видеосвязи",
  "Ежемесячная корректировка плана",
];

const plan1AfterReport = [
  "Анализ результатов",
  "Корректировка КБЖУ",
  "Корректировка активности",
  "Новый план на следующий месяц",
];

const plan1Bonuses = [
  "Меню на 1400 и 1600 ккал",
  "План удержания результата после завершения программы",
];

const plan2Features = [
  "Всё из тарифа «Персональный старт»",
  "Еженедельные отчеты",
  "Поддержка",
  "Ответы на вопросы",
  "Контроль питания",
  "Контроль тренировок",
  "Корректировки по мере необходимости",
];

const reportItems = [
  "вес",
  "замеры",
  "фото",
  "шаги",
  "комментарии",
  "вопросы",
];

const faqItems = [
  {
    q: "Что делать, если у меня был неудачный опыт похудения раньше?",
    a: "Мы строим систему, которую можно соблюдать долго, а не очередную краткосрочную диету.",
  },
  {
    q: "Нужно ли покупать спортивное питание?",
    a: "Нет.",
  },
  {
    q: "Нужно ли полностью отказаться от любимых продуктов?",
    a: "Нет.",
  },
  {
    q: "Можно ли совмещать программу с семейным питанием?",
    a: "Да.",
  },
  {
    q: "Что будет после завершения программы?",
    a: "Вы получите понимание, как поддерживать результат самостоятельно.",
  },
  {
    q: "Что если я пропущу тренировку или собьюсь с плана?",
    a: "Это нормально. Главное — вернуться к системе и продолжать движение дальше.",
  },
  {
    q: "Через сколько я увижу первые изменения?",
    a: "Первые изменения обычно заметны уже через несколько недель регулярной работы.",
  },
];

export default function OnlinePage() {
  return (
    <LandingChrome>
      <section id="hero" className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-5xl px-4 py-20 lg:py-28">
          <h1 className="text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
            Вы знаете, что нужно делать.{" "}
            <span className="block">Но сложно делать это регулярно.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-stone-600">
            Именно поэтому сопровождение работает лучше любой диеты.
          </p>
          <Link
            href="#pricing"
            className="mt-8 inline-flex rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
          >
            Заполнить анкету
          </Link>
        </div>
      </section>

      <SectionShell id="pricing" title="Тарифы">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-stone-200 bg-white p-6">
            <h3 className="text-xl font-semibold text-stone-900">Персональный старт</h3>
            <p className="mt-1 text-sm font-medium text-stone-500">12 недель персональной работы</p>
            <p className="mt-3 text-sm text-stone-600">
              Подходит тем, кто готов работать самостоятельно, но хочет
              профессиональный план и регулярные корректировки.
            </p>
            <p className="mt-5 text-sm font-medium text-stone-700">Что входит:</p>
            <ul className="mt-2 space-y-1.5">
              {plan1Features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-stone-600">
                  <span className="text-stone-800">✔</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-700">Каждый месяц клиент загружает отчет:</p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {reportItems.map((r) => (
                  <li key={r} className="text-xs text-stone-500">· {r}</li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm font-medium text-stone-700">После каждого отчета:</p>
            <ul className="mt-2 space-y-1.5">
              {plan1AfterReport.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-stone-600">
                  <span className="text-stone-800">✔</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-700">🎁 Бонусы:</p>
              <ul className="mt-2 space-y-1.5">
                {plan1Bonuses.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-stone-600">
                    <span className="text-stone-800">✔</span> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-stone-900">$149</span>
              <span className="text-sm text-stone-500">/ 12 недель</span>
            </div>
            <Link
              href="/checkout/coached"
              className="mt-4 inline-flex w-full justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
            >
              Купить
            </Link>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-6">
            <h3 className="text-xl font-semibold text-stone-900">Вместе</h3>
            <p className="mt-1 text-sm font-medium text-stone-500">Полное онлайн сопровождение</p>
            <p className="mt-5 text-sm font-medium text-stone-700">Что входит:</p>
            <ul className="mt-2 space-y-1.5">
              {plan2Features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-stone-600">
                  <span className="text-stone-800">✔</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl bg-stone-50 p-6 text-center">
              <p className="text-sm text-stone-600">
                Формат полного сопровождения — индивидуальные условия.
              </p>
              <p className="mt-1 text-sm font-medium text-stone-700">
                Заполните анкету, чтобы обсудить детали.
              </p>
            </div>
            <Link
              href="#"
              className="mt-6 inline-flex w-full justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
            >
              Заполнить анкету
            </Link>
          </article>
        </div>
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
