"use client";

import { useEffect } from "react";

/** Прокрутка к якорю при загрузке (например, редирект /about → /#about) */
export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToHash();
    const t = window.setTimeout(scrollToHash, 100);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}
