import { experience, present } from "@/content/experience";
import { t, type Locale, type Localized } from "@/content/localized";
import "./experience.css";

export const heading: Localized = {
  pt: "Experiência",
  en: "Experience",
};

export function Experience({ locale }: { locale: Locale }) {
  let rank = 0;
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <ol className="timeline">
        {experience.map((entry) => {
          if (entry.highlight) rank += 1;
          const cls = entry.highlight ? `exp exp--rank-${rank}` : "exp exp--compact";
          return (
            <li key={entry.id} className={cls} data-highlight={entry.highlight}>
              <p className="exp__dates">
                {entry.start} – {entry.end ?? t(present, locale)}
              </p>
              <h3 className="exp__role">{t(entry.role, locale)}</h3>
              <p className="exp__company">{t(entry.company, locale)}</p>
              {entry.bullets.length > 0 && (
                <ul className="exp__bullets">
                  {entry.bullets.map((b) => (
                    <li key={b.en}>{t(b, locale)}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
