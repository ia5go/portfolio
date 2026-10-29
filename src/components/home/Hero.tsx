import { heroCopy, heroTargets } from "@/content/hero";
import { t, type Locale } from "@/content/localized";
import "./hero.css";

export function Hero({ locale }: { locale: Locale }) {
  const name = t(heroCopy.name, locale);
  return (
    <section id="hero" className="hero">
      <p className="eyebrow">{t(heroCopy.eyebrow, locale)}</p>
      <h1 className="glitch-title hero__name" data-text={name}>
        {name}
      </h1>
      <p className="subtitle">{t(heroCopy.subtitle, locale)}</p>
      <div className="hero__cta">
        <a className="btn btn--primary" href={heroTargets.projects}>
          {t(heroCopy.viewProjects, locale)}
        </a>
        <a className="btn btn--secondary" href={heroTargets.contact}>
          {t(heroCopy.requestQuote, locale)}
        </a>
      </div>
    </section>
  );
}
