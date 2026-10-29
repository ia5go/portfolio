import { t, type Locale, type Localized } from "@/content/localized";
import { courseGroups, degree, english } from "@/content/formation";
import "./formation.css";

export const heading: Localized = {
  pt: "Formação e cursos",
  en: "Formation and courses",
};

export function FormationCourses({ locale }: { locale: Locale }) {
  return (
    <section id="formation" className="section" aria-labelledby="formation-heading">
      <h2 id="formation-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <div className="formation">
        <div className="formation__degree">
          <h3 className="formation__degree-title">{t(degree.title, locale)}</h3>
          <p className="formation__meta">
            {t(degree.school, locale)} · {t(degree.period, locale)}
          </p>
          <p>
            {t(english.label, locale)}: {t(english.level, locale)}
          </p>
        </div>
        {courseGroups.map((group) => (
          <div key={group.label.en}>
            <h3 className="formation__group-label">{t(group.label, locale)}</h3>
            <ul className="formation__list">
              {group.courses.map((c) => (
                <li key={c.title.en}>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener noreferrer">
                      {t(c.title, locale)}
                    </a>
                  ) : (
                    t(c.title, locale)
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
