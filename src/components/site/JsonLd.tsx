import type { Locale } from "@/content/localized";
import { pageJsonLd } from "@/content/jsonld";
import type { PageId } from "@/content/routes";

/** Server-rendered JSON-LD, so crawlers get it without running any script. */
export function JsonLd({ page, locale }: { page: PageId; locale: Locale }) {
  // "<" is escaped so no string in the data can close the script tag.
  const json = JSON.stringify(pageJsonLd(page, locale)).replace(/</g, "\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
