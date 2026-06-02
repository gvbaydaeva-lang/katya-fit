"use client";

import { AnchorLink } from "@/components/public/AnchorLink";
import { AuthNav } from "@/components/public/AuthNav";
import { LANDING_NAV, LANDING_SECTIONS } from "@/lib/landing/anchors";
import { useEffect, useState } from "react";

export function PublicHeader() {
  const [activeSection, setActiveSection] = useState<string>(
    LANDING_SECTIONS.hero,
  );

  useEffect(() => {
    const ids = [LANDING_SECTIONS.hero, ...LANDING_NAV.map((n) => n.id)];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <AnchorLink
          sectionId={LANDING_SECTIONS.hero}
          className="text-lg font-semibold text-zinc-900"
        >
          Катя <span className="text-rose-600">Fit</span>
        </AnchorLink>
        <nav className="hidden items-center gap-1 text-sm md:flex">
          {LANDING_NAV.map((item) => (
            <AnchorLink
              key={item.id}
              sectionId={item.id}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                activeSection === item.id
                  ? "bg-rose-100 text-rose-800"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {item.label}
            </AnchorLink>
          ))}
        </nav>
        <AuthNav />
      </div>
    </header>
  );
}
