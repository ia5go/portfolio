import { properNoun, type Localized } from "./localized";

export type SkillTier = "delivered" | "lab" | "tools";

export type SkillGroup = {
  id: string;
  tier: SkillTier;
  label: Localized;
  note: Localized;
  items: Localized[];
};

const names = (list: string[]) => list.map(properNoun);

export const skillGroups: SkillGroup[] = [
  {
    id: "delivered",
    tier: "delivered",
    label: { pt: "Entregues em produção", en: "Delivered in production" },
    note: {
      pt: "Usadas em projetos reais, entregues a clientes.",
      en: "Used on real projects, shipped to clients.",
    },
    items: names([
      "HTML5",
      "CSS3",
      "SCSS",
      "JavaScript",
      "jQuery",
      "TypeScript",
      "React",
      "Vite",
      "Next.js",
      "PHP",
      "Laravel",
      "MySQL",
      "SQLite",
      "REST APIs",
      "WordPress",
      "WooCommerce",
      "Git",
      "Docker",
      "GSAP",
      "SwiperJS",
      "FullCalendar",
      "Figma",
      "Adobe XD",
    ]),
  },
  {
    id: "lab",
    tier: "lab",
    label: { pt: "Laboratório", en: "Lab" },
    note: {
      pt: "Exploradas em projetos pessoais.",
      en: "Explored in personal projects.",
    },
    items: names(["Node.js", "React Native", "Supabase"]),
  },
  {
    id: "tools",
    tier: "tools",
    label: { pt: "Automação e ferramentas", en: "Automation and tools" },
    note: {
      pt: "Fluxos, integrações e IA no dia a dia.",
      en: "Workflows, integrations and AI in daily work.",
    },
    items: [
      ...names(["Monday", "Slack", "Zendesk", "Gmail"]),
      { pt: "Integrações entre ferramentas", en: "Tool integrations" },
      properNoun("Claude"),
      { pt: "API da Anthropic", en: "Anthropic API" },
      properNoun("Vercel"),
    ],
  },
];
