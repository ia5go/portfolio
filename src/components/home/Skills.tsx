import { t, type Locale, type Localized } from "@/content/localized";
import { skillGroups } from "@/content/skills";
import "./skills.css";

export const heading: Localized = {
  pt: "Habilidades",
  en: "Skills",
};

export function Skills({ locale }: { locale: Locale }) {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <div className="skills__groups">
        {skillGroups.map((group) => (
          <article
            key={group.id}
            className={`skill-group skill-group--${group.tier}`}
            data-tier={group.tier}
            aria-labelledby={`skills-${group.id}`}
          >
            <h3 id={`skills-${group.id}`} className="skill-group__label">
              {t(group.label, locale)}
            </h3>
            <p className="skill-group__note">{t(group.note, locale)}</p>
            <ul className="skill-group__list">
              {group.items.map((item) => (
                <li key={item.en} className="skill-chip">
                  {t(item, locale)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
