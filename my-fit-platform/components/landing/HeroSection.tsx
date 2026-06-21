import Image from "next/image";
import type { CSSProperties } from "react";
import { AnchorLink } from "@/components/public/AnchorLink";
import { LANDING_SECTIONS } from "@/lib/landing/anchors";
import { LANDING_HERO_TITLE_CLASS } from "@/components/landing/landing-hero-styles";
import katyaHero from "@/public/images/hero-katya.jpg";

const HERO_IMAGE_MASK: CSSProperties = {
  WebkitMaskImage: [
    "linear-gradient(to right, transparent 0%, black 25%)",
    "linear-gradient(to bottom, transparent 0%, black 4%, black 92%, transparent 100%)",
    "linear-gradient(to left, transparent 0%, black 4%)",
  ].join(", "),
  maskImage: [
    "linear-gradient(to right, transparent 0%, black 25%)",
    "linear-gradient(to bottom, transparent 0%, black 4%, black 92%, transparent 100%)",
    "linear-gradient(to left, transparent 0%, black 4%)",
  ].join(", "),
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

const TRUST_ITEMS = [
  "Минус 20 кг после родов и эмиграции",
  "Сертифицированный фитнес-тренер IFPA",
  "Menno Henselmans Personal Trainer Certification",
  "Работаю с женщинами по всему миру",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">

        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C4956A]">
            Для женщин в декрете и в эмиграции
          </p>

          <h1 className={`mt-4 text-[#1c1917] ${LANDING_HERO_TITLE_CLASS}`}>
            Верните себе не только форму, но и себя
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#57534e]">
            Помогаю женщинам создать систему питания и тренировок,
            которая работает в реальной жизни и помогает чувствовать
            себя уверенно в своём теле.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AnchorLink
              sectionId={LANDING_SECTIONS.programs}
              className="inline-flex items-center rounded-sm bg-[#C4956A] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#B07D54]"
            >
              Мои программы
            </AnchorLink>
            <AnchorLink
              sectionId={LANDING_SECTIONS.about}
              className="inline-flex items-center rounded-sm border border-[#E8E2D9] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1c1917] transition-colors hover:bg-[#F0EBE3]"
            >
              Обо мне
            </AnchorLink>
          </div>

          <ul className="mt-8 flex flex-col gap-2.5 border-t border-[#E8E2D9] pt-8">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#44403c]">
                <span className="mt-0.5 shrink-0 text-[#C4956A]">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[3/4]">
            <Image
              src={katyaHero}
              alt="Катя — фитнес-тренер KATY D."
              fill
              className="object-cover object-top"
              style={HERO_IMAGE_MASK}
              priority
              sizes="(max-width: 1024px) 100vw, 28rem"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
