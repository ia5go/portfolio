import { localeMetadata } from "@/content/metadata";
import { ProjectsPage } from "@/components/ProjectsPage";

export const metadata = localeMetadata("pt", "projects");

export default function Page() {
  return <ProjectsPage locale="pt" />;
}
