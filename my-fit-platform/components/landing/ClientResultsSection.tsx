import { ClientResultsCarousel } from "@/components/landing/ClientResultsCarousel";
import resultAisa from "@/public/images/result-aisa.webp";
import resultClientNew from "@/public/images/result-client-new.jpg";
import resultElena from "@/public/images/result-elena.webp";
import resultGalina from "@/public/images/result-galina.webp";
import resultKarina from "@/public/images/result-karina.webp";

const RESULT_CLIENTS = [
  {
    name: "Карина, 36 лет",
    profession: "Пекарь, мама двоих детей",
    quote:
      "«Я до последнего не верила, что можно есть любимые торты и при этом худеть. Оказалось — можно!»",
    period: "8 недель",
    stats: ["Вес: –7,5 кг", "Талия: –26 см", "Бёдра: –12 см"],
    image: resultKarina,
    alt: "Результат Карины — до и после",
  },
  {
    name: "Елена, 30 лет",
    profession: "Удалённая работа, мама",
    quote:
      "«Перед отпуском на море меня ждал \"сюрприз\": старый купальник просто сваливался. Пришлось экстренно покупать новый на пару размеров меньше!»",
    period: "8 недель",
    stats: ["Вес: –8,1 кг", "Талия: –11 см", "Бёдра: –6 см", "Ноги: –7 см"],
    image: resultElena,
    alt: "Результат Елены — до и после",
  },
  {
    name: "Галина, 26 лет",
    profession: "Мастер маникюра",
    quote:
      "«Начинала дома с простых упражнений без веса, потом добавила гантели. Сейчас чувствую такую силу, что готова переходить на новый уровень — в тренажёрный зал!»",
    period: "3 месяца",
    stats: [
      "Вес: –8,7 кг",
      "Прогресс: От домашних тренировок до уверенного перехода в зал",
    ],
    image: resultGalina,
    alt: "Результат Галины — до и после",
  },
  {
    name: "Айса, 39 лет",
    profession: "Мама троих детей",
    quote:
      "«С тремя детьми найти время на себя сложно, но реально. Минус 5 кг за месяц — это не только цифры, это совершенно другое отражение в зеркале».",
    period: "4 недели",
    stats: ["Вес: 65,8 кг → 60,6 кг (–5,2 кг)"],
    image: resultAisa,
    alt: "Результат Айсы — до и после",
  },
  {
    name: "Саяна",
    profession: "Мама 2-х детей, швея",
    quote:
      "«Между работой, детьми и домом я думала, что на себя времени не останется. Но 30 минут в день и простая система питания помогли за два месяца снова узнать себя в зеркале — без голодовок и чувства вины».",
    period: "8 недель",
    stats: [
      "Вес: –7 кг",
      "Грудь: –5 см",
      "Талия: –10 см",
      "Живот: –10 см",
      "Бёдра: –5 см",
    ],
    image: resultClientNew,
    alt: "Результат Саяны — до и после",
  },
] as const;

export function ClientResultsSection() {
  return (
    <section id="results" className="scroll-mt-20 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-stone-900 sm:text-4xl">
          Результаты моих клиенток
        </h2>
        <ClientResultsCarousel clients={RESULT_CLIENTS} />
      </div>
    </section>
  );
}
