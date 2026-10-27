"use client";

import { useEffect, useRef, useState } from "react";
import { DESKTOP_QUERY, matches, shouldRunCursor } from "./effectsEnv";
import "./effects.css";

// Film grain: fractal noise, extremely faint (it lifts pixels by 1-2 levels of 255).
const GRAIN_SVG =
  "<svg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'><filter id='noise'>" +
  "<feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/>" +
  "</filter><rect width='100%' height='100%' filter='url(#noise)' opacity='0.03'/></svg>";
const GRAIN_TILE_PX = 512;

/**
 * Renders the grain's SVG noise into a PNG once and uses that as the background. As a
 * live SVG background its filter re-runs whenever the page under it repaints, which
 * stalled frames for 200ms+ while texts change (the language scramble).
 */
function useGrainTile(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !matches(DESKTOP_QUERY)) return;
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = GRAIN_TILE_PX;
        canvas.getContext("2d")?.drawImage(img, 0, 0, GRAIN_TILE_PX, GRAIN_TILE_PX);
        el.style.backgroundImage = `url(${canvas.toDataURL("image/png")})`;
      } catch {
        // Canvas unavailable: the page simply goes without grain.
      }
    };
    img.src = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;
  }, [ref]);
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("has-custom-cursor");
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0,
      raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const tick = () => {
      if (dot.current) {
        dot.current.style.left = `${mx}px`;
        dot.current.style.top = `${my}px`;
      }
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) {
        ring.current.style.left = `${rx}px`;
        ring.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="fx-cursor" data-testid="fx-cursor" />
      <div ref={ring} className="fx-cursor-ring" />
    </>
  );
}

/** Decorative desktop-only vaporwave layers. Hidden by CSS on touch/narrow screens. */
export function Effects() {
  const [cursor, setCursor] = useState(false);
  const grain = useRef<HTMLDivElement>(null);
  useGrainTile(grain);

  useEffect(() => {
    setCursor(shouldRunCursor());
  }, []);

  return (
    <div className="fx" aria-hidden="true">
      <div className="fx-scanlines" />
      <div ref={grain} className="fx-grain" />
      {cursor && <Cursor />}
    </div>
  );
}
