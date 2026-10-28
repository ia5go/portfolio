"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { parsePath } from "@/content/routes";
import { canAnimate } from "./effectsEnv";
import "./page-transition.css";

// Keep in sync with .page--leaving in page-transition.css (duration and easing).
export const LEAVE_MS = 480;
const LEAVE_EASE = [0.4, 0, 0.2, 1] as const;

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

/** The CSS `cubic-bezier(x1, y1, x2, y2)` timing function, at progress `x` (0 to 1). */
function cubicBezier([x1, y1, x2, y2]: readonly [number, number, number, number], x: number) {
  const at = (a: number, b: number, t: number) =>
    3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (at(x1, x2, mid) < x) lo = mid;
    else hi = mid;
  }
  return at(y1, y2, (lo + hi) / 2);
}

/** Opacity of a fading-out page `elapsed` ms after its fade-out started. */
export function leaveOpacityAt(elapsed: number): number {
  if (elapsed <= 0) return 1;
  if (elapsed >= LEAVE_MS) return 0;
  return 1 - cubicBezier(LEAVE_EASE, elapsed / LEAVE_MS);
}

/**
 * Fades the page content out, navigates, then fades the new content in, only when the
 * page changes. Switching language is not a page change: it happens in place, with the
 * texts scrambling (LocaleProvider). The background (grid floor and effects) lives
 * outside this wrapper and keeps animating throughout.
 *
 * Back and Forward are not clicks: they arrive with the normal fade-in. A fade-out
 * belongs to the URL it started on and ends as soon as the URL changes, however it
 * changes. Back pressed mid-fade drops the link's pending navigation, and the page it
 * lands on fades in from the opacity the fade-out had reached, so nothing jumps.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const pageRef = useRef<HTMLDivElement>(null);
  const pending = useRef<number | undefined>(undefined);
  // When the current fade-out started, and on which element.
  const leave = useRef<{ start: number; el: HTMLElement } | null>(null);
  // `leaving` belongs to `pathname`: a fade-out started by a link click on that URL.
  const [state, setState] = useState({ pathname, leaving: false });

  // The URL changed (link, Back/Forward, language switch): the old URL's fade-out is
  // over. Reset during render, so the new page's very first frame is already entering.
  let leaving = state.leaving;
  if (state.pathname !== pathname) {
    leaving = false;
    setState({ pathname, leaving: false });
  }

  // Any navigation still scheduled belongs to the URL that was just left.
  useLayoutEffect(() => {
    window.clearTimeout(pending.current);
    pending.current = undefined;
  }, [pathname]);
  useEffect(() => {
    const timer = pending;
    return () => window.clearTimeout(timer.current);
  }, []);

  // Before the first paint of a fade-in that cut a fade-out short, start it where the
  // fade-out stands now. The fade-out runs on the compositor, so it keeps going while
  // the new route renders: its opacity is computed from its start time, not read.
  const page = parsePath(pathname).page;
  useLayoutEffect(() => {
    const el = pageRef.current;
    if (!el) return;
    if (leaving) {
      leave.current ??= { start: performance.now(), el };
      return;
    }
    const left = leave.current;
    leave.current = null;
    if (!left) return;
    const from = leaveOpacityAt(performance.now() - left.start);
    if (from > 0) {
      el.style.setProperty("--page-from", String(from));
      // The interrupted page itself fades back in where it stands: no drift.
      if (left.el === el) el.style.setProperty("--page-drift", "0px");
    } else {
      el.style.removeProperty("--page-from");
      el.style.removeProperty("--page-drift");
    }
  }, [leaving, page]);

  useEffect(() => {
    const cancelPending = () => {
      window.clearTimeout(pending.current);
      pending.current = undefined;
    };
    const onClick = (e: MouseEvent) => {
      const target = internalTarget(e);
      if (!target) return;
      e.preventDefault();
      cancelPending();
      if (!canAnimate()) {
        router.push(target);
        return;
      }
      setState((s) => ({ ...s, leaving: true }));
      pending.current = window.setTimeout(() => {
        pending.current = undefined;
        router.push(target);
      }, LEAVE_MS);
    };
    // Back or Forward during a fade-out drops the link's navigation. When the URL path
    // changes, the reset above ends the fade-out; when only the hash changed, end it here.
    const onPopState = () => {
      cancelPending();
      const now = window.location.pathname;
      setState((s) => (s.leaving && s.pathname === now ? { ...s, leaving: false } : s));
    };
    // Back/forward cache restores the page as it was left: faded out. Show it again.
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      cancelPending();
      setState((s) => ({ ...s, leaving: false }));
    };
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router]);

  // Keyed by page, not by URL: switching language in place keeps the page mounted.
  return (
    <div
      key={page}
      ref={pageRef}
      className={leaving ? "page page--leaving" : "page page--entering"}
    >
      {children}
    </div>
  );
}
