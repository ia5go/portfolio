import { contact } from "./contact";
import { heroCopy } from "./hero";
import { t, type Locale } from "./localized";
import { projects } from "./projects";
import { pagePath, type PageId } from "./routes";
import { projectsPageDescription, siteDescription, siteName, siteUrl } from "./site";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

/** The site's owner, shared by every page so search engines connect them. */
function person(locale: Locale) {
  return {
    "@type": "Person",
    "@id": personId,
    name: t(siteName, locale),
    jobTitle: t(heroCopy.eyebrow, locale),
    description: t(siteDescription, locale),
    url: `${siteUrl}${pagePath("home", locale)}`,
    email: contact.email,
    sameAs: [contact.linkedin, contact.github],
    knowsLanguage: ["pt-BR", "en"],
  };
}

/** Structured data (schema.org JSON-LD) for a page, in the page's language. */
export function pageJsonLd(page: PageId, locale: Locale) {
  const inLanguage = locale === "pt" ? "pt-BR" : "en";
  const url = `${siteUrl}${pagePath(page, locale)}`;
  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}${pagePath("home", locale)}`,
    name: t(siteName, locale),
    description: t(siteDescription, locale),
    inLanguage,
    publisher: { "@id": personId },
  };

  if (page === "home") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        person(locale),
        website,
        {
          "@type": "ProfilePage",
          "@id": `${url}#page`,
          url,
          name: t(siteName, locale),
          inLanguage,
          isPartOf: { "@id": websiteId },
          mainEntity: { "@id": personId },
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      person(locale),
      website,
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: t({ pt: "Projetos", en: "Projects" }, locale),
        description: t(projectsPageDescription, locale),
        inLanguage,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "WebSite",
              name: p.name,
              url: p.url,
              description: t(p.segment, locale),
              image: `${siteUrl}${p.image.src}`,
              author: { "@id": personId },
            },
          })),
        },
      },
    ],
  };
}
