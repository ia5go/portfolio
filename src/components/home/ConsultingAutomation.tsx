import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Consultoria e automação",
  en: "Consulting and automation",
};

// Slot file: the owning ticket replaces the body of this section.
export function ConsultingAutomation({ locale }: { locale: Locale }) {
  return (
    <section id="consulting" className="section" aria-labelledby="consulting-heading">
      <h2 id="consulting-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
