import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/** Everything is public; the sitemap lists both languages of every page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
