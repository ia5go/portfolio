import { localeMetadata } from "@/content/metadata";
import { ProjectsPage } from "@/components/ProjectsPage";
import { JsonLd } from "@/components/site/JsonLd";

export const metadata = localeMetadata("en", "projects");

export default function Page() {
  return (
    <>
      <JsonLd page="projects" locale="en" />
      <ProjectsPage locale="en" />
    </>
  );
}
