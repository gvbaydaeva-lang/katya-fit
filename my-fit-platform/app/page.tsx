import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { LANDING_ROUTES } from "@/lib/landing/routes";
import { landingNewTabProps } from "@/lib/landing/link-props";
import heroKatya from "@/public/images/hero-katya.jpg";
import programDomVZal from "@/public/images/program-dom-v-zal.webp";
import programOnline from "@/public/images/program-online.webp";
import storyBeforeAfter from "@/public/images/story-before-after.webp";

export const metadata = {
  title: "KATY D. — фитнес-тренер для женщин",
  description: "Помогаю женщинам в декрете и эмиграции восстановить форму и энергию. Без диет и крайностей.",
};

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-[#C4956A] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PhotoSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-stone-200 ${className}`}>
      <p className="text-stone-400 text-xs text-center px-4 leading-relaxed">📷 {label}</p>
    </div>
  );
}

function CoverImage({
  src,
  alt,
  aspectClass,
  sizes,
  priority = false,
}: {
  src: import("next/image").StaticImageData;
  alt: string;
  aspectClass: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative w-full shrink-0 overflow-hidden ${aspectClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

function ProgramCard({
  image,
  alt,
  children,
}: {
  image: import("next/image").StaticImageData;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-sm border border-[#E8E2D9] bg-white">
      <CoverImage
        src={image}
        alt={alt}
        aspectClass="aspect-[2/3]"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="flex w-full min-w-0 flex-1 flex-col px-5 pb-6 pt-5 sm:px-7 sm:pb-8 sm:pt-6">
        {children}
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <LandingChrome>

      {/* ─── HERO ─── */}
      <section className="overflow-hidden bg-[#FAF8F4]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-[#C4956A] uppercase mb-4">
                Для женщин в декрете и в эмиграции
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] text-stone-900 sm:text-5xl lg:text-6xl">
                Верните себе<br />не только форму,<br />но и себя
              </h1>
              <p className="mt-6 text-lg text-stone-500 leading-relaxed max-w-md">
                Я помогу вам восстановить энергию, обрести уверенность и построить тело, в котором вам будет комфортно жить.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#programs" className="rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                  МОИ ПРОГРАММЫ
                </Link>
                <Link href="/#about" className="rounded-sm border border-stone-300 px-8 py-3.5 text-sm font-semibold tracking-wider text-stone-700 hover:bg-stone-100 transition-colors">
                  ОБО МНЕ
                </Link>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-stone-200 pt-8">
                {[
                  { icon: "🔬", text: "Научный подход без диет и крайностей" },
                  { icon: "🤝", text: "Индивидуальный подход и поддержка" },
                  { icon: "🏋️", text: "Из дома в зал: пошаговый путь" },
                ].map((b) => (
                  <div key={b.text} className="flex flex-col items-center text-center gap-2">
                    <span className="text-xl">{b.icon}</span>
                    <p className="text-xs text-stone-500 leading-snug">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm">
                <Image
                  src={heroKatya}
                  alt="Катя — фитнес-тренер для женщин в декрете и эмиграции"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 28rem"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-sm bg-[#C4956A]/10 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── МОЯ ИСТОРИЯ ─── */}
      <section id="about" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="w-full min-w-0">
              <CoverImage
                src={storyBeforeAfter}
                alt="Трансформация Кати — до и после"
                aspectClass="aspect-square rounded-sm"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Моя история</h2>
              <div className="mt-6 space-y-4 text-stone-500 leading-relaxed">
                <p>После рождения дочери и переезда в США я набрала 20 кг. Новая страна, язык, отсутствие близких рядом, декрет — всё это перевернуло мою жизнь.</p>
                <p>Я потеряла себя, свою энергию и уверенность. Тренировки стали моим способом вернуть себе.</p>
                <p>Сегодня я не просто в лучшей форме, чем когда-либо. Я — сертифицированный тренер, и я помогаю женщинам пройти этот путь с поддержкой и системой.</p>
              </div>
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <div className="rounded-sm border border-stone-200 px-4 py-2.5">
                  <p className="text-xs font-bold tracking-widest text-stone-800">IFPA</p>
                  <p className="text-[9px] text-stone-400 tracking-wide mt-0.5">CERTIFIED TRAINER</p>
                </div>
                <div className="rounded-sm border border-stone-200 px-4 py-2.5">
                  <p className="text-xs font-bold tracking-widest text-stone-800">MENNO HENSELMANS</p>
                  <p className="text-[9px] text-stone-400 tracking-wide mt-0.5">SCIENCE TO APPLY</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── МОИ ПРОГРАММЫ ─── */}
      <section id="programs" className="bg-[#FAF8F4] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Мои программы</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <ProgramCard image={programDomVZal} alt="Программа «Из дома в зал»">
              <h3 className="text-xl font-bold text-stone-900">Из дома в зал</h3>
              <p className="mt-2 max-w-full text-[13px] text-stone-500 leading-relaxed break-words sm:text-sm">
                12-недельная программа для женщин, которые хотят начать тренироваться и уверенно чувствовать себя в зале.
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {["Тренировки дома и в зале", "Питание без подсчёта калорий", "Пошаговые инструкции", "Поддержка"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-stone-600 break-words sm:text-sm">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <Link href={LANDING_ROUTES.domVZal} {...landingNewTabProps(LANDING_ROUTES.domVZal)} className="mt-6 inline-flex w-fit max-w-full rounded-sm border border-[#C4956A] px-6 py-2.5 text-xs font-semibold tracking-widest text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors">
                ПОДРОБНЕЕ
              </Link>
            </ProgramCard>
            <ProgramCard image={programOnline} alt="Программа «Онлайн сопровождение»">
              <h3 className="text-xl font-bold text-stone-900">Онлайн сопровождение</h3>
              <p className="mt-2 max-w-full text-[13px] text-stone-500 leading-relaxed break-words sm:text-sm">
                Индивидуальная работа со мной для тех, кто хочет получить максимальный результат.
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {["Индивидуальный план питания и тренировок", "Регулярные корректировки", "Поддержка 24/7", "Помощь при срывах и плато"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[13px] text-stone-600 break-words sm:text-sm">
                    <CheckIcon /> {f}
                  </li>
                ))}
              </ul>
              <Link href={LANDING_ROUTES.online} {...landingNewTabProps(LANDING_ROUTES.online)} className="mt-6 inline-flex w-fit max-w-full rounded-sm border border-[#C4956A] px-6 py-2.5 text-xs font-semibold tracking-widest text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors">
                ПОДРОБНЕЕ
              </Link>
            </ProgramCard>
          </div>
        </div>
      </section>

      {/* ─── РЕЗУЛЬТАТЫ ─── */}
      <section id="results" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Результаты моих клиенток</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Анна, 34 года", result: "-12 кг за 3 месяца", quote: "«Наконец-то я чувствую себя собой и у меня есть энергия на ребёнка и на себя»" },
              { name: "Мария, 31 год", result: "-15 кг за 4 месяца", quote: "«Я больше не сажусь на диеты. Я просто живу по системе, которую мы выстроили»" },
              { name: "Елена, 36 лет", result: "-9 кг за 2.5 месяца", quote: "«Это первый раз, когда у меня получилось без стресса и головняков»" },
              { name: "Ольга, 38 лет", result: "-11 кг за 3 месяца", quote: "«Я из дома в зал, как и обещала. Это изменило не только моё тело, но и мою жизнь»" },
            ].map((client) => (
              <div key={client.name} className="rounded-sm border border-[#E8E2D9] overflow-hidden bg-[#FAF8F4]">
                <div className="grid grid-cols-3 gap-1 p-2">
                  <div className="aspect-[2/3] bg-stone-200 rounded-sm" />
                  <div className="aspect-[2/3] bg-stone-300 rounded-sm" />
                  <div className="aspect-[2/3] bg-stone-200 rounded-sm" />
                </div>
                <div className="px-4 pb-5 pt-2">
                  <p className="text-xs font-semibold text-stone-900">{client.name}</p>
                  <p className="text-xs font-bold text-[#C4956A] mt-0.5">{client.result}</p>
                  <p className="mt-2 text-xs text-stone-500 leading-relaxed italic">{client.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" className="bg-[#F0EAE0] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Готовы начать свой путь?</h2>
              <p className="mt-4 text-lg text-stone-500 leading-relaxed">Запишитесь на бесплатную консультацию, и мы вместе разберём вашу ситуацию и подберём лучший формат работы.</p>
              <Link href="#" className="mt-8 inline-flex rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
              </Link>
            </div>
            <PhotoSlot label="Фото для CTA секции" className="aspect-[4/3] rounded-sm" />
          </div>
        </div>
      </section>

    </LandingChrome>
  );
}
