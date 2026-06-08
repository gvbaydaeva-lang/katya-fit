import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { ResultsSection } from "@/components/landing/ResultsSection";
import { SectionShell } from "@/components/landing/SectionShell";
import { landingNewTabProps } from "@/lib/landing/link-props";
import { LANDING_ROUTES } from "@/lib/landing/routes";

const painCards = [
  "Снова начинаю с понедельника",
  "Вес уходит и возвращается",
  "Не понимаю, что есть для результата",
  "Не хватает времени на себя",
  "Боюсь тренажерного зала",
  "Устала от диет и ограничений",
  "Хочу снова нравиться себе в зеркале",
  "Постоянно откладываю себя на потом",
];

const trustItems = [
  "Минус 20 кг после родов и эмиграции",
  "Сертифицированный фитнес-тренер IFPA",
  "Menno Henselmans Personal Trainer Certification",
  "Работаю с женщинами по всему миру",
];

const approachPoints = [
  "Без жестких запретов",
  "Без марафонов",
  "Без экстремальных диет",
  "Под реальную жизнь",
  "Под мам в декрете",
  "Под женщин в эмиграции",
  "Под высокий уровень стресса",
  "Под женщин, которые много раз начинали сначала",
];

const faqItems = [
  {
    q: "Подойдет ли мне, если я новичок?",
    a: "Да. Все программы адаптированы под разный уровень подготовки.",
  },
  {
    q: "Нужно ли считать калории?",
    a: "Не обязательно. В зависимости от цели используются разные инструменты контроля питания.",
  },
  {
    q: "Подойдет ли после родов?",
    a: "Да, при отсутствии противопоказаний со стороны врача.",
  },
  {
    q: "Можно ли заниматься дома?",
    a: "Да. В зависимости от цели программа может быть составлена как для дома, так и для зала.",
  },
  {
    q: "Чем отличается программа «Из дома в зал» от сопровождения?",
    a: "«Из дома в зал» — самостоятельная программа. Онлайн сопровождение предполагает персональную работу и корректировки.",
  },
  {
    q: "Сколько времени нужно, чтобы увидеть результат?",
    a: "Первые изменения обычно заметны уже через несколько недель регулярной работы.",
  },
  {
    q: "Можно ли начать, если у меня мало времени?",
    a: "Да. Все программы адаптируются под реальную жизнь и плотный график.",
  },
];

export default function HomePage() {
  return (
    <LandingChrome>
      {/* Блок 1. Первый экран */}
      <section
        id="hero"
        className="relative overflow-hidden bg-white"
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <h1 className="text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl">
              Верните себе не только форму, но и себя.
            </h1>
            <p className="mt-6 text-lg text-stone-600">
              Помогаю женщинам создать систему питания и тренировок, которая
              работает в реальной жизни и помогает чувствовать себя уверенно в
              своём теле.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={LANDING_ROUTES.online}
                {...landingNewTabProps(LANDING_ROUTES.online)}
                className="inline-flex items-center justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-800"
              >
                Онлайн сопровождение
              </Link>
              <Link
                href={LANDING_ROUTES.domVZal}
                {...landingNewTabProps(LANDING_ROUTES.domVZal)}
                className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-50"
              >
                Из дома в зал
              </Link>
            </div>
            {/* Блок доверия */}
            <ul className="mt-10 space-y-2">
              {trustItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="mt-0.5 text-stone-800">✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-stone-100 shadow-xl flex items-end p-8">
            <p className="rounded-2xl bg-white/90 p-4 text-sm text-stone-500 backdrop-blur">
              Фото Кати
            </p>
          </div>
        </div>
      </section>

      {/* Блок 2. Возможно, вы узнаете себя */}
      <SectionShell
        id="pains"
        title="Возможно, вы узнаете себя"
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {painCards.map((text) => (
            <li
              key={text}
              className="rounded-2xl border border-stone-200 bg-white p-5 text-stone-700 text-sm"
            >
              {text}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center font-medium text-stone-800">
          Проблема не в силе воли. Проблема в отсутствии системы.
        </p>
      </SectionShell>

      {/* Блок 3. Моя история */}
      <SectionShell
        id="my-story"
        title="Я тоже была на вашем месте"
        className="bg-stone-50/60"
      >
        <div className="max-w-2xl space-y-4 text-stone-600">
          <p>
            Когда я переехала в США, у меня на руках была маленькая дочь.
            Новая страна. Новый язык. Мои родители остались далеко. Рядом не
            было близких друзей и привычной поддержки.
          </p>
          <p>
            Большую часть времени я проводила одна с ребенком, пытаясь
            одновременно справляться с декретом и строить новую жизнь.
          </p>
          <p>
            Со временем я поймала себя на мысли, что больше не помню, когда
            в последний раз делала что-то для себя. Мне казалось, что где-то
            между заботой о семье, ребенке и бесконечными делами я начала
            терять саму себя.
          </p>
          <p>
            Именно тогда в моей жизни появились тренировки. Сначала они были
            не про похудение. Они стали моими 20–30 минутами в день.
            Временем, которое принадлежало только мне.
          </p>
          <p>
            После рождения дочери я набрала около 15 кг. После переезда и
            периода адаптации добавилось еще около 5 кг. Шаг за шагом
            тренировки помогли мне вернуть не только форму, но и уверенность
            в себе.
          </p>
          <p>
            В итоге мне удалось избавиться примерно от 20 кг, прийти в
            тренажерный зал, получить профессиональное образование и начать
            помогать другим женщинам проходить этот путь легче.
          </p>
          <p className="font-medium text-stone-800">
            Сегодня я работаю с женщинами, которые хотят перестать начинать
            заново каждый понедельник и создать систему питания и тренировок,
            которая работает в реальной жизни и дает результат надолго.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {["Фото ДО", "Фото ПОСЛЕ", "Сертификат IFPA", "Сертификат Menno Henselmans"].map(
            (label) => (
              <div
                key={label}
                className="aspect-[3/4] rounded-2xl bg-stone-100 flex items-end p-4"
              >
                <span className="text-xs text-stone-400">{label}</span>
              </div>
            )
          )}
        </div>
      </SectionShell>

      <ResultsSection />

      <SectionShell
        id="choose-path"
        title="Выберите свой путь"
        description="Два формата — одна цель: устойчивый результат без откатов."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-stone-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-stone-900">Из дома в зал</h3>
            <p className="mt-2 text-sm text-stone-600">
              12-недельная программа для женщин, которые хотят уверенно перейти
              от домашних тренировок к тренировкам в зале.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-stone-600">
              {[
                "4 недели домашних тренировок",
                "8 недель тренировок в зале",
                "Видео техники упражнений",
                "Личный кабинет",
                "Доступ навсегда",
              ].map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-stone-500">✔</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-stone-50 p-3 text-sm text-stone-600">
              <span className="font-medium">🎁 Бонус:</span> Меню на 3 дня без подсчета калорий
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-stone-900">$79</span>
            </div>
            <Link
              href={LANDING_ROUTES.domVZal}
              {...landingNewTabProps(LANDING_ROUTES.domVZal)}
              className="mt-4 inline-flex w-full justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
            >
              Подробнее
            </Link>
          </article>
          <article className="rounded-2xl border border-stone-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-stone-900">Онлайн сопровождение</h3>
            <p className="mt-2 text-sm text-stone-600">Персональная работа со мной.</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-stone-100 p-3">
                <p className="font-medium text-stone-800 text-sm">Персональный старт</p>
                <p className="text-xs text-stone-500 mt-0.5">12 недель персональной работы — $149</p>
              </div>
              <div className="rounded-xl border border-stone-100 p-3">
                <p className="font-medium text-stone-800 text-sm">Вместе</p>
                <p className="text-xs text-stone-500 mt-0.5">Полное онлайн сопровождение</p>
              </div>
            </div>
            <Link
              href={LANDING_ROUTES.online}
              {...landingNewTabProps(LANDING_ROUTES.online)}
              className="mt-6 inline-flex w-full justify-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors"
            >
              Подробнее
            </Link>
          </article>
        </div>
      </SectionShell>

      <SectionShell
        id="approach"
        title="Почему мой подход работает"
        className="bg-stone-50/60"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {approachPoints.map((text) => (
            <li key={text} className="flex gap-3 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-700">
              <span className="text-stone-800 font-medium">✔</span>{text}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="faq" title="FAQ">
        <dl className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.q} className="rounded-2xl border border-stone-200 bg-white p-6">
              <dt className="font-medium text-stone-900">{item.q}</dt>
              <dd className="mt-2 text-sm text-stone-600">{item.a}</dd>
            </div>
          ))}
        </dl>
      </SectionShell>

      <section id="final-cta" className="border-t border-stone-200/80 bg-stone-50/60 py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-semibold text-stone-900">Возможно, это ваше последнее начало.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-stone-600">Перестаньте ждать идеальный момент. Давайте построим систему, которая будет работать в вашей реальной жизни.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={LANDING_ROUTES.online} {...landingNewTabProps(LANDING_ROUTES.online)} className="inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition-colors">Онлайн сопровождение</Link>
            <Link href={LANDING_ROUTES.domVZal} {...landingNewTabProps(LANDING_ROUTES.domVZal)} className="inline-flex rounded-full border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 hover:bg-stone-50 transition-colors">Из дома в зал</Link>
          </div>
        </div>
      </section>
    </LandingChrome>
  );
}
