import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Habilidades",
  en: "Skills",
};

// Slot file: the owning ticket replaces the body of this section.
export function Skills({ locale }: { locale: Locale }) {
  return (
    <section id="skills" className="section" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
