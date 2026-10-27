import { defaultLocale, locales, type Locale } from "./localized";

export type PageId = "home" | "projects";

/** Portuguese lives at `/`, English under `/en`. */
export function pagePath(page: PageId, locale: Locale): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  const path = page === "home" ? "" : `/${page}`;
  return `${prefix}${path}` || "/";
}

/** The page and language a path points at (the inverse of `pagePath`). */
export function parsePath(pathname: string): { page: PageId; locale: Locale } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] as Locale | undefined;
  const locale =
    first && first !== defaultLocale && locales.includes(first) ? first : defaultLocale;
  const rest = locale === defaultLocale ? segments : segments.slice(1);
  return { page: rest[0] === "projects" ? "projects" : "home", locale };
}
