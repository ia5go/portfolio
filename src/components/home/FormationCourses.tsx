import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Formação e cursos",
  en: "Formation and courses",
};

// Slot file: the owning ticket replaces the body of this section.
export function FormationCourses({ locale }: { locale: Locale }) {
  return (
    <section id="formation" className="section" aria-labelledby="formation-heading">
      <h2 id="formation-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
