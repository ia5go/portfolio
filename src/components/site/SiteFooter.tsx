"use client";

import { usePathname } from "next/navigation";
import { cvFiles, footerCopy, footerYear, siteVersion } from "@/content/footer";
import { t, type Locale } from "@/content/localized";
import { pagePath, parsePath, type PageId } from "@/content/routes";
import { useLocale } from "./LocaleProvider";
import "./site-footer.css";

type FooterWindow = { id: string; label: string; href: string; current: boolean };

/**
 * The page's closing line, drawn as a terminal status bar: the header's counterpart,
 * full-bleed chrome rather than another terminal window.
 *  - Statusline: availability with a breathing LED (the "mode" segment), a tmux-style
 *    window list (`1:início*`, the asterisk marks the page on screen), the CV files.
 *  - Command line: copyright, the stack and version, and `gg` to go back to the top.
 * It reads the language from the provider, so its texts follow the in-place switch.
 */
export function SiteFooter({ locale: served }: { locale: Locale }) {
  const locale = useLocale(served);
  const page: PageId = parsePath(usePathname() ?? "/").page;
  const home = pagePath("home", locale);

  const windows: FooterWindow[] = [
    { id: "home", label: t(footerCopy.home, locale), href: home, current: page === "home" },
    {
      id: "projects",
      label: t(footerCopy.projects, locale),
      href: pagePath("projects", locale),
      current: page === "projects",
    },
    {
      id: "contact",
      label: t(footerCopy.contact, locale),
      href: page === "home" ? "#contact" : `${home}#contact`,
      current: false,
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__bar">
        <p className="site-footer__status">
          <span className="site-footer__led" aria-hidden="true" />
          <span>{t(footerCopy.availability, locale)}</span>
        </p>
        <nav className="site-footer__windows" aria-label={t(footerCopy.navLabel, locale)}>
          {windows.map((w, i) => (
            <a
              key={w.id}
              href={w.href}
              aria-current={w.current ? "page" : undefined}
              className="site-footer__link"
            >
              <span className="site-footer__dim" aria-hidden="true">
                {i + 1}:
              </span>
              {w.label}
              <span className="site-footer__flag" aria-hidden="true">
                {w.current ? "*" : " "}
              </span>
            </a>
          ))}
        </nav>
        <div className="site-footer__cv" role="group" aria-label={t(footerCopy.cvLabel, locale)}>
          {cvFiles.map((cv) => (
            <a
              key={cv.lang}
              href={cv.href}
              download
              type="application/pdf"
              hrefLang={cv.lang}
              aria-label={`${cv.file}: ${t(cv.hint, locale)}`}
              className="site-footer__link"
            >
              <span className="site-footer__arrow" aria-hidden="true">
                ↓
              </span>
              {cv.file}
            </a>
          ))}
        </div>
      </div>
      <div className="site-footer__cmd">
        <p className="site-footer__copy">
          © {footerYear} {t(footerCopy.owner, locale)}
        </p>
        <p className="site-footer__meta">
          <span>{t(footerCopy.stack, locale)}</span>
          <span className="site-footer__version">{siteVersion}</span>
        </p>
        <a
          href="#top"
          aria-label={t(footerCopy.topName, locale)}
          className="site-footer__link site-footer__top"
        >
          <span className="site-footer__key" aria-hidden="true">
            gg
          </span>
          {t(footerCopy.top, locale)}
          <span className="site-footer__arrow" aria-hidden="true">
            ↑
          </span>
        </a>
      </div>
    </footer>
  );
}
