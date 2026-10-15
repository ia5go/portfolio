import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Contato",
  en: "Contact",
};

// Slot file: the owning ticket replaces the body of this section.
export function Contact({ locale }: { locale: Locale }) {
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
