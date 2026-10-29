import { defaultLocale, type Locale } from "./localized";

export type PageId = "home" | "projects";

/** Portuguese lives at `/`, English under `/en`. */
export function pagePath(page: PageId, locale: Locale): string {
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  const path = page === "home" ? "" : `/${page}`;
  return `${prefix}${path}` || "/";
}
