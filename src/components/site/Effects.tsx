"use client";

import { useEffect, useRef, useState } from "react";
import { shouldRunCursor } from "./effectsEnv";
import "./effects.css";

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

  useEffect(() => {
    setCursor(shouldRunCursor());
  }, []);

  return (
    <div className="fx" aria-hidden="true">
      <div className="fx-scanlines" />
      <div className="fx-grain" />
      {cursor && <Cursor />}
    </div>
  );
}
