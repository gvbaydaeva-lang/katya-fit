import Image from "next/image";
import Link from "next/link";
import katyaOnline from "@/public/images/katya-online.webp";

const RESULTS = [
  "−10 кг в среднем",
  "Улучшение качества тела",
  "Больше энергии и уверенности",
  "Привычки на всю жизнь",
] as const;

export function ReadySection() {
  return (
    <section className="bg-[#FAF8F4] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 overflow-hidden rounded-sm bg-[#FAF8F4] lg:grid-cols-2 lg:items-stretch">
          <div className="relative order-1 min-h-[320px] lg:order-2">
            <Image
              src={katyaOnline}
              alt="Катя — фитнес-тренер KATY D."
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="order-2 flex flex-col justify-center gap-5 px-0 py-10 lg:order-1 lg:px-9">
            <h2 className="text-4xl font-bold leading-tight text-[#1c1917] lg:text-5xl">
              Готовы изменить своё тело и привычки?
            </h2>
            <p className="text-sm leading-[1.7] text-[#6b5e52] lg:text-base">
              Запишитесь на бесплатную консультацию — разберём вашу ситуацию и
              подберём лучший формат работы.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {RESULTS.map((item) => (
                <div
                  key={item}
                  className="rounded-sm border-[0.5px] border-[#E8E2D9] bg-white px-3 py-2.5 text-xs text-[#3D3530]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div>
              <Link
                href="#"
                className="inline-flex rounded-sm bg-[#C4956A] px-5 py-3 text-xs font-medium uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#B07D54]"
              >
                ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
