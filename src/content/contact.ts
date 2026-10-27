import { properNoun, type Localized } from "./localized";

/** Client-owned contact data stays single-source (not localized). */
export const contact = {
  whatsappNumber: "5524992463369", // (24) 99246-3369, international format
  email: "benvindoiago@outlook.com",
  linkedin: "https://www.linkedin.com/in/iago-benvindo-6b3b031b4/",
  github: "https://github.com/ia5go",
} as const;

export const contactCopy = {
  stripInvite: {
    pt: "Gostou do que viu? Vamos conversar sobre o seu projeto.",
    en: "Liked what you saw? Let's talk about your project.",
  },
  stripAction: { pt: "Chamar no WhatsApp", en: "Message me on WhatsApp" },
  whatsappMessage: {
    pt: "Olá, Iago! Vi o seu portfólio e gostaria de conversar sobre um projeto.",
    en: "Hi Iago! I saw your portfolio and I'd like to talk about a project.",
  },
  intro: {
    pt: "Me chame no WhatsApp ou use o canal que preferir.",
    en: "Message me on WhatsApp or use whichever channel you prefer.",
  },
  // Each button shows only its label; the accessible name starts with that label
  // (WCAG 2.5.3) and adds what the link does.
  whatsappLabel: properNoun("WhatsApp"),
  whatsappHint: { pt: "conversar comigo", en: "chat with me" },
  emailLabel: { pt: "E-mail", en: "Email" },
  emailHint: { pt: "escrever para", en: "write to" },
  linkedinLabel: properNoun("LinkedIn"),
  linkedinHint: { pt: "meu perfil profissional", en: "my professional profile" },
  githubLabel: properNoun("GitHub"),
  githubHint: { pt: "veja meu código", en: "see my code" },
} satisfies Record<string, Localized>;
