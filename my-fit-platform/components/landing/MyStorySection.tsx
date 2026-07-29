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
          <h2 className="mb-10 text-center text-3xl font-bold text-stone-900 sm:text-4xl lg:mb-12">
            Моя история
          </h2>

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
              <div className="space-y-3 text-[15px] font-normal leading-[1.55] text-[#1c1917]">
                <p>
                  После рождения дочери и переезда в США я набрала{" "}
                  <strong>20 кг</strong>. Новая страна, язык, отсутствие близких
                  рядом, декрет — в какой-то момент я перестала узнавать себя.
                </p>
                <p>
                  Все изменилось, когда я начала вводить дочке прикорм и спросила
                  себя:{" "}
                  <strong>
                    как учить ребенка любить здоровую еду, если сама питаюсь иначе?
                  </strong>{" "}
                  Я начала с себя: постепенно изменила питание, добавила тренировки
                  и выстроила образ жизни, который останется со мной надолго.
                </p>
                <p>
                  <strong>Именно этот путь привел меня в профессию.</strong> Я
                  получила международную сертификацию <strong>IFPA</strong> в США и
                  прошла обучение у <strong>Menno Henselmans</strong> — одного из
                  ведущих экспертов доказательного фитнеса.
                </p>
                <p>
                  Сегодня я помогаю женщинам по всему миру не просто похудеть, а
                  изменить образ жизни, чтобы сохранить здоровье, силу, энергию и
                  высокое качество жизни на долгие годы. Моя цель — не только
                  стройное тело сегодня, но и здоровое, активное будущее.
                </p>
              </div>

              <div className="mt-4 lg:mt-auto">
                <CertificateBadgeCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
