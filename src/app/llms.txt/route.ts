import { contact } from "@/content/contact";
import { experience } from "@/content/experience";
import { heroCopy } from "@/content/hero";
import { t } from "@/content/localized";
import { projects } from "@/content/projects";
import { pagePath } from "@/content/routes";
import { siteDescription, siteName, siteUrl } from "@/content/site";

export const dynamic = "force-static";

/** llms.txt: a plain-Markdown summary of the site for AI assistants and crawlers. */
export function GET() {
  const en = (path: string) => `${siteUrl}${path}`;
  const lines = [
    `# ${t(siteName, "en")}`,
    "",
    `> ${t(siteDescription, "en")} ${t(heroCopy.eyebrow, "en")}.`,
    "",
    "Bilingual portfolio (Portuguese at the root, English under /en). Both languages have the same content.",
    "",
    "## Pages",
    "",
    `- [Home (English)](${en(pagePath("home", "en"))}): about, skills, experience, consulting, education and contact`,
    `- [Projects (English)](${en(pagePath("projects", "en"))}): every site built, with a link to the live result`,
    `- [Início (Português)](${en(pagePath("home", "pt"))}): sobre, habilidades, experiência, consultoria, formação e contato`,
    `- [Projetos (Português)](${en(pagePath("projects", "pt"))}): todos os sites desenvolvidos, com link para o resultado no ar`,
    "",
    "## Experience",
    "",
    ...experience.map(
      (e) => `- ${t(e.role, "en")}, ${t(e.company, "en")} (${e.start} to ${e.end ?? "present"})`,
    ),
    "",
    "## Selected projects",
    "",
    ...projects.map((p) => `- [${p.name}](${p.url}): ${t(p.segment, "en")}`),
    "",
    "## Contact",
    "",
    `- Email: ${contact.email}`,
    `- LinkedIn: ${contact.linkedin}`,
    `- GitHub: ${contact.github}`,
    `- WhatsApp: https://wa.me/${contact.whatsappNumber}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
