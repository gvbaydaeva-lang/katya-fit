import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { LANDING_HERO_OBJECT_ONLINE } from "@/components/landing/landing-hero-styles";

type ProgramLandingHeroProps = {
  image: import("next/image").StaticImageData;
  imageAlt: string;
  imageObjectPosition?: string;
  imageMask?: CSSProperties;
  imageOverlay?: ReactNode;
  /** left — фото слева (онлайн), right — фото справа (дом в зал) */
  imagePosition?: "left" | "right";
  /** spread — равномерно распределить два блока children по высоте колонки на lg */
  contentLayout?: "start" | "spread";
  /** Мягкое растворение краёв фото в фон #FAF8F4 */
  imageEdgeFade?: boolean;
  children: ReactNode;
  imagePriority?: boolean;
};

function HeroPhotoEdgeFade() {
  return (
    <>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[48%] bg-gradient-to-r from-[#FAF8F4] from-5% via-[#FAF8F4]/75 via-35% to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[5%] bg-gradient-to-b from-[#FAF8F4] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[5%] bg-gradient-to-t from-[#FAF8F4] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-[6%] bg-gradient-to-l from-[#FAF8F4]/50 to-transparent" />
    </>
  );
}

/** Общая сетка hero для программных лендингов: пропорции колонок 1:1, aspect 3:4 */
export function ProgramLandingHero({
  image,
  imageAlt,
  imageObjectPosition = LANDING_HERO_OBJECT_ONLINE,
  imageMask,
  imageOverlay,
  imagePosition = "left",
  contentLayout = "start",
  imageEdgeFade = false,
  children,
  imagePriority = true,
}: ProgramLandingHeroProps) {
  const imageOrder =
    imagePosition === "right" ? "order-2 lg:order-2" : "order-1 lg:order-1";
  const textOrder =
    imagePosition === "right" ? "order-1 lg:order-1" : "order-2 lg:order-2";

  const textColumnClass =
    contentLayout === "spread"
      ? `${textOrder} flex h-full flex-col justify-start gap-8 lg:justify-between lg:gap-0`
      : `${textOrder} lg:h-full`;

  return (
    <section className="overflow-hidden bg-[#FAF8F4]">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
          <div
            className={`relative mx-auto w-full max-w-md lg:max-w-none ${imageOrder}`}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className={`object-cover ${imageObjectPosition}`}
                style={imageMask}
                priority={imagePriority}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {imageEdgeFade && <HeroPhotoEdgeFade />}
              {imageOverlay}
            </div>
          </div>
          <div className={textColumnClass}>{children}</div>
        </div>
      </div>
    </section>
  );
}
