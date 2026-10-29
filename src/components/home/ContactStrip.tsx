import { WhatsAppButton } from "@/components/WhatsAppButton";
import { contactCopy } from "@/content/contact";
import { t, type Locale, type Localized } from "@/content/localized";
import "./contact.css";

export const heading: Localized = {
  pt: "Vamos conversar?",
  en: "Shall we talk?",
};

export function ContactStrip({ locale }: { locale: Locale }) {
  return (
    <section
      id="contact-strip"
      className="section contact-strip"
      aria-labelledby="contact-strip-heading"
    >
      <h2 id="contact-strip-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <p className="contact-strip__text">{t(contactCopy.stripInvite, locale)}</p>
      <WhatsAppButton locale={locale} message={contactCopy.whatsappMessage}>
        {t(contactCopy.stripAction, locale)}
      </WhatsAppButton>
    </section>
  );
}
