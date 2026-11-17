import { properNoun, type Localized } from "./localized";

export const siteName = properNoun("Iago Benvindo");

/**
 * Placeholder until the domain is bought. Set NEXT_PUBLIC_SITE_URL on the host (or change
 * the fallback here): canonical links, sitemap, structured data and share images follow.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://iagobenvindo.example").replace(
  /\/$/,
  "",
);

export const projectsPageDescription: Localized = {
  pt: "Sites e sistemas desenvolvidos por Iago Benvindo, com link para o resultado no ar.",
  en: "Websites and systems built by Iago Benvindo, each with a link to the live result.",
};

export const siteDescription: Localized = {
  pt: "Full-Stack Developer. Sites, landing pages e sistemas sob medida.",
  en: "Full-Stack Developer. Custom websites, landing pages and systems.",
};

export const navCopy = {
  home: { pt: "Início", en: "Home" },
  projects: { pt: "Projetos", en: "Projects" },
  menuLabel: { pt: "Navegação principal", en: "Main navigation" },
  languageLabel: { pt: "Idioma", en: "Language" },
  skip: { pt: "Pular para o conteúdo", en: "Skip to content" },
} satisfies Record<string, Localized>;

/** Said by screen readers after the name of a link that opens another tab. */
export const newTabHint: Localized = {
  pt: "abre em nova aba",
  en: "opens in a new tab",
};

export const projectsPageCopy = {
  title: { pt: "Projetos", en: "Projects" },
  intro: {
    pt: "Todos os trabalhos em um só lugar.",
    en: "All the work in one place.",
  },
} satisfies Record<string, Localized>;
