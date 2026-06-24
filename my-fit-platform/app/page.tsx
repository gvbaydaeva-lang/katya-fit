import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { PainPointsSection } from "@/components/landing/PainPointsSection";
import { MyStorySection } from "@/components/landing/MyStorySection";
import WhyItWorksSection from "@/components/landing/WhyItWorksSection";
import FaqSection from "@/components/landing/FaqSection";
import FinalCtaSection from "@/components/landing/FinalCtaSection";
import { LandingChrome } from "@/components/landing/LandingChrome";
import { LANDING_ROUTES } from "@/lib/landing/routes";
import { landingNewTabProps } from "@/lib/landing/link-props";
import programDomVZal from "@/public/images/program-dom-v-zal.webp";
import programOnline from "@/public/images/program-online.webp";
import resultKarina from "@/public/images/result-karina.webp";
import resultElena from "@/public/images/result-elena.webp";
import resultGalina from "@/public/images/result-galina.webp";
import resultAisa from "@/public/images/result-aisa.webp";
import resultClientNew from "@/public/images/result-client-new.jpg";
import { ClientResultsCarousel } from "@/components/landing/ClientResultsCarousel";

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
  {
    name: "Саяна",
    profession: "Мама 2-х детей, швея",
    quote:
      "«Между работой, детьми и домом я думала, что на себя времени не останется. Но 30 минут в день и простая система питания помогли за два месяца снова узнать себя в зеркале — без голодовок и чувства вины».",
    period: "8 недель",
    stats: [
      "Вес: –7 кг",
      "Грудь: –5 см",
      "Талия: –10 см",
      "Живот: –10 см",
      "Бёдра: –5 см",
    ],
    image: resultClientNew,
    alt: "Результат Саяны — до и после",
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

export default function HomePage() {
  return (
    <LandingChrome>

      <HeroSection />

      <PainPointsSection />

      <MyStorySection />

      {/* ─── РЕЗУЛЬТАТЫ ─── */}
      <div id="results" className="scroll-mt-20">
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl text-center">Результаты моих клиенток</h2>
          <ClientResultsCarousel clients={resultClients} />
        </div>
      </section>
      </div>

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

      <WhyItWorksSection />
      <FaqSection />
      <FinalCtaSection />

    </LandingChrome>
  );
}
