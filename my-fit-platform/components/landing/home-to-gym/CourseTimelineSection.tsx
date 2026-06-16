type IllustrationKind = "dumbbells" | "notebook" | "photo";

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
    illustration: "dumbbells",
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

function DumbbellsSceneIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#2c2420" }}>
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <defs>
          <radialGradient id="bg1" cx="30%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#3d2e28" />
            <stop offset="100%" stopColor="#1a1210" />
          </radialGradient>
          <radialGradient id="dumbbellShine" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#e8c080" />
            <stop offset="50%" stopColor="#C4956A" />
            <stop offset="100%" stopColor="#8a5c30" />
          </radialGradient>
          <radialGradient id="matGrad" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#2a7a5a" />
            <stop offset="100%" stopColor="#0f4030" />
          </radialGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.5" />
          </filter>
          <filter id="softglow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="400" height="260" fill="url(#bg1)" />

        <circle cx="50" cy="50" r="45" fill="#C4956A" opacity="0.08" />
        <circle cx="360" cy="40" r="60" fill="#C4956A" opacity="0.05" />
        <circle cx="320" cy="200" r="35" fill="#C4956A" opacity="0.06" />
        <circle cx="80" cy="210" r="25" fill="#fff" opacity="0.02" />

        <ellipse cx="200" cy="210" rx="185" ry="28" fill="#000" opacity="0.4" />
        <path d="M20 185 Q200 175 380 185 L370 215 Q200 225 30 215 Z" fill="url(#matGrad)" opacity="0.95" />
        <path d="M60 175 L55 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M90 174 L86 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M120 173 L117 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M150 172 L148 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M180 172 L178 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M210 172 L208 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M240 172 L238 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M270 173 L268 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M300 174 L298 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M330 175 L328 220" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M355 177 L353 218" stroke="#1a9060" strokeWidth="0.8" opacity="0.5" />
        <path d="M20 185 Q200 175 380 185" fill="none" stroke="#2aaa70" strokeWidth="2" opacity="0.6" />
        <path d="M30 215 Q200 225 370 215" fill="none" stroke="#0a3025" strokeWidth="2" opacity="0.6" />

        <ellipse cx="118" cy="192" rx="70" ry="9" fill="#000" opacity="0.35" />
        <ellipse cx="282" cy="185" rx="70" ry="9" fill="#000" opacity="0.35" />

        <g transform="rotate(-20, 118, 155)" filter="url(#shadow)">
          <rect x="42" y="130" width="22" height="50" rx="5" fill="#7a5020" />
          <rect x="44" y="131" width="18" height="48" rx="4" fill="url(#dumbbellShine)" />
          <rect x="44" y="131" width="6" height="48" rx="3" fill="#e8c080" opacity="0.25" />
          <rect x="58" y="131" width="2" height="48" fill="#6a4010" opacity="0.3" />
          <rect x="64" y="136" width="14" height="38" rx="3" fill="#8a5828" />
          <rect x="65" y="137" width="12" height="36" rx="2" fill="#C4956A" />
          <rect x="65" y="137" width="4" height="36" rx="2" fill="#e0a860" opacity="0.3" />
          <rect x="78" y="143" width="76" height="18" rx="4" fill="#5a3a18" />
          <rect x="79" y="144" width="74" height="16" rx="3" fill="#7a5228" />
          <rect x="88" y="144" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="98" y="144" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="108" y="144" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="118" y="144" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="128" y="144" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="138" y="144" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="148" y="144" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="79" y="144" width="74" height="4" rx="2" fill="#c09050" opacity="0.2" />
          <rect x="154" y="136" width="14" height="38" rx="3" fill="#8a5828" />
          <rect x="155" y="137" width="12" height="36" rx="2" fill="#C4956A" />
          <rect x="155" y="137" width="4" height="36" rx="2" fill="#e0a860" opacity="0.3" />
          <rect x="168" y="130" width="22" height="50" rx="5" fill="#7a5020" />
          <rect x="169" y="131" width="18" height="48" rx="4" fill="url(#dumbbellShine)" />
          <rect x="169" y="131" width="6" height="48" rx="3" fill="#e8c080" opacity="0.2" />
        </g>

        <g transform="rotate(18, 282, 140)" filter="url(#shadow)">
          <rect x="206" y="112" width="22" height="50" rx="5" fill="#7a5020" />
          <rect x="208" y="113" width="18" height="48" rx="4" fill="url(#dumbbellShine)" />
          <rect x="208" y="113" width="6" height="48" rx="3" fill="#e8c080" opacity="0.25" />
          <rect x="222" y="113" width="2" height="48" fill="#6a4010" opacity="0.3" />
          <rect x="228" y="118" width="14" height="38" rx="3" fill="#8a5828" />
          <rect x="229" y="119" width="12" height="36" rx="2" fill="#C4956A" />
          <rect x="229" y="119" width="4" height="36" rx="2" fill="#e0a860" opacity="0.3" />
          <rect x="242" y="125" width="76" height="18" rx="4" fill="#5a3a18" />
          <rect x="243" y="126" width="74" height="16" rx="3" fill="#7a5228" />
          <rect x="252" y="126" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="262" y="126" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="272" y="126" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="282" y="126" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="292" y="126" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="302" y="126" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="312" y="126" width="3" height="16" rx="1" fill="#4a2a10" opacity="0.7" />
          <rect x="243" y="126" width="74" height="4" rx="2" fill="#c09050" opacity="0.2" />
          <rect x="318" y="118" width="14" height="38" rx="3" fill="#8a5828" />
          <rect x="319" y="119" width="12" height="36" rx="2" fill="#C4956A" />
          <rect x="319" y="119" width="4" height="36" rx="2" fill="#e0a860" opacity="0.3" />
          <rect x="332" y="112" width="22" height="50" rx="5" fill="#7a5020" />
          <rect x="333" y="113" width="18" height="48" rx="4" fill="url(#dumbbellShine)" />
          <rect x="333" y="113" width="6" height="48" rx="3" fill="#e8c080" opacity="0.2" />
        </g>
      </svg>
    </div>
  );
}

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
      {card.illustration === "dumbbells" && <DumbbellsSceneIllustration />}
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
