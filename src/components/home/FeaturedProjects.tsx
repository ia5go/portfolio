import { t, type Locale, type Localized } from "@/content/localized";

export const heading: Localized = {
  pt: "Projetos em destaque",
  en: "Featured projects",
};

// Slot file: the owning ticket replaces the body of this section.
export function FeaturedProjects({ locale }: { locale: Locale }) {
  return (
    <section id="featured-projects" className="section" aria-labelledby="featured-projects-heading">
      <h2 id="featured-projects-heading" className="section__title">
        {t(heading, locale)}
      </h2>
    </section>
  );
}
