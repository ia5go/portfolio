"use client";

import { useEffect, useState } from "react";
import { locales, t, type Locale } from "@/content/localized";
import { pagePath, type PageId } from "@/content/routes";
import { navCopy } from "@/content/site";
import { useSwitchLocale } from "./LocaleProvider";
import "./language-toggle.css";

/**
 * PT | EN switch drawn as a toggle: a filled Magenta thumb sits behind the selected
 * language and slides to the other one on click, while the page's texts scramble into
 * the new language in place (see LocaleProvider). No reload, no page fade.
 * Outside the provider the options are plain links to the other language's route.
 */
export function LanguageToggle({ locale, page }: { locale: Locale; page: PageId }) {
  const switchLocale = useSwitchLocale();
  // Moves the thumb on the click itself, a frame before the URL catches up.
  const [selected, setSelected] = useState<Locale>(locale);
  useEffect(() => setSelected(locale), [locale]);

  const choose = (e: React.MouseEvent<HTMLAnchorElement>, target: Locale) => {
    if (!switchLocale) return;
    // Opening in a new tab or window keeps the browser's own behaviour.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (target === selected) return;
    setSelected(target);
    switchLocale(target);
  };

  return (
    <div
      role="group"
      aria-label={t(navCopy.languageLabel, locale)}
      className="site-nav__lang lang-toggle"
      data-selected={selected}
      style={
        {
          "--lang-count": locales.length,
          "--lang-index": locales.indexOf(selected),
        } as React.CSSProperties
      }
    >
      <span className="lang-toggle__thumb" aria-hidden="true" />
      {locales.map((target) => (
        <a
          key={target}
          className="lang-toggle__option"
          href={pagePath(page, target)}
          lang={target}
          hrefLang={target}
          aria-current={target === locale ? "true" : undefined}
          data-active={target === selected}
          onClick={(e) => choose(e, target)}
        >
          {target.toUpperCase()}
        </a>
      ))}
    </div>
  );
}
