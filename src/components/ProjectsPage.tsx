import { t, type Locale, type Localized } from "@/content/localized";
import { projects } from "@/content/projects";
import { pagePath } from "@/content/routes";
import { projectsPageCopy } from "@/content/site";
import { ProjectCard } from "./projects/ProjectCard";
import { Nav } from "./site/Nav";
import "./projects/projects-page.css";

const backToHome: Localized = {
  pt: "Voltar para o início",
  en: "Back to Home",
};

/** Every online site that has a valid screenshot (the manifest), same card as the Home Page. */
export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Nav locale={locale} page="projects" />
      <main className="home">
        <section className="section">
          <a className="projects-page__back" href={pagePath("home", locale)}>
            ← {t(backToHome, locale)}
          </a>
          <h1 className="section__title">{t(projectsPageCopy.title, locale)}</h1>
          <p>{t(projectsPageCopy.intro, locale)}</p>
          <div className="projects-page__grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
