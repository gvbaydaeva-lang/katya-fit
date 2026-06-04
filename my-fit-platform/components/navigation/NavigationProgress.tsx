"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function currentPath() {
  return (
    window.location.pathname +
    (window.location.search ? window.location.search : "")
  );
}

function hrefToPath(href: string): string | null {
  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return null;
    return url.pathname + url.search;
  } catch {
    return null;
  }
}

/**
 * Тонкая полоса вверху viewport при client-side навигации (Link / router.push).
 * В SPA браузерная полоска в адресной строке часто не появляется — это стандартная замена.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(false);
  const routeKey = `${pathname}?${searchParams.toString()}`;
  const activeRef = useRef(false);

  const begin = () => {
    if (activeRef.current) return;
    activeRef.current = true;
    setActive(true);
  };

  const end = () => {
    activeRef.current = false;
    setActive(false);
  };

  useEffect(() => {
    end();
  }, [routeKey]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const anchor = (event.target as Element).closest("a");
      if (!anchor?.href) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#")) return;
      const next = hrefToPath(anchor.href);
      if (!next || next === currentPath()) return;
      begin();
    };

    const wrapHistory = (method: "pushState" | "replaceState") => {
      const original = history[method].bind(history);
      history[method] = (...args: Parameters<History["pushState"]>) => {
        const url = args[2];
        if (typeof url === "string") {
          const next = hrefToPath(url);
          if (next && next !== currentPath()) begin();
        }
        return original(...args);
      };
      return original;
    };

    const originalPush = wrapHistory("pushState");
    const originalReplace = wrapHistory("replaceState");

    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      history.pushState = originalPush;
      history.replaceState = originalReplace;
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className="navigation-progress pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-hidden"
      role="progressbar"
      aria-valuetext="Загрузка страницы"
      aria-busy="true"
    >
      <div className="navigation-progress-bar h-full w-full" />
    </div>
  );
}
