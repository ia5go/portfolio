import type { Metadata } from "next";
import {
  projectsPageCopy,
  projectsPageDescription,
  siteDescription,
  siteName,
  siteUrl,
} from "./site";
import { pagePath, type PageId } from "./routes";
import { defaultLocale, t, type Locale } from "./localized";

const ogLocale = { pt: "pt_BR", en: "en_US" } as const;

/** Browser tab title; also set on the client when the language switches in place. */
export function pageTitle(locale: Locale, page: PageId = "home"): string {
  return page === "projects"
    ? `${t(projectsPageCopy.title, locale)} | ${t(siteName, locale)}`
    : `${t(siteName, locale)} | Full-Stack Developer`;
}

export function localeMetadata(locale: Locale, page: PageId = "home"): Metadata {
  const isProjects = page === "projects";
  const title = pageTitle(locale, page);
  const description = t(
    isProjects ? projectsPageDescription : siteDescription,
    locale,
  );
  const url = pagePath(page, locale);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        pt: pagePath(page, "pt"),
        en: pagePath(page, "en"),
        "x-default": pagePath(page, defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: t(siteName, locale),
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "pt" ? "en" : "pt"],
    },
    twitter: { card: "summary", title, description },
  };
}
