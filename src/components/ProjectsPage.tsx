"use client";

import { t, type Locale, type Localized } from "@/content/localized";
import { projects } from "@/content/projects";
import { pagePath } from "@/content/routes";
import { projectsPageCopy } from "@/content/site";
import { ProjectCard } from "./projects/ProjectCard";
import { useLocale } from "./site/LocaleProvider";
import { Nav } from "./site/Nav";
import "./projects/projects-page.css";

/**
 * The way home, written as a shell command in the window's title bar: `cd ~` plus a
 * plain-language comment, so it reads to clients as well as to developers. The
 * accessible name keeps the visible words and spells the action out.
 */
const homeCommand = {
  comment: { pt: "# início", en: "# home" },
  label: { pt: "cd ~ # início: voltar para o início", en: "cd ~ # home: back to home" },
} satisfies Record<string, Localized>;

/** Every online site that has a valid screenshot (the manifest), same card as the Home Page. */
export function ProjectsPage({ locale: served }: { locale: Locale }) {
  const locale = useLocale(served);
  return (
    <>
      <Nav locale={locale} page="projects" />
      <main id="main" tabIndex={-1} className="home">
        <section id="projects" className="section projects-page">
          <a
            className="projects-page__home"
            href={pagePath("home", locale)}
            aria-label={t(homeCommand.label, locale)}
          >
            <span className="projects-page__chip">
              <span className="projects-page__cmd">cd ~</span>
              <span className="projects-page__comment">{t(homeCommand.comment, locale)}</span>
            </span>
          </a>
          <h1 className="section__title">{t(projectsPageCopy.title, locale)}</h1>
          <p>{t(projectsPageCopy.intro, locale)}</p>
          <div className="projects-page__grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} headingLevel={2} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
