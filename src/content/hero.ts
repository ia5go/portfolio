import { properNoun, type Localized } from "./localized";

export const heroCopy = {
  eyebrow: {
    pt: "Full-Stack Developer · Gestor de Inovação",
    en: "Full-Stack Developer · Innovation Manager",
  },
  name: properNoun("Iago Benvindo"),
  subtitle: {
    pt: "Sites, landing pages e sistemas sob medida. Do orçamento ao ar, sem enrolação.",
    en: "Custom websites, landing pages and systems. From quote to launch, no fluff.",
  },
  viewProjects: { pt: "Ver projetos", en: "View projects" },
  requestQuote: { pt: "Pedir orçamento", en: "Request a quote" },
} satisfies Record<string, Localized>;

/** Anchor targets on the Home Page. */
export const heroTargets = {
  projects: "#featured-projects",
  contact: "#contact",
} as const;

export const navAnchors = [
  { id: "featured-projects", label: { pt: "Destaques", en: "Featured" } },
  { id: "about", label: { pt: "Sobre", en: "About" } },
  { id: "contact", label: { pt: "Contato", en: "Contact" } },
] satisfies { id: string; label: Localized }[];

export const menuToggle = {
  open: { pt: "Abrir menu", en: "Open menu" },
  close: { pt: "Fechar menu", en: "Close menu" },
} satisfies Record<string, Localized>;
