"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parsePath } from "@/content/routes";
import { canAnimate } from "./effectsEnv";
import "./page-transition.css";

// Keep in sync with .page--leaving in page-transition.css.
export const LEAVE_MS = 480;

/** Internal route change that should fade out first, or null for anything else. */
function internalTarget(e: MouseEvent): string | null {
  if (e.defaultPrevented || e.button !== 0) return null;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as Element | null)?.closest?.("a");
  if (!a || a.target === "_blank" || a.hasAttribute("download")) return null;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === window.location.pathname) return null; // hash or same page
  return url.pathname + url.search + url.hash;
}

/**
 * Fades the page content out, navigates, then fades the new content in, only when the
 * page changes. Switching language is not a page change: it happens in place, with the
 * texts scrambling (LocaleProvider). The background (grid floor and effects) lives
 * outside this wrapper and keeps animating throughout.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [leavingFrom, setLeavingFrom] = useState<string | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = internalTarget(e);
      if (!target) return;
      e.preventDefault();
      if (!canAnimate()) {
        router.push(target);
        return;
      }
      setLeavingFrom(parsePath(window.location.pathname).page);
      window.setTimeout(() => router.push(target), LEAVE_MS);
    };
    // Back/forward cache restores the page as it was left: faded out. Show it again.
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setLeavingFrom(null);
    };
    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router]);

  // Keyed by page, not by URL: switching language in place keeps the page mounted.
  const page = parsePath(pathname).page;
  const leaving = leavingFrom === page;
  return (
    <div
      key={page}
      className={leaving ? "page page--leaving" : "page page--entering"}
    >
      {children}
    </div>
  );
}
