import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { MyStorySection } from "@/components/landing/MyStorySection";
import { ResultsSection } from "@/components/landing/ResultsSection";
import { SectionShell } from "@/components/landing/SectionShell";
import { landingNewTabProps } from "@/lib/landing/link-props";
import { LANDING_ROUTES } from "@/lib/landing/routes";

const painCards = [
  "Снова начинаете диету в понедельник — и срываетесь к выходным",
  "Тренируетесь рывками, когда есть мотивация, а не система",
  "Боитесь зала или не знаете, с чего начать дома",
  "Устали от советов, которые не вписываются в вашу реальную жизнь",
];

const approachPoints = [
  "Без жёстких запретов — только понятные правила питания",
  "Тренировки под ваш график: дом, зал или гибрид",
  "Поддержка и корректировки, когда жизнь меняет планы",
];

const faqItems = [
  {
    q: "Подойдёт ли мне, если я давно не тренировалась?",
    a: "Да. Программы начинаются с вашего текущего уровня и постепенно усложняются.",
  },
  {
    q: "Нужно ли считать калории?",
    a: "Нет обязательного подсчёта. Фокус — на привычках и понятной структуре питания.",
  },
  {
    q: "Сколько времени занимает в неделю?",
    a: "От 3 тренировок по 30–45 минут. Формат подстраивается под ваш ритм.",
  },
];

const homeStory = [
  {
    period: "До системы",
    text: "Пробовала диеты и марафоны похудения — результат был, но без устойчивой привычки всё возвращалось.",
  },
  {
    period: "Поворотный момент",
    text: "Собрала питание и тренировки в одну простую систему, которая работает даже в загруженные недели.",
  },
  {
    period: "Сейчас",
    text: "Помогаю женщинам похудеть без крайностей и вернуть уверенность в теле и в себе.",
  },
];

export default function HomePage() {
  return (
    <LandingChrome>
      {/* Экран 1 */}
      <section
        id="hero"
        className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50"
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900 sm:text-5xl">
              Устали начинать похудение заново?
            </h1>
            <p className="mt-6 text-lg text-zinc-600">
              Система питания и тренировок Кэтти Д., которая работает в реальной
              жизни — без диет и жёстких запретов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={LANDING_ROUTES.online}
                {...landingNewTabProps(LANDING_ROUTES.online)}
                className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-rose-600/20 transition-colors hover:bg-rose-700"
              >
                Онлайн сопровождение
              </Link>
              <Link
                href={LANDING_ROUTES.domVZal}
                {...landingNewTabProps(LANDING_ROUTES.domVZal)}
                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
              >
                Из дома в зал
              </Link>
            </div>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-tr from-rose-200 to-orange-100 shadow-xl">
            <div className="flex h-full items-end p-8">
              <p className="rounded-2xl bg-white/90 p-4 text-sm text-zinc-600 backdrop-blur">
                Фото Кэтти Д.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Экран 2 */}
      <SectionShell
        id="pains"
        title="Возможно, вы узнаете себя"
        description="Если хотя бы один пункт откликается — вы не одна."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {painCards.map((text) => (
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
      <MyStorySection timeline={homeStory} />

      {/* Экран 4 */}
      <SectionShell
        id="choose-path"
        title="Выберите свой путь"
        description="Два формата — одна цель: устойчивый результат без откатов."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900">Из дома в зал</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Программа перехода от домашних тренировок к уверенной работе в зале.
            </p>
            <Link
              href={LANDING_ROUTES.domVZal}
              {...landingNewTabProps(LANDING_ROUTES.domVZal)}
              className="mt-6 inline-flex rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
            >
              Из дома в зал
            </Link>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900">
              Онлайн сопровождение
            </h3>
            <p className="mt-2 text-sm text-zinc-600">
              Личная поддержка, разбор техники и регулярность без самообмана.
            </p>
            <Link
              href={LANDING_ROUTES.online}
              {...landingNewTabProps(LANDING_ROUTES.online)}
              className="mt-6 inline-flex rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
            >
              Онлайн сопровождение
            </Link>
          </article>
        </div>
      </SectionShell>

      {/* Экран 5 */}
      <SectionShell
        id="approach"
        title="Почему мой подход работает"
        description="Позиционирование: система, которая встраивается в вашу жизнь."
      >
        <ul className="space-y-4">
          {approachPoints.map((text) => (
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
      <ResultsSection />

      {/* Экран 7 */}
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

      {/* Экран 8 */}
      <section
        id="final-cta"
        className="border-t border-zinc-200/80 bg-zinc-50/80 py-20"
      >
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-semibold text-zinc-900">
            Готовы перестать начинать сначала?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
            Выберите формат и сделайте первый шаг к телу, в котором чувствуете
            себя уверенно.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={LANDING_ROUTES.online}
              {...landingNewTabProps(LANDING_ROUTES.online)}
              className="inline-flex rounded-full bg-rose-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-700"
            >
              Онлайн сопровождение
            </Link>
            <Link
              href={LANDING_ROUTES.domVZal}
              {...landingNewTabProps(LANDING_ROUTES.domVZal)}
              className="inline-flex rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Из дома в зал
            </Link>
          </div>
        </div>
      </section>
    </LandingChrome>
  );
}
