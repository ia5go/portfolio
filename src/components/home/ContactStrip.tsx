import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Vamos conversar?",
  en: "Shall we talk?",
};

// Slot file: the owning ticket replaces the body of this section.
export function ContactStrip({ locale }: { locale: Locale }) {
  return (
    <section id="contact-strip" className="section" aria-labelledby="contact-strip-heading">
      <h2 id="contact-strip-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
