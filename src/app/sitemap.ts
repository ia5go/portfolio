import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/content/localized";
import { pagePath, type PageId } from "@/content/routes";
import { siteUrl } from "@/content/site";

const pages: { id: PageId; priority: number }[] = [
  { id: "home", priority: 1 },
  { id: "projects", priority: 0.8 },
];

/** One entry per language of each page; each lists all its language versions (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ id, priority }) =>
    locales.map((locale) => ({
      url: `${siteUrl}${pagePath(id, locale)}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}${pagePath(id, l)}`])),
          "x-default": `${siteUrl}${pagePath(id, defaultLocale)}`,
        },
      },
    })),
  );
}
