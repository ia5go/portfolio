import { localeMetadata } from "@/content/metadata";
import { ProjectsPage } from "@/components/ProjectsPage";

export const metadata = localeMetadata("en", "projects");

export default function Page() {
  return <ProjectsPage locale="en" />;
}
