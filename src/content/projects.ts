import type { Localized } from "./localized";
import screenshots from "./screenshots.json";

/** One entry of the screenshots manifest (client-owned, single-source). */
type Shot = {
  slug: string;
  name: string;
  url: string;
  image: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  /** Client name, single-source. */
  name: string;
  url: string;
  image: { src: string; width: number; height: number };
  segment: Localized;
  roleLine: Localized;
  /** Custom description, only for the large projects. */
  description?: Localized;
  /** Position on the Home Page (1-based). Absent means not featured. */
  featured?: number;
};

export const defaultRoleLine: Localized = {
  pt: "Desenvolvimento do site",
  en: "Website development",
};

/** Segment and optional extras per slug; everything else comes from the manifest. */
type Extra = {
  segment: Localized;
  description?: Localized;
  featured?: number;
};

const extras: Record<string, Extra> = {
  "girassol-azul": {
    segment: { pt: "Arte e cultura", en: "Arts and culture" },
    description: {
      pt: "Site institucional com as sócias, a incubadora de projetos e as notícias, em português e inglês.",
      en: "Institutional site featuring the partners, the project incubator and news, in Portuguese and English.",
    },
    featured: 1,
  },
  "dna-genetica": {
    segment: { pt: "Laboratório e saúde", en: "Laboratory and healthcare" },
    description: {
      pt: "Site de laboratório com unidades, exames, vacinas, convênios, agendamento e acesso aos resultados.",
      en: "Laboratory site with units, exams, vaccines, health plans, scheduling and access to results.",
    },
    featured: 2,
  },
  "irma-dulce": {
    segment: { pt: "Obras sociais", en: "Social work" },
    description: {
      pt: "Site institucional das Obras Sociais Irmã Dulce: educação, saúde, produtos Dulce Natura e doações.",
      en: "Institutional site of Obras Sociais Irmã Dulce: education, healthcare, Dulce Natura products and donations.",
    },
    featured: 3,
  },
  "esquire-brasil": {
    segment: { pt: "Revista e mídia", en: "Magazine and media" },
    description: {
      pt: "Portal de conteúdo editorial com seções como Moda Masculina.",
      en: "Editorial content portal with sections such as Men's Fashion.",
    },
    featured: 4,
  },
  engemon: {
    segment: { pt: "Grupo de engenharia", en: "Engineering group" },
    description: {
      pt: "Site institucional do grupo, com empresas, áreas de atuação, ESG, novidades e vagas.",
      en: "Group institutional site, with companies, areas of work, ESG, news and job openings.",
    },
    featured: 5,
  },
  platinum: {
    segment: { pt: "Clube masculino", en: "Men's club" },
    featured: 6,
  },
  coesa: {
    segment: { pt: "Engenharia e construção", en: "Engineering and construction" },
  },
  interartis: {
    segment: { pt: "Associação de artistas", en: "Artists' association" },
  },
  biobloc: {
    segment: { pt: "Materiais de construção", en: "Building materials" },
  },
  "ri-lauro-de-freitas": {
    segment: { pt: "Cartório", en: "Notary office" },
  },
  "instituto-suel-abujamra": {
    segment: { pt: "Instituto", en: "Institute" },
  },
  brasquimica: {
    segment: { pt: "Produtos asfálticos", en: "Asphalt products" },
  },
  "vs-portoes": {
    segment: { pt: "Portões automáticos", en: "Automatic gates" },
  },
  "medicina-oral": {
    segment: { pt: "Clínica de saúde", en: "Health clinic" },
  },
  "hispania-telecom": {
    segment: { pt: "Telecom e energia", en: "Telecom and energy" },
  },
  "santo-mercado": {
    segment: { pt: "Mercado municipal", en: "Municipal market" },
  },
  "sport-one": {
    segment: { pt: "Motocicletas", en: "Motorcycles" },
  },
  "grupo-alianca-bahia": {
    segment: { pt: "Grupo empresarial", en: "Business group" },
  },
  "clinica-osmilto-brandao": {
    segment: { pt: "Clínica de saúde", en: "Health clinic" },
  },
  "gt-participacoes": {
    segment: { pt: "Participações e serviços", en: "Holdings and services" },
  },
  "shopping-central-park": {
    segment: { pt: "Shopping center", en: "Shopping mall" },
  },
  "elite-engenharia": {
    segment: { pt: "Construção e imóveis", en: "Construction and real estate" },
  },
  "knox-kids": {
    segment: { pt: "Escola", en: "School" },
  },
  "ms-solares": {
    segment: { pt: "Energia solar", en: "Solar energy" },
  },
};

/** All projects, in manifest order. */
export const projects: Project[] = (screenshots as Shot[]).map((shot) => {
  const extra = extras[shot.slug];
  if (!extra) throw new Error(`Missing project data for ${shot.slug}`);
  return {
    slug: shot.slug,
    name: shot.name,
    url: shot.url,
    image: { src: shot.image, width: shot.width, height: shot.height },
    segment: extra.segment,
    roleLine: defaultRoleLine,
    description: extra.description,
    featured: extra.featured,
  };
});

/** Pure: the featured projects, ordered by their featured position. */
export function selectFeatured(list: readonly Project[]): Project[] {
  return list
    .filter((p): p is Project & { featured: number } => p.featured !== undefined)
    .sort((a, b) => a.featured - b.featured);
}
