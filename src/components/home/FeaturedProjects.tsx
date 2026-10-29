import { t, type Locale, type Localized } from "@/content/localized";
import { projects, selectFeatured } from "@/content/projects";
import { pagePath } from "@/content/routes";
import { ProjectCard } from "../projects/ProjectCard";
import "./featured-projects.css";

export const heading: Localized = {
  pt: "Projetos em destaque",
  en: "Featured projects",
};

const seeAll: Localized = {
  pt: "Ver todos os projetos",
  en: "See all projects",
};

export function FeaturedProjects({ locale }: { locale: Locale }) {
  return (
    <section id="featured-projects" className="section" aria-labelledby="featured-projects-heading">
      <h2 id="featured-projects-heading" className="section__title">
        {t(heading, locale)}
      </h2>
      <div className="featured-projects__grid">
        {selectFeatured(projects).map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </div>
      <a className="featured-projects__all" href={pagePath("projects", locale)}>
        {t(seeAll, locale)}
      </a>
    </section>
  );
}
