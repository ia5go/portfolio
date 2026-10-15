"use client";

import { useState } from "react";
import { menuToggle, navAnchors } from "@/content/hero";
import { locales, t, type Locale } from "@/content/localized";
import { pagePath, type PageId } from "@/content/routes";
import { navCopy, siteName } from "@/content/site";
import "./nav.css";

/**
 * Persistent navigation. On phones the links collapse into a menu; on the Home Page
 * they include in-page anchors. The PT | EN switch links to the same page in the other language.
 */
export function Nav({ locale, page }: { locale: Locale; page: PageId }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const home = pagePath("home", locale);

  return (
    <header className="site-nav">
      <a className="site-nav__brand" href={home}>
        {t(siteName, locale)}
      </a>
      <div
        role="group"
        aria-label={t(navCopy.languageLabel, locale)}
        className="site-nav__lang"
      >
        {locales.map((target) => (
          <a
            key={target}
            href={pagePath(page, target)}
            lang={target}
            hrefLang={target}
            aria-current={target === locale ? "true" : undefined}
          >
            {target.toUpperCase()}
          </a>
        ))}
      </div>
      <button
        type="button"
        className="site-nav__toggle"
        aria-expanded={open}
        aria-controls="site-nav-links"
        aria-label={t(open ? menuToggle.close : menuToggle.open, locale)}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "☰"}
      </button>
      <nav
        id="site-nav-links"
        aria-label={t(navCopy.menuLabel, locale)}
        className="site-nav__links"
        data-open={open}
      >
        <a
          href={home}
          aria-current={page === "home" ? "page" : undefined}
          onClick={close}
        >
          {t(navCopy.home, locale)}
        </a>
        {page === "home" &&
          navAnchors.map((a) => (
            <a key={a.id} href={`#${a.id}`} onClick={close}>
              {t(a.label, locale)}
            </a>
          ))}
        <a
          href={pagePath("projects", locale)}
          aria-current={page === "projects" ? "page" : undefined}
          onClick={close}
        >
          {t(navCopy.projects, locale)}
        </a>
      </nav>
    </header>
  );
}
