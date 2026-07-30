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
import programOnline from "@/public/images/program-online-coaching.png";
import { ClientResultsSection } from "@/components/landing/ClientResultsSection";

export const metadata = {
  title: "Katy Dikaeva — фитнес-тренер для женщин",
  description: "Для женщин, которые выбирают силу, здоровье и долголетие. Научный подход, без диет и крайностей.",
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

      <ClientResultsSection />

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
            <ProgramCard image={programOnline} alt="Программа «Персональная работа онлайн»">
              <h3 className="text-xl font-bold text-stone-900">Персональная работа онлайн</h3>
              <p className="mt-2 max-w-full text-[13px] text-stone-500 leading-relaxed break-words sm:text-sm">
                Индивидуальный план для самостоятельной работы или полное сопровождение со мной.
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {["Персональный план питания и тренировок", "Два уровня поддержки", "Корректировки по выбранному формату", "Срок сопровождения 3 или 6 месяцев"].map((f) => (
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
