import { whatsappHref } from "@/components/WhatsAppButton";
import { contact, contactCopy } from "@/content/contact";
import { properNoun, t, type Locale, type Localized } from "@/content/localized";
import { ContactLinks, type ContactLink } from "./ContactLinks";
import "./contact.css";

export const heading: Localized = {
  pt: "Contato",
  en: "Contact",
};

/**
 * The closing window is a message being composed, in the manner of a terminal mail
 * client: a "new message" title bar, the header lines of a draft already addressed to
 * Iago, and the channels to send it by.
 */
export const composeCopy = {
  windowTitle: { pt: "nova mensagem", en: "new message" },
  toLabel: { pt: "para", en: "to" },
  toValue: properNoun("Iago Benvindo"),
  subjectLabel: { pt: "assunto", en: "subject" },
  subjectValue: { pt: "o seu próximo projeto", en: "your next project" },
  sendVia: { pt: "enviar por", en: "send via" },
} satisfies Record<string, Localized>;

export function Contact({ locale }: { locale: Locale }) {
  const named = (label: Localized, hint: Localized, extra = "") =>
    `${t(label, locale)}: ${t(hint, locale)}${extra}`;
  const links: ContactLink[] = [
    {
      id: "whatsapp",
      label: t(contactCopy.whatsappLabel, locale),
      name: named(contactCopy.whatsappLabel, contactCopy.whatsappHint),
      href: whatsappHref(t(contactCopy.whatsappMessage, locale)),
      external: true,
    },
    {
      id: "email",
      label: t(contactCopy.emailLabel, locale),
      name: named(contactCopy.emailLabel, contactCopy.emailHint, ` ${contact.email}`),
      href: `mailto:${contact.email}`,
    },
    {
      id: "linkedin",
      label: t(contactCopy.linkedinLabel, locale),
      name: named(contactCopy.linkedinLabel, contactCopy.linkedinHint),
      href: contact.linkedin,
      external: true,
    },
    {
      id: "github",
      label: t(contactCopy.githubLabel, locale),
      name: named(contactCopy.githubLabel, contactCopy.githubHint),
      href: contact.github,
      external: true,
    },
  ];
  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-heading"
      data-window={t(composeCopy.windowTitle, locale)}
    >
      <div className="contact__body">
        <div className="contact__message">
          <h2 id="contact-heading" className="section__title">
            {t(heading, locale)}
          </h2>
          <dl className="contact__headers">
            <div className="contact__field">
              <dt>{t(composeCopy.toLabel, locale)}:</dt>
              <dd>{t(composeCopy.toValue, locale)}</dd>
            </div>
            <div className="contact__field">
              <dt>{t(composeCopy.subjectLabel, locale)}:</dt>
              <dd>{t(composeCopy.subjectValue, locale)}</dd>
            </div>
          </dl>
          <p className="contact__intro">{t(contactCopy.intro, locale)}</p>
        </div>
        <div className="contact__send">
          <p id="contact-via" className="contact__via">
            {t(composeCopy.sendVia, locale)}
          </p>
          <ContactLinks links={links} labelledBy="contact-via" />
        </div>
      </div>
    </section>
  );
}
