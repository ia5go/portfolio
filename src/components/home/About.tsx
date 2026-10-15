import { t, type Locale, type Localized } from "@/content/localized";
import "./about.css";

export const heading: Localized = {
  pt: "Sobre",
  en: "About",
};

const narrative: Localized[] = [
  {
    pt: "Sou desenvolvedor full-stack e gosto de código que o usuário nem percebe: simplesmente funciona. Construo sites, landing pages e sistemas sob medida, do orçamento ao ar.",
    en: "I'm a full-stack developer, and I like code the user never notices: it just works. I build custom websites, landing pages and systems, from quote to launch.",
  },
  {
    pt: "Passei quase 4 anos na Hoom Interativa criando interfaces, plugins e Design Systems para dezenas de projetos. Também dei aulas de programação, incluindo para estudantes de mestrado internacional.",
    en: "I spent almost 4 years at Hoom Interativa building interfaces, plugins and Design Systems for dozens of projects. I have also taught programming, including to international master's students.",
  },
  {
    pt: "Inglês avançado e aprendizado contínuo, sempre atrás do próximo desafio.",
    en: "Advanced English and continuous learning, always chasing the next challenge.",
  },
];

const stats: { value: string; label: Localized }[] = [
  {
    value: "5+",
    label: { pt: "anos de desenvolvimento web", en: "years of web development" },
  },
  { value: "25+", label: { pt: "sites entregues", en: "sites delivered" } },
  { value: "100+", label: { pt: "alunos ensinados", en: "students taught" } },
  { value: "∞", label: { pt: "bugs resolvidos", en: "bugs squashed" } },
];

export function About({ locale }: { locale: Locale }) {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <h2 id="about-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <div className="about__grid">
        <div className="about__text">
          {narrative.map((p) => (
            <p key={p.en}>{t(p, locale)}</p>
          ))}
        </div>
        <ul className="about__stats">
          {stats.map((s) => (
            <li key={s.label.en} className="about__stat">
              <span className="about__stat-number">{s.value}</span>
              <span className="about__stat-label">{t(s.label, locale)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
