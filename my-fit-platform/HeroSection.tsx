import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

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

        {/* LEFT: Text */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C4956A]">
            Для женщин в декрете и в эмиграции
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
          <ul className="mt-8 flex flex-col gap-2.5 border-t border-[#E8E2D9] pt-8">
            {TRUST_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#44403c]">
                <span className="mt-0.5 shrink-0 text-[#C4956A]">✔</span>
                <span>{item}</span>
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
              alt="Катя — фитнес-тренер KATY D."
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
