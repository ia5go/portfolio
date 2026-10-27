import { t, type Locale, type Localized } from "@/content/localized";
import type { Project } from "@/content/projects";
import "./project-card.css";

const visitLabel: Localized = {
  pt: "Visitar site",
  en: "Visit site",
};

/**
 * Reusable Project card (Home Page and Projects Page): screenshot, name, segment and a
 * compact link to the live site. The role line and description stay in the data but
 * are not rendered on the card.
 */
export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <article className="project-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="project-card__image"
        src={project.image.src}
        width={project.image.width}
        height={project.image.height}
        alt={`${project.name}: ${t(project.segment, locale)}`}
        loading="lazy"
        decoding="async"
      />
      <div className="project-card__body">
        <h3 className="project-card__name">{project.name}</h3>
        <div className="project-card__meta">
          <p className="project-card__segment">{t(project.segment, locale)}</p>
          <a
            className="project-card__link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t(visitLabel, locale)}: ${project.name}`}
          >
            {t(visitLabel, locale)}
          </a>
        </div>
      </div>
    </article>
  );
}
