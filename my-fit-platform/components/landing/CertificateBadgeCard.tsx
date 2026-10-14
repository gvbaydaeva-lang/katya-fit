"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useState } from "react";
import { CertificateLightbox } from "@/components/landing/CertificateLightbox";

type CertificateBadgeCardProps = {
  certificate: {
    src: StaticImageData;
    label: string;
    thumbnailFit?: "cover" | "contain";
  };
};

export function CertificateBadgeCard({ certificate }: CertificateBadgeCardProps) {
  const [open, setOpen] = useState(false);
  const thumbnailClassName =
    certificate.thumbnailFit === "contain"
      ? "bg-white object-contain"
      : "object-cover";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3 rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] px-3 py-2 text-left transition-shadow duration-300 hover:cursor-pointer hover:shadow-md"
        aria-label={`Открыть ${certificate.label}`}
      >
        <div className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-sm">
          <Image
            src={certificate.src}
            alt=""
            fill
            className={`${thumbnailClassName} transition-transform duration-300 group-hover:scale-105`}
            sizes="96px"
          />
        </div>
        <p className="text-[10px] leading-snug tracking-wide text-stone-500">
          {certificate.label}
        </p>
      </button>

      <CertificateLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={certificate.src}
        alt={certificate.label}
      />
    </>
  );
}
