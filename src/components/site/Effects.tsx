"use client";

import { useEffect, useRef, useState } from "react";
import { DESKTOP_QUERY, matches, shouldRunCursor } from "./effectsEnv";
import "./effects.css";

const STAR_COUNT = 120;

type Star = {
  size: number;
  dur: number;
  minOp: number;
  left: number;
  top: number;
  delay: number;
};

function makeStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    size: Math.random() * 2 + 0.5,
    dur: Math.random() * 4 + 2,
    minOp: Math.random() * 0.2 + 0.05,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
  }));
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
  const [stars, setStars] = useState<Star[]>([]);
  const [cursor, setCursor] = useState(false);

  useEffect(() => {
    if (matches(DESKTOP_QUERY)) setStars(makeStars());
    setCursor(shouldRunCursor());
  }, []);

  return (
    <div className="fx" aria-hidden="true">
      <div className="fx-scanlines" />
      <div className="fx-grain" />
      <div className="fx-stars">
        {stars.map((s, i) => (
          <span
            key={i}
            className="fx-star"
            style={
              {
                width: s.size,
                height: s.size,
                left: `${s.left}%`,
                top: `${s.top}%`,
                animationDelay: `${s.delay}s`,
                "--d": `${s.dur}s`,
                "--min-op": s.minOp,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="fx-circles">
        <span className="fx-circle" />
        <span className="fx-circle" />
        <span className="fx-circle" />
      </div>
      {cursor && <Cursor />}
    </div>
  );
}
