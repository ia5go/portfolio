"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef } from "react";
import type { Locale } from "@/content/localized";
import { pageTitle } from "@/content/metadata";
import { pagePath, parsePath } from "@/content/routes";
import { canAnimate } from "./effectsEnv";
import { prepareScramble, scrambleChanges, type TextSnapshot } from "./scramble";

type LocaleState = { locale: Locale; switchLocale: (target: Locale) => void };

const LocaleContext = createContext<LocaleState | null>(null);

/** The language on screen; `fallback` covers rendering outside the provider (tests). */
export function useLocale(fallback: Locale): Locale {
  return useContext(LocaleContext)?.locale ?? fallback;
}

/** Switches language in place, or null outside the provider. */
export function useSwitchLocale(): ((target: Locale) => void) | null {
  return useContext(LocaleContext)?.switchLocale ?? null;
}

/**
 * The URL is the source of truth for the language (`/` Portuguese, `/en` English).
 * Switching swaps the URL with `history.replaceState` (no reload, no history entry,
 * per the Next.js docs), every text re-renders in the new language, and the texts on
 * screen scramble from the old wording to the new one.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const { locale, page } = parsePath(usePathname());
  const before = useRef<TextSnapshot | null>(null);
  const cancel = useRef<(() => void) | null>(null);

  const switchLocale = useCallback(
    (target: Locale) => {
      if (target === parsePath(window.location.pathname).locale) return;
      // Settle a scramble still running, so the snapshot holds real text, not glyphs.
      cancel.current?.();
      cancel.current = null;
      // Phones asking for reduced motion get a plain, instant switch.
      before.current = canAnimate() ? prepareScramble(document.body) : null;
      window.history.replaceState(null, "", pagePath(page, target));
    },
    [page],
  );

  // Layout effect: the new texts are already in the DOM but not yet painted, so the
  // scramble's first frame (the old wording) is what the visitor sees first.
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.title = pageTitle(locale, page);
    const snapshot = before.current;
    before.current = null;
    if (snapshot) cancel.current = scrambleChanges(document.body, snapshot);
  }, [locale, page]);

  useEffect(() => () => cancel.current?.(), []);

  return (
    <LocaleContext.Provider value={{ locale, switchLocale }}>{children}</LocaleContext.Provider>
  );
}
