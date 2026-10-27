"use client";

import { useEffect, useRef } from "react";
import { canAnimate, DESKTOP_QUERY } from "@/components/site/effectsEnv";

export type ContactLink = {
  /** Stable key: the label and href change with the language. */
  id: string;
  /** Visible text: the label only. */
  label: string;
  /** Accessible name; starts with the label. */
  name: string;
  href: string;
  external?: boolean;
};

/** How long the highlight rests on each button, and how long one move takes. */
export const REST_MS = 2000;
export const MOVE_MS = 480;

export type Rect = { x: number; y: number; w: number; h: number };

/** Same curve as the PT|EN thumb, cubic-bezier(0.65, 0, 0.35, 1), in closed form. */
export function easeInOut(t: number): number {
  const k = Math.min(1, Math.max(0, t));
  return k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
}

export function lerpRect(a: Rect, b: Rect, k: number): Rect {
  return {
    x: a.x + (b.x - a.x) * k,
    y: a.y + (b.y - a.y) * k,
    w: a.w + (b.w - a.w) * k,
    h: a.h + (b.h - a.h) * k,
  };
}

/** The part of `target` the box covers, in `target`'s own coordinates (empty: w = h = 0). */
export function overlap(box: Rect, target: Rect): Rect {
  const x = Math.max(box.x, target.x);
  const y = Math.max(box.y, target.y);
  const w = Math.min(box.x + box.w, target.x + target.w) - x;
  const h = Math.min(box.y + box.h, target.y + target.h) - y;
  if (w <= 0 || h <= 0) return { x: 0, y: 0, w: 0, h: 0 };
  return { x: x - target.x, y: y - target.y, w, h };
}

/**
 * Back and forth: the box only ever moves to a neighbouring button and turns around at
 * either end (0 1 2 3 2 1 0 1 ...), so it never sweeps across the whole row.
 */
export function nextStep(from: number, dir: 1 | -1, count: number): { to: number; dir: 1 | -1 } {
  if (count < 2) return { to: from, dir };
  const turn = from + dir < 0 || from + dir >= count;
  const d = (turn ? -dir : dir) as 1 | -1;
  return { to: from + d, dir: d };
}

/**
 * Contact buttons with a Magenta highlight box behind them that moves back and forth
 * between neighbouring buttons: it rests REST_MS on each, then glides there in MOVE_MS, eased
 * in and out, in 2D when the buttons wrap into a grid. Each frame the box is placed
 * between the measured rectangles of the two buttons. The box is layered above the
 * buttons' cyan outlines and below their labels, and every label is told which part of
 * it the box covers (`--ink-x/y/w/h`): that part of the text is painted dark, the rest
 * stays cyan. So a label changes colour exactly where and while the box passes under
 * it, as on the PT|EN toggle, without ever being dark on the dark background.
 *
 * The cycle waits while the pointer is over the group, a button has focus, the group
 * is off-screen or the tab is hidden, and on phones that ask for reduced motion
 * (desktop always animates, see effectsEnv). A move already under way always lands.
 * Without JavaScript the first button is drawn lit by CSS, where the box starts.
 */
export function ContactLinks({ links }: { links: ContactLink[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLSpanElement>(null);
  const count = links.length;

  useEffect(() => {
    const root = rootRef.current;
    const box = boxRef.current;
    if (!root || !box || count === 0) return;
    const anchors = Array.from(root.querySelectorAll<HTMLAnchorElement>(".contact-links__link"));
    const labels = anchors.map((a) => a.querySelector<HTMLElement>(".contact-links__label")!);

    let rects: { link: Rect; label: Rect }[] = [];
    let from = 0;
    let to = 0;
    let dir: 1 | -1 = 1;
    let moveStart: number | null = null;
    let moving = false;
    let raf = 0;
    let rest: ReturnType<typeof setTimeout> | undefined;
    const paused = { hover: false, focus: false, offscreen: false, hidden: document.hidden };

    const relative = (r: DOMRect, origin: DOMRect): Rect => ({
      x: r.left - origin.left,
      y: r.top - origin.top,
      w: r.width,
      h: r.height,
    });

    const measure = () => {
      const origin = root.getBoundingClientRect();
      rects = anchors.map((a, i) => ({
        link: relative(a.getBoundingClientRect(), origin),
        label: relative(labels[i].getBoundingClientRect(), origin),
      }));
    };

    const paint = (r: Rect) => {
      box.style.transform = `translate(${r.x}px, ${r.y}px)`;
      box.style.width = `${r.w}px`;
      box.style.height = `${r.h}px`;
      labels.forEach((label, i) => {
        const o = overlap(r, rects[i].label);
        label.style.setProperty("--ink-x", `${o.x.toFixed(2)}px`);
        label.style.setProperty("--ink-y", `${o.y.toFixed(2)}px`);
        label.style.setProperty("--ink-w", `${o.w.toFixed(2)}px`);
        label.style.setProperty("--ink-h", `${o.h.toFixed(2)}px`);
      });
    };

    const isPaused = () =>
      paused.hover || paused.focus || paused.offscreen || paused.hidden || !canAnimate();

    const schedule = () => {
      clearTimeout(rest);
      rest = undefined;
      if (moving || isPaused() || count < 2) return;
      rest = setTimeout(step, REST_MS);
    };

    const frame = (now: number) => {
      if (moveStart === null) moveStart = now;
      const k = Math.min(1, (now - moveStart) / MOVE_MS);
      paint(lerpRect(rects[from].link, rects[to].link, easeInOut(k)));
      if (k < 1) {
        raf = requestAnimationFrame(frame);
        return;
      }
      moving = false;
      from = to;
      schedule();
    };

    function step() {
      rest = undefined;
      if (isPaused()) return;
      ({ to, dir } = nextStep(from, dir, count));
      moving = true;
      moveStart = null;
      raf = requestAnimationFrame(frame);
    }

    const setPaused = (key: keyof typeof paused, value: boolean) => {
      if (paused[key] === value) return;
      paused[key] = value;
      // Resuming always starts a full rest, so the box never leaves the moment the
      // pointer or focus leaves.
      if (isPaused()) {
        clearTimeout(rest);
        rest = undefined;
      } else schedule();
    };

    // Rest position: follows the layout at once (resize, wrap, font load, language).
    const relayout = () => {
      measure();
      if (!moving) paint(rects[from].link);
    };
    relayout();
    root.dataset.ready = "";

    const resize = typeof ResizeObserver === "function" ? new ResizeObserver(relayout) : null;
    resize?.observe(root);
    labels.forEach((l) => resize?.observe(l));
    window.addEventListener("resize", relayout);
    document.fonts?.ready.then(() => relayout()).catch(() => {});

    const view =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver(([entry]) => setPaused("offscreen", !entry.isIntersecting))
        : null;
    view?.observe(root);

    const onVisibility = () => setPaused("hidden", document.hidden);
    const onEnter = () => setPaused("hover", true);
    const onLeave = () => setPaused("hover", false);
    const onFocusIn = () => setPaused("focus", true);
    const onFocusOut = (e: FocusEvent) =>
      setPaused("focus", root.contains(e.relatedTarget as Node | null));
    document.addEventListener("visibilitychange", onVisibility);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);

    // Crossing into desktop (or turning reduced motion off) starts the cycle.
    const queries =
      typeof window.matchMedia === "function"
        ? [DESKTOP_QUERY, "(prefers-reduced-motion: reduce)"].map((q) => window.matchMedia(q))
        : [];
    const onQuery = () => (isPaused() ? clearTimeout(rest) : schedule());
    queries.forEach((q) => q.addEventListener?.("change", onQuery));

    schedule();

    return () => {
      clearTimeout(rest);
      cancelAnimationFrame(raf);
      resize?.disconnect();
      view?.disconnect();
      window.removeEventListener("resize", relayout);
      document.removeEventListener("visibilitychange", onVisibility);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      queries.forEach((q) => q.removeEventListener?.("change", onQuery));
    };
  }, [count]);

  return (
    <div ref={rootRef} className="contact-links">
      <span ref={boxRef} className="contact-links__box" aria-hidden="true" />
      <ul className="contact-links__list">
        {links.map((link) => (
          <li key={link.id} className="contact-links__item">
            <a
              className="contact-links__link"
              href={link.href}
              aria-label={link.name}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="contact-links__label">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
