"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type ClientResult = {
  name?: string;
  profession?: string;
  quote?: string;
  period?: string;
  stats: readonly string[];
  image: import("next/image").StaticImageData;
  alt: string;
};

function getClientKey(client: ClientResult) {
  return client.alt;
}

function CoverImage({
  src,
  alt,
  sizes,
}: {
  src: import("next/image").StaticImageData;
  alt: string;
  sizes: string;
}) {
  return (
    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={sizes}
        draggable={false}
      />
    </div>
  );
}

function ResultCardBody({ client }: { client: ClientResult }) {
  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0">
        {client.name ? (
          <p className="text-xs font-semibold text-stone-900">{client.name}</p>
        ) : null}
        {client.profession ? (
          <p className="mt-0.5 text-[11px] leading-snug text-stone-500 sm:text-xs">
            {client.profession}
          </p>
        ) : null}
      </div>
      <div className="mt-2 h-[9.75rem] sm:h-[10rem]">
        {client.quote ? (
          <p className="text-[11px] leading-relaxed text-stone-500 italic break-words sm:text-xs">
            {client.quote}
          </p>
        ) : null}
      </div>
      <div className="mt-3 shrink-0">
        <p className="text-[11px] font-bold text-[#C4956A] sm:text-xs">
          {client.period ? `Результат за ${client.period}:` : "Результат:"}
        </p>
        <ul className="mt-1 space-y-0.5">
          {client.stats.map((stat) => (
            <li
              key={stat}
              className="text-[11px] leading-snug text-stone-600 break-words sm:text-xs"
            >
              {stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ResultCard({
  client,
  className = "",
}: {
  client: ClientResult;
  className?: string;
}) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] ${className}`}
    >
      <div className="shrink-0 p-2">
        <CoverImage src={client.image} alt={client.alt} sizes="(max-width: 1024px) 78vw, 220px" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-5 pt-1 sm:px-4">
        <ResultCardBody client={client} />
      </div>
    </article>
  );
}

type ClientResultsCarouselProps = {
  clients: readonly ClientResult[];
};

export function ClientResultsCarousel({ clients }: ClientResultsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;

    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateActiveIndex();
    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      track.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, [updateActiveIndex, clients.length]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.children[index] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const next = Math.min(clients.length - 1, Math.max(0, activeIndex + direction));
    scrollToIndex(next);
  }, [activeIndex, clients.length, scrollToIndex]);

  const endDrag = useCallback(() => {
    dragState.current.active = false;
    setIsDragging(false);
  }, []);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
    };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active || event.pointerType !== "mouse") return;

    event.preventDefault();
    const delta = event.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - delta;
  }, []);

  const onPointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      trackRef.current?.releasePointerCapture(event.pointerId);
      endDrag();
      updateActiveIndex();
    },
    [endDrag, updateActiveIndex],
  );

  return (
    <div className="relative mt-12">
      {/* Десктоп: сетка с одинаковой высотой карточек */}
      <div className="hidden items-stretch gap-4 lg:grid lg:grid-cols-5">
        {clients.map((client) => (
          <ResultCard key={getClientKey(client)} client={client} />
        ))}
      </div>

      {/* Мобильная и планшетная карусель с peek */}
      <div className="lg:hidden">
        <div className="relative -mx-6 px-6">
          <div
            ref={trackRef}
            role="region"
            aria-label="Результаты клиенток"
            aria-roledescription="карусель"
            className={`flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isDragging ? "cursor-grabbing select-none" : "cursor-grab"
            }`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={endDrag}
            onLostPointerCapture={endDrag}
          >
            {clients.map((client) => (
              <ResultCard
                key={getClientKey(client)}
                client={client}
                className="w-[min(78vw,300px)] shrink-0 self-stretch snap-start"
              />
            ))}
            <div className="w-4 shrink-0 snap-none" aria-hidden />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={activeIndex === 0}
            aria-label="Предыдущая карточка"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#E8E2D9] text-stone-500 transition-colors hover:border-[#C4956A] hover:text-[#C4956A] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4956A]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Слайды результатов">
            {clients.map((client, index) => (
              <button
                key={getClientKey(client)}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`Карточка ${index + 1} из ${clients.length}`}
                onClick={() => scrollToIndex(index)}
                className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4956A] ${
                  activeIndex === index
                    ? "w-6 bg-[#C4956A]"
                    : "w-2 bg-[#E8E2D9] hover:bg-stone-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={activeIndex === clients.length - 1}
            aria-label="Следующая карточка"
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#E8E2D9] text-stone-500 transition-colors hover:border-[#C4956A] hover:text-[#C4956A] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4956A]"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
