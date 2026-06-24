import Image from "next/image";
import storyBeforeAfter from "@/public/images/story-before-after.webp";
import { CertificateBadgeCard } from "@/components/landing/CertificateBadgeCard";

type MyStorySectionProps = {
  id?: string;
};

export function MyStorySection({ id = "my-story" }: MyStorySectionProps) {
  return (
    <div id={id} className="scroll-mt-20">
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-stretch">
            <div className="w-full min-w-0">
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-sm">
                <Image
                  src={storyBeforeAfter}
                  alt="Трансформация Кати — до и после"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="flex min-h-0 flex-col lg:h-full">
              <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">
                Моя история
              </h2>
              <div className="mt-4 space-y-3 text-base font-normal leading-relaxed text-[#1c1917] lg:mt-5 lg:space-y-4">
                <p>
                  После родов и переезда в США я набрала 20 кг. Новый язык, чужая
                  страна, никого из близких рядом — тренировки стали единственным,
                  что давало мне контроль.
                </p>
                <p>
                  Сегодня я сертифицированный тренер{" "}
                  <span className="text-[#C4956A]">IFPA</span>, прошла обучение у{" "}
                  <span className="text-[#C4956A]">Менно Хансельманса</span> — одного
                  из самых авторитетных тренеров в мире, чья методика построена на
                  науке, а не на фитнес-мифах.
                </p>
                <p>
                  Я знаю, что чувствует женщина, потерявшая себя в чужой стране. И
                  знаю, как вернуть её обратно — не мотивацией, а системой.
                </p>
                <p>
                  Это не история про похудение. Это история про то, как вернуть
                  контроль над собственной жизнью.
                </p>
              </div>

              <div className="mt-5 lg:mt-auto">
                <CertificateBadgeCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
