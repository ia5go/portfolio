import type { ReactNode } from "react";
import { contact } from "@/content/contact";
import { t, type Locale, type Localized } from "@/content/localized";
import "./whatsapp-button.css";

/** wa.me link that opens a chat with a pre-filled message. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Reusable WhatsApp action. Pass the pre-filled `message` as a Localized Field;
 * it is resolved in the page `locale`. Children are the button label.
 */
export function WhatsAppButton({
  locale,
  message,
  children,
  className = "",
}: {
  locale: Locale;
  message: Localized;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`whatsapp-button ${className}`.trim()}
      href={whatsappHref(t(message, locale))}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
