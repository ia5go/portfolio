import { placeholder } from "@/content/home-placeholder";
import { t, type Locale } from "@/content/localized";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <main className="home">
      <p className="eyebrow">{t(placeholder.eyebrow, locale)}</p>
      <h1 className="glitch-title">{t(placeholder.name, locale)}</h1>
      <p className="subtitle">{t(placeholder.subtitle, locale)}</p>
    </main>
  );
}
