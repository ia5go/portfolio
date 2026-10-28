import { properNoun, type Localized } from "./localized";

/**
 * Site footer, drawn as a terminal status bar (SiteFooter.tsx). The top line is the
 * statusline: availability, a tmux-style window list and the CV files. The line under
 * it is the command line: copyright, the stack, the version and a "back to top" command.
 */
export const footerCopy = {
  availability: {
    pt: "Disponível para novos projetos",
    en: "Available for new projects",
  },
  navLabel: { pt: "Navegação do rodapé", en: "Footer navigation" },
  home: { pt: "início", en: "home" },
  projects: { pt: "projetos", en: "projects" },
  contact: { pt: "contato", en: "contact" },
  cvLabel: { pt: "Currículo em PDF", en: "CV as PDF" },
  // Each CV link shows only its file name; the accessible name starts with that name
  // (WCAG 2.5.3) and says what the link does.
  cvPtHint: { pt: "baixar o CV em português", en: "download the CV in Portuguese" },
  cvEnHint: { pt: "baixar o CV em inglês", en: "download the CV in English" },
  top: { pt: "topo", en: "top" },
  topName: { pt: "Voltar ao topo", en: "Back to top" },
  owner: properNoun("Iago Benvindo"),
  stack: properNoun("Next.js · TypeScript"),
} satisfies Record<string, Localized>;

/** Copyright year and version stamp. Bump both when shipping a new release. */
export const footerYear = 2026;
export const siteVersion = "v2026.10";

/** The CV PDFs in /public/cv, one per language. */
export const cvFiles = [
  { lang: "pt", href: "/cv/iago-benvindo-cv-pt.pdf", file: "cv-pt.pdf", hint: footerCopy.cvPtHint },
  { lang: "en", href: "/cv/iago-benvindo-cv-en.pdf", file: "cv-en.pdf", hint: footerCopy.cvEnHint },
] as const;
