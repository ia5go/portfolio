"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DESKTOP_QUERY, matches } from "./effectsEnv";
import "./page-transition.css";

const LEAVE_MS = 320;

/** Desktop always animates; phones and touch devices respect reduced motion. */
function canAnimate(): boolean {
  return matches(DESKTOP_QUERY) || !matches("(prefers-reduced-motion: reduce)");
}

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
 * Fades the page content out, navigates, then fades the new content in. The background
 * (grid floor and effects) lives outside this wrapper and keeps animating throughout.
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
      setLeavingFrom(window.location.pathname);
      window.setTimeout(() => router.push(target), LEAVE_MS);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  const leaving = leavingFrom === pathname;
  return (
    <div
      key={pathname}
      className={leaving ? "page page--leaving" : "page page--entering"}
    >
      {children}
    </div>
  );
}
