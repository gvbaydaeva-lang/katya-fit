"use client";

import Image, { type StaticImageData } from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type CertificateLightboxProps = {
  open: boolean;
  onClose: () => void;
  src: StaticImageData;
  alt: string;
};

export function CertificateLightbox({
  open,
  onClose,
  src,
  alt,
}: CertificateLightboxProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setVisible(true));
    document.body.classList.add("overflow-hidden");

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center px-4 transition-opacity duration-300 ease-out ${
        visible ? "bg-black/80 opacity-100" : "bg-black/80 opacity-0"
      }`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <div
        className={`relative w-full max-w-3xl rounded-sm bg-[#FAF8F4] p-3 shadow-2xl transition-all duration-300 ease-out sm:p-4 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 z-10 rounded-sm p-1.5 text-[#1c1917] transition-colors hover:text-[#C4956A] sm:right-3 sm:top-3"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="flex max-h-[85vh] items-center justify-center pt-6 sm:pt-0">
          <Image
            src={src}
            alt={alt}
            width={src.width}
            height={src.height}
            className="h-auto w-full max-h-[calc(85vh-3rem)] object-contain"
            sizes="(max-width: 768px) calc(100vw - 32px), 768px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
