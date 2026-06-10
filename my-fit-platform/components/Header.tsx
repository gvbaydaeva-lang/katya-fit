"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/#about", label: "ОБО МНЕ" },
  { href: "/#programs", label: "ПРОГРАММЫ" },
  { href: "/#results", label: "ОТЗЫВЫ" },
  { href: "/#contact", label: "КОНТАКТЫ" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E2D9] bg-[#FAF8F4]/98 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tight text-stone-900">KATY D.</span>
          <span className="text-[8px] font-light text-stone-400 tracking-[0.25em] uppercase mt-0.5">FITNESS &amp; NUTRITION COACH</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-[11px] font-medium tracking-[0.15em] md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-stone-500 hover:text-stone-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/#contact"
          className="hidden rounded-sm bg-[#C4956A] px-6 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-white hover:bg-[#B07D54] transition-colors md:block"
        >
          ЗАПИСАТЬСЯ
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-stone-600"
          aria-label="Menu"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-[#E8E2D9] bg-[#FAF8F4] px-6 py-4 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm font-medium tracking-widest text-stone-600 hover:text-stone-900"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block text-center rounded-sm bg-[#C4956A] px-6 py-3 text-xs font-semibold tracking-[0.2em] text-white"
          >
            ЗАПИСАТЬСЯ
          </Link>
        </div>
      )}
    </header>
  );
}
