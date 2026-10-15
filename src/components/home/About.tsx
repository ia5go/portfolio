import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Sobre",
  en: "About",
};

// Slot file: the owning ticket replaces the body of this section.
export function About({ locale }: { locale: Locale }) {
  return (
    <section id="about" className="section" aria-labelledby="about-heading">
      <h2 id="about-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
