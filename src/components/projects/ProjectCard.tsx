import { t, type Locale, type Localized } from "@/content/localized";
import type { Project } from "@/content/projects";
import { newTabHint } from "@/content/site";
import "./project-card.css";

const visitLabel: Localized = {
  pt: "Visitar site",
  en: "Visit site",
};

/**
 * Reusable Project card (Home Page and Projects Page): screenshot, name, the segment as
 * a small tag, and a compact link to the live site on its own line. The role line and
 * description stay in the data but are not rendered on the card.
 */
export function ProjectCard({
  project,
  locale,
  headingLevel = 3,
}: {
  project: Project;
  locale: Locale;
  /** The page's heading level above the cards plus one (h2 on the Projects page). */
  headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
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
        <Heading className="project-card__name">{project.name}</Heading>
        <div className="project-card__meta">
          <p className="project-card__tag">{t(project.segment, locale)}</p>
          <a
            className="project-card__link"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t(visitLabel, locale)}: ${project.name} (${t(newTabHint, locale)})`}
          >
            {t(visitLabel, locale)}
          </a>
        </div>
      </div>
    </article>
  );
}
