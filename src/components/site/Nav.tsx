import { locales, t, type Locale } from "@/content/localized";
import { pagePath, type PageId } from "@/content/routes";
import { navCopy, siteName } from "@/content/site";

/** Persistent navigation. The PT | EN switch links to the same page in the other language. */
export function Nav({ locale, page }: { locale: Locale; page: PageId }) {
  return (
    <header className="site-nav">
      <a className="site-nav__brand" href={pagePath("home", locale)}>
        {t(siteName, locale)}
      </a>
      <nav aria-label={t(navCopy.menuLabel, locale)} className="site-nav__links">
        <a
          href={pagePath("home", locale)}
          aria-current={page === "home" ? "page" : undefined}
        >
          {t(navCopy.home, locale)}
        </a>
        <a
          href={pagePath("projects", locale)}
          aria-current={page === "projects" ? "page" : undefined}
        >
          {t(navCopy.projects, locale)}
        </a>
      </nav>
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
    </header>
  );
}
