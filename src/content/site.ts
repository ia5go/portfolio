import { properNoun, type Localized } from "./localized";

export const siteName = properNoun("Iago Benvindo");

export const siteDescription: Localized = {
  pt: "Full-Stack Developer. Sites, landing pages e sistemas sob medida.",
  en: "Full-Stack Developer. Custom websites, landing pages and systems.",
};

export const navCopy = {
  home: { pt: "Início", en: "Home" },
  projects: { pt: "Projetos", en: "Projects" },
  menuLabel: { pt: "Navegação principal", en: "Main navigation" },
  languageLabel: { pt: "Idioma", en: "Language" },
} satisfies Record<string, Localized>;

export const projectsPageCopy = {
  title: { pt: "Projetos", en: "Projects" },
  intro: {
    pt: "Todos os trabalhos em um só lugar.",
    en: "All the work in one place.",
  },
} satisfies Record<string, Localized>;
