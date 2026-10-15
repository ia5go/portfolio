import type { Localized } from "./localized";

// Minimal copy for the foundation page. Ticket "Hero" replaces this.
export const placeholder = {
  eyebrow: {
    pt: "Full-Stack Developer · Gestor de Inovação",
    en: "Full-Stack Developer · Innovation Manager",
  },
  name: { pt: "Iago Benvindo", en: "Iago Benvindo" },
  subtitle: {
    pt: "Sites, landing pages e sistemas sob medida. Do orçamento ao ar, sem enrolação.",
    en: "Custom websites, landing pages and systems. From quote to launch, no fluff.",
  },
} satisfies Record<string, Localized>;
