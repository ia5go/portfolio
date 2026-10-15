import { placeholder } from "@/content/home-placeholder";
import { t, type Locale } from "@/content/localized";

// Slot file: the Hero ticket replaces this body.
export function Hero({ locale }: { locale: Locale }) {
  return (
    <section id="hero" className="hero">
      <p className="eyebrow">{t(placeholder.eyebrow, locale)}</p>
      <h1 className="glitch-title">{t(placeholder.name, locale)}</h1>
      <p className="subtitle">{t(placeholder.subtitle, locale)}</p>
    </section>
  );
}
