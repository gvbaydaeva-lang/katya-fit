"use client";

import Image from "next/image";
import { useState } from "react";
import katyaCertificate from "@/public/images/katya-certificate.jpg";
import { CertificateLightbox } from "@/components/landing/CertificateLightbox";

export function CertificateBadgeCard() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex items-center gap-3 rounded-sm border border-[#E8E2D9] bg-[#FAF8F4] px-3 py-2 text-left transition-shadow duration-300 hover:cursor-pointer hover:shadow-md"
        aria-label="Открыть сертификат Henselmans PT"
      >
        <div className="relative aspect-[4/3] w-16 shrink-0 overflow-hidden rounded-sm">
          <Image
            src={katyaCertificate}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
        <p className="text-[10px] leading-snug tracking-wide text-stone-500">
          Сертификат Henselmans PT
        </p>
      </button>

      <CertificateLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={katyaCertificate}
        alt="Сертификат Henselmans PT"
      />
    </>
  );
}
