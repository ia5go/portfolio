import { properNoun, type Localized } from "./localized";

export type Course = {
  title: Localized;
  /** Clean public certificate link (no query string). Omitted when none is known. */
  url?: string;
};

export type CourseGroup = { label: Localized; courses: Course[] };

export const degree = {
  title: {
    pt: "Tecnólogo em Tecnologia da Informação e Comunicação",
    en: "Associate degree in Information and Communication Technology",
  } satisfies Localized,
  school: properNoun("FAETERJ"),
  period: properNoun("2015 – 2020"),
};

export const english = {
  label: { pt: "Inglês", en: "English" } satisfies Localized,
  level: { pt: "Avançado", en: "Advanced" } satisfies Localized,
};

export const courseGroups: CourseGroup[] = [
  {
    label: { pt: "Cursos de IA", en: "AI courses" },
    courses: [
      { title: properNoun("AI Hero Skills Workflow") },
      { title: properNoun("Anthropic Academy: Claude 101") },
      { title: properNoun("Anthropic Academy: AI Fluency") },
      { title: properNoun("Anthropic Academy: Claude Cowork") },
      { title: properNoun("Anthropic Academy: AI Capabilities and Limitations") },
      { title: properNoun("Anthropic Academy: Claude Code 101") },
      { title: properNoun("Anthropic Academy: Introduction to subagents") },
      { title: properNoun("Anthropic Academy: Claude Code in Action") },
    ],
  },
  {
    label: { pt: "Cursos técnicos", en: "Technical courses" },
    courses: [
      { title: { pt: "Git Completo", en: "Git Complete" } },
      { title: { pt: "Princípios SOLID", en: "SOLID principles" } },
    ],
  },
];
