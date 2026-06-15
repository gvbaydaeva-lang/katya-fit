import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { LANDING_ROUTES } from "@/lib/landing/routes";
import { landingNewTabProps } from "@/lib/landing/link-props";
import programDomVZal from "@/public/images/program-dom-v-zal.webp";
import programOnline from "@/public/images/program-online.webp";
import storyBeforeAfter from "@/public/images/story-before-after.webp";
import resultKarina from "@/public/images/result-karina.webp";
import resultElena from "@/public/images/result-elena.webp";
import resultGalina from "@/public/images/result-galina.webp";
import resultAisa from "@/public/images/result-aisa.webp";
import ctaConsultation from "@/public/images/cta-consultation.webp";

const resultClients = [
  {
    name: "Карина, 36 лет",
    profession: "Пекарь, мама двоих детей",
    quote: "«Я до последнего не верила, что можно есть любимые торты и при этом худеть. Оказалось — можно!»",
    period: "8 недель",
    stats: ["Вес: –7,5 кг", "Талия: –26 см", "Бёдра: –12 см"],
    image: resultKarina,
    alt: "Результат Карины — до и после",
  },
  {
    name: "Елена, 30 лет",
    profession: "Удалённая работа, мама",
    quote: "«Перед отпуском на море меня ждал \"сюрприз\": старый купальник просто сваливался. Пришлось экстренно покупать новый на пару размеров меньше!»",
    period: "8 недель",
    stats: ["Вес: –8,1 кг", "Талия: –11 см", "Бёдра: –6 см", "Ноги: –7 см"],
    image: resultElena,
    alt: "Результат Елены — до и после",
  },
  {
    name: "Галина, 26 лет",
    profession: "Мастер маникюра",
    quote: "«Начинала дома с простых упражнений без веса, потом добавила гантели. Сейчас чувствую такую силу, что готова переходить на новый уровень — в тренажёрный зал!»",
    period: "3 месяца",
    stats: ["Вес: –8,7 кг", "Прогресс: От домашних тренировок до уверенного перехода в зал"],
    image: resultGalina,
    alt: "Результат Галины — до и после",
  },
  {
    name: "Айса, 39 лет",
    profession: "Мама троих детей",
    quote: "«С тремя детьми найти время на себя сложно, но реально. Минус 5 кг за месяц — это не только цифры, это совершенно другое отражение в зеркале».",
    period: "4 недели",
    stats: ["Вес: 65,8 кг → 60,6 кг (–5,2 кг)"],
    image: resultAisa,
    alt: "Результат Айсы — до и после",
  },
] as const;

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

function ResultCard({
  image,
  alt,
  children,
}: {
  image: import("next/image").StaticImageData;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-sm border border-[#E8E2D9] bg-[#FAF8F4]">
      <div className="shrink-0 p-2">
        <CoverImage
          src={image}
          alt={alt}
          aspectClass="aspect-[4/3] rounded-sm"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="min-w-0 flex-1 px-2 pb-5 pt-1">{children}</div>
    </article>
  );
}

export default function HomePage() {
  return (
    <LandingChrome>

      <HeroSection />

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
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {resultClients.map((client) => (
              <ResultCard key={client.name} image={client.image} alt={client.alt}>
                <p className="text-xs font-semibold text-stone-900">{client.name}</p>
                <p className="mt-0.5 text-[11px] text-stone-500 leading-snug sm:text-xs">{client.profession}</p>
                <p className="mt-2 text-[11px] text-stone-500 leading-relaxed italic break-words sm:text-xs">{client.quote}</p>
                <p className="mt-3 text-[11px] font-bold text-[#C4956A] sm:text-xs">Результат за {client.period}:</p>
                <ul className="mt-1 space-y-0.5">
                  {client.stats.map((stat) => (
                    <li key={stat} className="text-[11px] text-stone-600 leading-snug break-words sm:text-xs">
                      {stat}
                    </li>
                  ))}
                </ul>
              </ResultCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" className="bg-[#F0EAE0] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="min-w-0">
              <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">Готовы начать свой путь?</h2>
              <p className="mt-4 text-lg text-stone-500 leading-relaxed">Запишитесь на бесплатную консультацию, и мы вместе разберём вашу ситуацию и подберём лучший формат работы.</p>
              <Link href="#" className="mt-8 inline-flex rounded-sm bg-[#C4956A] px-8 py-3.5 text-sm font-semibold tracking-wider text-white hover:bg-[#B07D54] transition-colors">
                ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
              </Link>
            </div>
            <div className="w-full min-w-0">
              <CoverImage
                src={ctaConsultation}
                alt="Катя — запись на консультацию"
                aspectClass="aspect-[3/4] rounded-sm"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

    </LandingChrome>
  );
}
