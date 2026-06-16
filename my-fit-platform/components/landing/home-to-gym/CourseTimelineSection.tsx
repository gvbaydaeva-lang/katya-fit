type IllustrationKind = "notebook" | "photo";

type ProgramCard = {
  number: string;
  title: string;
  description: string;
  illustration: IllustrationKind;
  imageSrc?: string;
  imageAlt?: string;
  imageClassName?: string;
  mediaClassName?: string;
};

const programCards: readonly ProgramCard[] = [
  {
    number: "01",
    title: "Тренировки (дом + зал)",
    description:
      "Пошаговые тренировки для любого уровня. Можно заниматься дома или в зале.",
    illustration: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1576678927483-cc727957140c?w=800&h=600&fit=crop&q=85&auto=format",
    imageAlt: "Гантели рядом с ковриком для тренировки дома",
    imageClassName: "object-cover object-center scale-[1.06]",
  },
  {
    number: "02",
    title: "Питание без подсчёта калорий",
    description:
      "Простая и гибкая система питания, без жёстких ограничений.",
    illustration: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=450&fit=crop",
    imageAlt: "Здоровая еда",
  },
  {
    number: "03",
    title: "Пошаговый план на 12 недель",
    description:
      "Понятные этапы, которые помогут двигаться вперёд без откатов.",
    illustration: "notebook",
    mediaClassName: "bg-[#F0EDE8]",
  },
  {
    number: "04",
    title: "Видео-уроки и техника",
    description:
      "Подробные видео и инструкции для правильного выполнения упражнений.",
    illustration: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=450&fit=crop",
    imageAlt: "Телефон с видеоуроком",
  },
  {
    number: "05",
    title: "Поддержка и мотивация",
    description:
      "Вы не одна. Поддержка тренера и комьюнити на протяжении всей программы.",
    illustration: "photo",
    imageSrc:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=450&fit=crop",
    imageAlt: "Чашка кофе и дневник",
  },
];

function NotebookIllustration() {
  return (
    <svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden
    >
      <rect
        x="20"
        y="10"
        width="80"
        height="70"
        rx="4"
        fill="#E8E2D9"
        stroke="#C4956A"
        strokeWidth="2"
      />
      <rect x="20" y="10" width="80" height="16" rx="4" fill="#C4956A" />
      <line
        x1="35"
        y1="38"
        x2="85"
        y2="38"
        stroke="#3D3530"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="50"
        x2="85"
        y2="50"
        stroke="#3D3530"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="35"
        y1="62"
        x2="75"
        y2="62"
        stroke="#3D3530"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polyline
        points="35,38 39,42 47,34"
        stroke="#C4956A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="35,50 39,54 47,46"
        stroke="#C4956A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardMedia({ card }: { card: ProgramCard }) {
  const mediaClass = card.mediaClassName ?? "bg-[#E8E2D9]";

  return (
    <div className={`relative aspect-[4/3] overflow-hidden ${mediaClass}`}>
      {card.illustration === "notebook" && (
        <div className="flex h-full w-full items-center justify-center p-6">
          <NotebookIllustration />
        </div>
      )}
      {card.illustration === "photo" && card.imageSrc && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.imageSrc}
            alt={card.imageAlt ?? ""}
            className={`h-full w-full ${card.imageClassName ?? "object-cover"}`}
            loading="lazy"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3D3530]/15 via-transparent to-[#FAF8F4]/10"
            aria-hidden
          />
        </>
      )}
      <span className="absolute left-3 top-3 rounded-sm bg-white/75 px-1.5 py-0.5 text-xs font-medium tracking-wider text-[#C4956A] backdrop-blur-[2px]">
        {card.number}
      </span>
    </div>
  );
}

function ProgramFeatureCard({
  card,
  className = "",
}: {
  card: ProgramCard;
  className?: string;
}) {
  return (
    <article
      className={`overflow-hidden rounded-sm border border-[#E8E2D9] bg-white shadow-sm transition-all duration-200 hover:shadow-md ${className}`}
    >
      <CardMedia card={card} />
      <div className="p-4">
        <h3 className="text-base font-bold leading-snug text-[#1c1917]">{card.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#78716c]">
          {card.description}
        </p>
      </div>
    </article>
  );
}

export function CourseTimelineSection() {
  return (
    <section className="bg-[#FAF8F4] px-4 py-12 md:px-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-medium uppercase tracking-widest text-[#C4956A]">
          Программа курса
        </p>
        <h2 className="mt-2 text-3xl font-bold text-[#1c1917]">Что входит в программу</h2>
        <p className="mt-3 max-w-2xl text-base text-[#78716c]">
          5 модулей — от первой тренировки дома до уверенного зала
        </p>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {programCards.map((card, index) => (
            <li
              key={card.number}
              className={index === programCards.length - 1 ? "col-span-2 lg:col-span-1" : ""}
            >
              <ProgramFeatureCard card={card} className="h-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
