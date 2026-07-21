import Image from "next/image";
import {
  BadgeCheck,
  FlaskConical,
  Globe2,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

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

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F4]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">

        {/* LEFT: Text */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C4956A]">
            Для женщин, которые выбирают силу, здоровье и долголетие
          </p>

          <h1 className="mt-4 text-5xl font-black leading-[1.05] tracking-tight text-[#1c1917] sm:text-6xl">
            Верните себе
            <br />
            не только
            <br />
            форму,
            <br />
            но и себя
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#57534e]">
            Помогаю женщинам создать систему питания и тренировок,
            которая работает в реальной жизни и помогает чувствовать
            себя уверенно в своём теле.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/online"
              variant="primary"
              className="inline-flex items-center gap-2 rounded-sm bg-[#C4956A] px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#B07D54]"
            >
              ❤️ Онлайн сопровождение
            </ButtonLink>
            <ButtonLink
              href="/dom-v-zal"
              variant="secondary"
              className="inline-flex items-center gap-2 rounded-sm border border-[#E8E2D9] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1c1917] transition-colors hover:bg-[#F0EBE3]"
            >
              💪 Из дома в зал
            </ButtonLink>
          </div>

          {/* Trust block */}
          <ul className="mt-8 grid gap-3 border-t border-[#E8E2D9] pt-8">
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
        </div>

        {/* RIGHT: Photo */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#E8E2D9]">
            {/* Replace src with real photo path when available */}
            <Image
              src="/images/katya-hero.jpg"
              alt="Катя — фитнес-тренер Katy Dikaeva"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}
