import Image from "next/image";
import type { CSSProperties } from "react";
import {
  BadgeCheck,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
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
  { label: "Работаю с женщинами по всему миру", icon: Globe2 },
  { label: "Сертифицированный фитнес-тренер IFPA", icon: BadgeCheck },
  {
    label: "Menno Henselmans Personal Trainer Certification",
    icon: GraduationCap,
  },
  { label: "Индивидуальный подход и поддержка", icon: HeartHandshake },
  { label: "Научный подход, без диет и крайностей", icon: FlaskConical },
];

const primaryCtaClassName =
  "inline-flex items-center rounded-sm bg-[#C4956A] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#B07D54]";

const secondaryButtonClassName =
  "inline-flex items-center rounded-sm border border-[#E8E2D9] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1c1917] transition-colors hover:bg-[#F0EBE3]";

function HeroPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative aspect-[3/4]">
        <Image
          src={katyaHero}
          alt="Катя — фитнес-тренер Katy Dikaeva"
          fill
          className="object-cover object-top"
          style={HERO_IMAGE_MASK}
          priority
          sizes="(max-width: 1024px) 100vw, 28rem"
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 pt-24 pb-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">

        <div className="order-2 flex flex-col lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C4956A]">
            Для женщин, которые выбирают силу, здоровье и долголетие
          </p>

          <h1 className={`mt-4 text-[#1c1917] ${LANDING_HERO_TITLE_CLASS}`}>
            Верните себе не только форму, но и себя
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#57534e]">
            Помогаю женщинам создать систему питания и тренировок,
            которая работает в реальной жизни и помогает чувствовать
            себя уверенно в своём теле.
          </p>

          <ul className="order-3 mt-8 grid gap-3 lg:order-5 lg:border-t lg:border-[#E8E2D9] lg:pt-8">
            {TRUST_ITEMS.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex min-h-14 items-center gap-3 rounded-sm border border-[#E8E2D9] bg-white/55 px-3.5 py-3 text-sm leading-snug text-[#44403c]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F0E5D9] text-[#B07D54]">
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="order-4 mt-8 flex flex-col gap-4 lg:order-4 lg:flex-row lg:flex-wrap lg:gap-3">
            <AnchorLink sectionId={LANDING_SECTIONS.programs} className={primaryCtaClassName}>
              Мои программы
            </AnchorLink>
            <AnchorLink
              sectionId={LANDING_SECTIONS.about}
              ariaLabel="Перейти к разделу обо мне"
              className={secondaryButtonClassName}
            >
              Обо мне
            </AnchorLink>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <HeroPhoto />
        </div>

      </div>
    </section>
  );
}
