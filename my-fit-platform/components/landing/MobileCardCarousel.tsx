"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type MobileCardCarouselProps<T> = {
  items: readonly T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  ariaLabel: string;
  className?: string;
  trackClassName?: string;
  itemClassName?: string;
};

export function MobileCardCarousel<T>({
  items,
  getKey,
  renderItem,
  ariaLabel,
  className = "",
  trackClassName = "",
  itemClassName = "",
}: MobileCardCarouselProps<T>) {
  const trackRef = useRef<HTMLUListElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-mobile-carousel-card]"),
    );
    if (!cards.length) return;

    const trackLeft = track.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>(
      "[data-mobile-carousel-card]",
    )[index];
    if (!track || !card) return;

    const left =
      card.getBoundingClientRect().left -
      track.getBoundingClientRect().left +
      track.scrollLeft;

    track.scrollTo({ left, top: 0, behavior: "smooth" });
  }, []);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const nextIndex = Math.min(
        items.length - 1,
        Math.max(0, activeIndex + direction),
      );
      scrollToIndex(nextIndex);
    },
    [activeIndex, items.length, scrollToIndex],
  );

  const endDrag = useCallback(() => {
    dragState.current.active = false;
    setIsDragging(false);
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLUListElement>) => {
      setIsPaused(true);

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
    },
    [],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLUListElement>) => {
      const track = trackRef.current;
      if (!track || !dragState.current.active || event.pointerType !== "mouse") {
        return;
      }

      event.preventDefault();
      track.scrollLeft =
        dragState.current.scrollLeft - (event.clientX - dragState.current.startX);
    },
    [],
  );

  const handlePointerUp = useCallback(
    (event: React.PointerEvent<HTMLUListElement>) => {
      const track = trackRef.current;
      if (track?.hasPointerCapture(event.pointerId)) {
        track.releasePointerCapture(event.pointerId);
      }
      endDrag();
      setIsPaused(false);
      updateActiveIndex();
    },
    [endDrag, updateActiveIndex],
  );

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
  }, [updateActiveIndex]);

  useEffect(() => {
    if (isPaused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      const nextIndex =
        activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      scrollToIndex(nextIndex);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [activeIndex, isPaused, items.length, scrollToIndex]);

  return (
    <div className={className}>
      <ul
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="карусель"
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 touch-pan-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        } ${trackClassName}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          endDrag();
          setIsPaused(false);
        }}
        onLostPointerCapture={() => {
          endDrag();
          setIsPaused(false);
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {items.map((item) => (
          <li
            key={getKey(item)}
            data-mobile-carousel-card
            className={`shrink-0 snap-start ${itemClassName}`}
          >
            {renderItem(item)}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={activeIndex === 0}
          aria-label="Предыдущая карточка"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#E8E2D9] text-stone-500 transition-colors hover:border-[#C4956A] hover:text-[#C4956A] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4956A]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>

        <div className="flex items-center gap-1" role="tablist" aria-label="Карточки">
          {items.map((item, index) => (
            <button
              key={getKey(item)}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-label={`Карточка ${index + 1} из ${items.length}`}
              onClick={() => scrollToIndex(index)}
              className="inline-flex h-11 w-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4956A]"
            >
              <span
                aria-hidden
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-6 bg-[#C4956A]"
                    : "w-2 bg-[#E8E2D9]"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={activeIndex === items.length - 1}
          aria-label="Следующая карточка"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-[#E8E2D9] text-stone-500 transition-colors hover:border-[#C4956A] hover:text-[#C4956A] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4956A]"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
