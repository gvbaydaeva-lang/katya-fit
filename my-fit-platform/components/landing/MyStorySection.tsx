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
                  После рождения дочери и переезда в США я набрала{" "}
                  <strong>20 кг</strong>. Новая страна, язык, отсутствие близких
                  рядом, декрет — в какой-то момент я перестала узнавать себя.
                </p>
                <p>
                  Все изменилось, когда я начала вводить дочке прикорм. Тогда я
                  поймала себя на мысли:{" "}
                  <strong>
                    как я могу учить ребенка любить здоровую еду, если сама питаюсь
                    совсем иначе?
                  </strong>{" "}
                  Я решила начать с себя.
                </p>
                <p>
                  Постепенно изменила питание, затем добавила тренировки. Мне
                  хотелось не временного результата, а такого образа жизни, который
                  останется со мной на долгие годы.
                </p>
                <p>
                  <strong>Именно этот путь привел меня в профессию.</strong> Я
                  получила международную сертификацию <strong>IFPA</strong> в США и
                  прошла обучение у <strong>Menno Henselmans</strong> — одного из
                  ведущих мировых экспертов в области доказательного фитнеса.
                </p>
                <p>
                  Сегодня я помогаю женщинам по всему миру не просто похудеть, а
                  изменить образ жизни, чтобы сохранить здоровье, силу, энергию и
                  высокое качество жизни на долгие годы. Ведь моя цель — не просто
                  стройное тело сегодня, а здоровое и активное будущее.
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
