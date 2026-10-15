import { t, type Locale } from "@/content/localized";
import { projectsPageCopy } from "@/content/site";
import { Nav } from "./site/Nav";

// Skeleton: the Projects Page ticket fills in the list of Projects.
export function ProjectsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Nav locale={locale} page="projects" />
      <main className="home">
        <section className="section">
          <h1 className="section__title">{t(projectsPageCopy.title, locale)}</h1>
          <p>{t(projectsPageCopy.intro, locale)}</p>
        </section>
      </main>
    </>
  );
}
