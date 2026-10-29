import { properNoun, type Localized } from "./localized";

export type ExperienceEntry = {
  id: string;
  role: Localized;
  company: Localized;
  /** MM/YYYY or YYYY, same in both languages. */
  start: string;
  /** Omitted means "present". */
  end?: string;
  /** The three most relevant entries get the stronger gradient colour. */
  highlight: boolean;
  bullets: Localized[];
};

export const present: Localized = { pt: "presente", en: "present" };

/** Reverse chronological. Retail and older non-tech jobs are intentionally absent. */
export const experience: ExperienceEntry[] = [
  {
    id: "innovation-manager",
    role: { pt: "Gestor de Inovação", en: "Innovation Manager" },
    company: properNoun("Hoom Interativa · OPER8"),
    start: "06/2026",
    highlight: true,
    bullets: [
      {
        pt: "Ideação, consultoria e desenvolvimento do produto To-Do da OPER8, em breve no ar.",
        en: "Ideation, consulting and development of OPER8's To-Do product, launching soon.",
      },
      {
        pt: "Camada de IA programada sobre a API da Anthropic.",
        en: "AI layer programmed on the Anthropic API.",
      },
      {
        pt: "MVP interativo entregue em uma semana para uma proposta comercial.",
        en: "Interactive MVP delivered in one week for a commercial proposal.",
      },
      {
        pt: "Consultoria de automação e processos para uma empresa do setor financeiro: administração do Monday e integrações com Slack, Zendesk e Gmail.",
        en: "Automation and process consulting for a financial-sector company: Monday administration and integrations with Slack, Zendesk and Gmail.",
      },
      {
        pt: "Fluxos de trabalho, organização de equipe e treinamento para uso de IA, com materiais de apoio.",
        en: "Workflows, team organisation and AI-use training, with supporting materials.",
      },
      {
        pt: "Treinamento da equipe criativa.",
        en: "Training of the creative team.",
      },
    ],
  },
  {
    id: "freelance",
    role: {
      pt: "Desenvolvedor autônomo e consultor técnico",
      en: "Independent developer and technical consultant",
    },
    company: { pt: "Autônomo", en: "Self-employed" },
    start: "03/2025",
    end: "05/2026",
    highlight: true,
    bullets: [
      {
        pt: "Desenvolvedor externo e consultor da Esquire Brasil, em parceria com a Hoom Interativa.",
        en: "External developer and consultant for Esquire Brasil, together with Hoom Interativa.",
      },
      {
        pt: "Manutenção de sites WordPress e pequenos ajustes para clientes.",
        en: "WordPress maintenance and small adjustments for clients.",
      },
    ],
  },
  {
    id: "full-stack",
    role: properNoun("Full-Stack Developer"),
    company: properNoun("Hoom Interativa"),
    start: "06/2021",
    end: "02/2025",
    highlight: true,
    bullets: [
      {
        pt: "Desenvolvimento de sites, landing pages e sistemas sob medida, do briefing à publicação.",
        en: "Development of websites, landing pages and custom systems, from briefing to launch.",
      },
    ],
  },
  {
    id: "educator",
    role: {
      pt: "Educador em programação e TI",
      en: "Educator in programming and IT",
    },
    company: { pt: "Ensino", en: "Teaching" },
    start: "2016",
    end: "2021",
    highlight: false,
    bullets: [],
  },
];
