"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useCallback, useRef, useState } from "react";

export type ClientResult = {
  name?: string;
  profession?: string;
  quote?: string;
  period?: string;
  stats: readonly string[];
  image: import("next/image").StaticImageData;
  alt: string;
};

function CoverImage({
  src,
  alt,
  aspectClass,
  sizes,
}: {
  src: import("next/image").StaticImageData;
  alt: string;
  aspectClass: string;
  sizes: string;
}) {
  return (
    <div className={`relative w-full shrink-0 overflow-hidden ${aspectClass}`}>
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

function ResultCard({
  image,
  alt,
  children,
}: {
  image: import("next/image").StaticImageData;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className="flex h-full w-[min(85vw,300px)] shrink-0 snap-start flex-col overflow-hidden rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] sm:w-[min(42vw,300px)] lg:w-[280px]">
      <div className="shrink-0 p-2">
        <CoverImage
          src={image}
          alt={alt}
          aspectClass="aspect-[4/3] rounded-sm"
          sizes="280px"
        />
      </div>
      <div className="min-w-0 flex-1 px-2 pb-5 pt-1">{children}</div>
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
    },
    [endDrag],
  );

  return (
    <div className="relative mt-12">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-12"
        aria-hidden
      />

      <div
        ref={trackRef}
        role="region"
        aria-label="Результаты клиенток"
        className={`client-results-track flex gap-6 overflow-x-auto overscroll-x-contain px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
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
            key={client.alt}
            image={client.image}
            alt={client.alt}
          >
            {client.name ? (
              <p className="text-xs font-semibold text-stone-900">{client.name}</p>
            ) : null}
            {client.profession ? (
              <p className="mt-0.5 text-[11px] text-stone-500 leading-snug sm:text-xs">
                {client.profession}
              </p>
            ) : null}
            {client.quote ? (
              <p className="mt-2 text-[11px] text-stone-500 leading-relaxed italic break-words sm:text-xs">
                {client.quote}
              </p>
            ) : null}
            <p
              className={`text-[11px] font-bold text-[#C4956A] sm:text-xs ${
                client.quote || client.name ? "mt-3" : "mt-1"
              }`}
            >
              {client.period ? `Результат за ${client.period}:` : "Результат:"}
            </p>
            <ul className="mt-1 space-y-0.5">
              {client.stats.map((stat) => (
                <li
                  key={stat}
                  className="text-[11px] text-stone-600 leading-snug break-words sm:text-xs"
                >
                  {stat}
                </li>
              ))}
            </ul>
          </ResultCard>
        ))}
      </div>
    </div>
  );
}
