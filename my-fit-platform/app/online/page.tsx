import Link from "next/link";
import { LandingChrome } from "@/components/landing/LandingChrome";

export const metadata = {
  title: "Онлайн сопровождение — KATY D.",
  description: "Индивидуальная работа: план питания, программа тренировок и регулярные корректировки.",
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

const heroFeatures = [
  "Персональный план питания и тренировок",
  "Регулярные корректировки",
  "Поддержка 24/7",
  "Помощь при срывах и плато",
];

const forWhom = [
  "Для занятых мам",
  "Для женщин в эмиграции",
  "Для тех, кто устал от диет и срывов",
  "Для тех, кто хочет устойчивый результат",
];

const benefits = [
  { icon: "📋", title: "Индивидуальный план питания", desc: "Рассчитывается под ваш образ жизни, предпочтения и цели" },
  { icon: "🏋️", title: "Индивидуальный план тренировок", desc: "С учётом вашего уровня, оборудования и целей" },
  { icon: "📈", title: "Регулярные корректировки", desc: "Мы адаптируем план под ваш прогресс каждые 1–2 недели" },
  { icon: "💬", title: "Поддержка 24/7", desc: "Я всегда на связи и отвечаю на ваши вопросы" },
  { icon: "🤝", title: "Помощь при срывах и плато", desc: "Вы получаете стратегию, а не осуждение" },
  { icon: "📚", title: "Обучение и рекомендации", desc: "Вы поймёте, как работает ваше тело и питание" },
];

const steps = [
  { n: "01", title: "Знакомство и заполнение анкеты", desc: "Вы заполняете анкету, я изучаю вашу ситуацию и цели." },
  { n: "02", title: "Анализ и план", desc: "Я составляю для вас индивидуальный план питания и тренировок." },
  { n: "03", title: "Вы начинаете", desc: "Вы получаете все материалы и рекомендации, мы начинаем работать." },
  { n: "04", title: "Поддержка и контроль", desc: "Я сопровождаю вас каждый день, вы присылаете отчёты, мы корректируем план." },
  { n: "05", title: "Результат", desc: "Вы меняете не только тело, но и образ жизни навсегда." },
];

const faqItems = [
  { q: "Что делать, если у меня был неудачный опыт похудения раньше?", a: "Мы строим систему, которую можно соблюдать долго, а не очередную краткосрочную диету." },
  { q: "Нужно ли покупать спортивное питание?", a: "Нет." },
  { q: "Нужно ли полностью отказаться от любимых продуктов?", a: "Нет." },
  { q: "Можно ли совмещать программу с семейным питанием?", a: "Да." },
  { q: "Что будет после завершения программы?", a: "Вы получите понимание, как поддерживать результат самостоятельно." },
  { q: "Что если я пропущу тренировку или собьюсь с плана?", a: "Это нормально. Главное — вернуться к системе и продолжать движение дальше." },
  { q: "Через сколько я увижу первые изменения?", a: "Первые изменения обычно заметны уже через несколько недель регулярной работы." },
];

export default function OnlinePage() {
  return (
    <LandingChrome>

      {/* ─── HERO ─── */}
      <section className="bg-[#FAF8F4] overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <PhotoSlot label="Фото Кати за работой" className="aspect-[3/4] rounded-sm" />
            <div>
              <h1 className="text-4xl font-bold text-stone-900 leading-tight sm:text-5xl">
                Онлайн<br />сопровождение
              </h1>
              <p className="mt-2 text-sm text-[#C4956A] font-medium tracking-wide">
                Индивидуальная работа со мной для тех,<br />кто хочет получить максимальный результат
              </p>
              <ul className="mt-6 space-y-3">
                {heroFeatures.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-stone-600"><Check />{f}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="#pricing" className="rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                  ХОЧУ В СОПРОВОЖДЕНИЕ
                </Link>
                <button className="flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-xs">▶</span>
                  <span className="text-left">СМОТРЕТЬ ВИДЕО<br /><span className="text-xs font-normal">о программе (1 мин)</span></span>
                </button>
              </div>
              {/* For whom card */}
              <div className="mt-8 rounded-sm border border-[#E8E2D9] bg-white p-5">
                <p className="text-sm font-semibold text-stone-900">Для кого это подходит?</p>
                <ul className="mt-3 space-y-2">
                  {forWhom.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-stone-600">
                      <span className="text-[#C4956A] shrink-0 mt-0.5">◎</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ЧТО ПОЛУЧАЕТЕ ─── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Что вы получаете</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-6">
                <div className="text-3xl">{b.icon}</div>
                <p className="mt-3 text-sm font-semibold text-stone-900">{b.title}</p>
                <p className="mt-2 text-xs text-stone-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── КАК ПРОХОДИТ РАБОТА ─── */}
      <section className="bg-[#FAF8F4] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Как проходит работа</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <div key={s.n} className="rounded-sm bg-white border border-[#E8E2D9] overflow-hidden">
                <div className="aspect-square bg-stone-200 relative flex items-center justify-center">
                  <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#C4956A] text-white text-xs font-bold">
                    {s.n}
                  </div>
                  <p className="text-stone-300 text-2xl">📷</p>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-stone-900">{s.title}</p>
                  <p className="mt-2 text-xs text-stone-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ТАРИФЫ ─── */}
      <section id="pricing" className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Тарифы</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-8">
              <h3 className="text-xl font-bold text-stone-900">Персональный старт</h3>
              <p className="text-sm text-stone-400 mt-1">12 недель персональной работы</p>
              <ul className="mt-6 space-y-3">
                {["Подробная анкета", "Расчет КБЖУ", "Персональный план питания", "Программа тренировок", "Видео техники упражнений", "1 онлайн-тренировка по видеосвязи", "Ежемесячная корректировка плана"].map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-stone-600"><Check />{f}</li>
                ))}
              </ul>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl font-bold text-stone-900">$149</span>
                <span className="text-sm text-stone-400">/ 12 недель</span>
              </div>
              <Link href="/checkout/coached" className="mt-4 inline-flex w-full justify-center rounded-sm bg-[#C4956A] px-5 py-3 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                КУПИТЬ
              </Link>
            </article>
            <article className="rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] p-8">
              <h3 className="text-xl font-bold text-stone-900">Вместе</h3>
              <p className="text-sm text-stone-400 mt-1">Полное онлайн сопровождение</p>
              <ul className="mt-6 space-y-3">
                {["Всё из тарифа «Персональный старт»", "Еженедельные отчеты", "Поддержка", "Ответы на вопросы", "Контроль питания", "Контроль тренировок", "Корректировки по мере необходимости"].map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-stone-600"><Check />{f}</li>
                ))}
              </ul>
              <div className="mt-8 rounded-sm bg-stone-100 p-4 text-center">
                <p className="text-sm text-stone-600">Индивидуальные условия. Заполните анкету, чтобы обсудить детали.</p>
              </div>
              <Link href="#" className="mt-4 inline-flex w-full justify-center rounded-sm bg-[#C4956A] px-5 py-3 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                ЗАПОЛНИТЬ АНКЕТУ
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-[#FAF8F4] py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Частые вопросы</h2>
          <dl className="mt-12 space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="rounded-sm border border-[#E8E2D9] bg-white p-6">
                <dt className="text-sm font-semibold text-stone-900">{item.q}</dt>
                <dd className="mt-2 text-sm text-stone-500">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#F0EAE0] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Готовы изменить свою жизнь?</h2>
              <p className="mt-4 text-stone-500 leading-relaxed">Запишитесь на бесплатную консультацию, и мы вместе разберём вашу ситуацию и подберём лучший формат работы.</p>
              <Link href="#" className="mt-8 inline-flex rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["-10 кг в среднем", "Улучшение качества тела", "Больше энергии и уверенности", "Привычки, которые остаются с вами", "Поддержка, которая меняет жизнь"].map((r, i) => (
                <div key={r} className={`rounded-sm bg-white border border-[#E8E2D9] p-3 text-center ${i === 4 ? "col-span-3 sm:col-span-1" : ""}`}>
                  <p className="text-xs text-stone-600 leading-tight">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </LandingChrome>
  );
}
