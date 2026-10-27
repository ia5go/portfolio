"use client";

import { useEffect, useState } from "react";
import "./brand-mark.css";

/** Wait before the name unfolds from its initials on the first page of a visit. */
export const INTRO_DELAY_MS = 4000;
/** Later page changes in the same visit unfold right after the page fades in. */
export const REPEAT_DELAY_MS = 700;
/** Scrolled past this, the name folds back into its initials. */
export const COLLAPSE_SCROLL_Y = 24;

// "This visit" spans client-side page changes (module scope) and full reloads such as
// switching language (sessionStorage, which can be blocked: then module scope alone).
const INTRO_KEY = "brand-intro-played";
let introPlayed = false;

function hasIntroPlayed(): boolean {
  if (introPlayed) return true;
  try {
    return window.sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroPlayed() {
  introPlayed = true;
  try {
    window.sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // Storage blocked: module scope still covers client-side page changes.
  }
}

function splitWords(name: string) {
  return name.split(" ").map((word) => ({ initial: word.slice(0, 1), rest: word.slice(1) }));
}

/**
 * Header brand: shows the initials (IB), then the rest of each word slides out from
 * behind its initial (Iago Benvindo). Scrolling down folds it back; the top unfolds it.
 */
export function BrandMark({ name, href }: { name: string; href: string }) {
  const [ready, setReady] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(
      () => {
        markIntroPlayed();
        setReady(true);
      },
      hasIntroPlayed() ? REPEAT_DELAY_MS : INTRO_DELAY_MS,
    );
    const onScroll = () => setAtTop(window.scrollY <= COLLAPSE_SCROLL_Y);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const words = splitWords(name);

  return (
    <a
      className="site-nav__brand brand-mark"
      href={href}
      aria-label={name}
      data-expanded={ready && atTop}
    >
      {/* Invisible full name: reserves the open width so nothing else in the header moves. */}
      <span className="brand-mark__ghost" aria-hidden="true">
        {words.map((w) => (
          <span key={w.initial + w.rest} className="brand-mark__word">
            <span className="brand-mark__initial">{w.initial}</span>
            <span className="brand-mark__rest">{w.rest}</span>
          </span>
        ))}
      </span>
      <span className="brand-mark__live" aria-hidden="true">
        {words.map((w) => (
          <span key={w.initial + w.rest} className="brand-mark__word">
            <span className="brand-mark__initial">{w.initial}</span>
            <span className="brand-mark__fold">
              <span className="brand-mark__clip">
                <span className="brand-mark__rest">{w.rest}</span>
              </span>
            </span>
          </span>
        ))}
      </span>
    </a>
  );
}
