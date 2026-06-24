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

            <div className="flex flex-col lg:h-full lg:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-stone-900 sm:text-4xl">
                  Моя история
                </h2>
                <div className="mt-6 space-y-6 text-stone-500 leading-relaxed lg:space-y-8">
                  <p>
                    <strong className="font-semibold text-stone-700">
                      После родов и переезда в США я набрала 20 кг.
                    </strong>{" "}
                    Новый язык, чужая страна, никого из близких рядом — тренировки
                    стали единственным, что давало мне контроль.
                  </p>
                  <p>
                    <strong className="font-semibold text-stone-700">
                      Сегодня я сертифицированный тренер{" "}
                      <span className="text-[#C4956A]">IFPA</span>, прошла обучение
                      у <span className="text-[#C4956A]">Менно Хансельманса</span> —
                      одного из самых авторитетных тренеров в мире, чья методика
                      построена на науке, а не на фитнес-мифах.
                    </strong>
                  </p>
                  <p>
                    Я знаю, что чувствует женщина, потерявшая себя в чужой стране. И
                    знаю, как вернуть её обратно — не мотивацией, а системой.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-2xl font-bold leading-snug tracking-tight text-[#1c1917] lg:mt-0 lg:text-3xl sm:leading-tight sm:tracking-[-1px]">
                <span>Это не история про похудение. </span>
                <span className="text-[#C4956A]">
                  Это история про то, как вернуть контроль над собственной жизнью.
                </span>
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-4 lg:mt-auto">
                <div className="rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] px-4 py-2.5">
                  <p className="text-xs font-bold tracking-widest text-stone-800">
                    IFPA
                  </p>
                  <p className="mt-0.5 text-[9px] tracking-wide text-stone-400">
                    CERTIFIED TRAINER
                  </p>
                </div>
                <div className="rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] px-4 py-2.5">
                  <p className="text-xs font-bold tracking-widest text-stone-800">
                    MENNO HENSELMANS
                  </p>
                  <p className="mt-0.5 text-[9px] tracking-wide text-stone-400">
                    SCIENCE TO APPLY
                  </p>
                </div>
                <CertificateBadgeCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
