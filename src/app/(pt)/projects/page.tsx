import { localeMetadata } from "@/content/metadata";
import { ProjectsPage } from "@/components/ProjectsPage";
import { JsonLd } from "@/components/site/JsonLd";

export const metadata = localeMetadata("pt", "projects");

export default function Page() {
  return (
    <>
      <JsonLd page="projects" locale="pt" />
      <ProjectsPage locale="pt" />
    </>
  );
}
