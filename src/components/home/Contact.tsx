import { WhatsAppButton } from "@/components/WhatsAppButton";
import { contact, contactCopy } from "@/content/contact";
import { t, type Locale, type Localized } from "@/content/localized";
import "./contact.css";

export const heading: Localized = {
  pt: "Contato",
  en: "Contact",
};

export function Contact({ locale }: { locale: Locale }) {
  const external = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <p>{t(contactCopy.intro, locale)}</p>
      <ul className="contact-list">
        <li>
          <WhatsAppButton locale={locale} message={contactCopy.whatsappMessage}>
            {t(contactCopy.whatsappLabel, locale)} {contact.whatsappDisplay}
          </WhatsAppButton>
        </li>
        <li>
          <a className="contact-list__link" href={`mailto:${contact.email}`}>
            <span className="contact-list__label">
              {t(contactCopy.emailLabel, locale)}
            </span>
            {contact.email}
          </a>
        </li>
        <li>
          <a className="contact-list__link" href={contact.linkedin} {...external}>
            <span className="contact-list__label">
              {t(contactCopy.linkedinLabel, locale)}
            </span>
            {contact.linkedinDisplay}
          </a>
        </li>
        <li>
          <a className="contact-list__link" href={contact.github} {...external}>
            <span className="contact-list__label">
              {t(contactCopy.githubLabel, locale)}
            </span>
            {t(contactCopy.githubHint, locale)}
          </a>
        </li>
      </ul>
    </section>
  );
}
