import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Experiência",
  en: "Experience",
};

// Slot file: the owning ticket replaces the body of this section.
export function Experience({ locale }: { locale: Locale }) {
  return (
    <section id="experience" className="section" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
