"use client";

import { useEffect } from "react";

/** Прокрутка к якорю при загрузке (например, редирект /about → /#about) */
export function HashScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    scrollToHash();
    const t = window.setTimeout(scrollToHash, 100);
    const delayed = window.setTimeout(scrollToHash, 400);

    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(delayed);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
