import Image from "next/image";
import katyaCta from "@/public/images/katya-cta.webp";

export default function FinalCtaSection() {
  return (
    <section className="w-full bg-[#FAF8F4]">
      <div className="mx-auto grid min-h-[600px] max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-8 py-16 lg:order-1 lg:px-16 lg:py-0">
          <h2 className="mb-6 text-4xl font-bold leading-tight text-[#1c1917] lg:text-5xl">
            Готовы начать свой путь?
          </h2>
          <p className="mb-8 max-w-sm text-base leading-relaxed text-[#6b5e54]">
            Запишитесь на бесплатную консультацию, и я помогу вам сделать первый
            шаг к новой версии себя.
          </p>
          <div>
            <a
              href="#contact"
              className="inline-block rounded-sm bg-[#C4956A] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#B07D54]"
            >
              Получить консультацию
            </a>
          </div>
        </div>

        <div className="relative order-1 h-[500px] w-full lg:order-2 lg:h-auto lg:min-h-[600px]">
          <Image
            src={katyaCta}
            alt="Катя — фитнес-тренер"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
