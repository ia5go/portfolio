import { whatsappHref } from "@/components/WhatsAppButton";
import { contact, contactCopy } from "@/content/contact";
import { t, type Locale, type Localized } from "@/content/localized";
import { ContactLinks, type ContactLink } from "./ContactLinks";
import "./contact.css";

export const heading: Localized = {
  pt: "Contato",
  en: "Contact",
};

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
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <p>{t(contactCopy.intro, locale)}</p>
      <ContactLinks links={links} />
    </section>
  );
}
