import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

import { SiteFooter } from "./SiteFooter";

beforeEach(() => {
  pathname = "/";
});

const footer = () => screen.getByRole("contentinfo");
const windows = () => within(screen.getByRole("navigation"));

describe("SiteFooter", () => {
  it("is the page's contentinfo landmark with copyright, stack and version", () => {
    render(<SiteFooter locale="pt" />);
    expect(footer()).toHaveTextContent("© 2026 Iago Benvindo");
    expect(footer()).toHaveTextContent("Next.js · TypeScript");
    expect(footer()).toHaveTextContent(/v\d{4}\.\d{2}/);
  });

  it("shows availability, window list and back-to-top in Portuguese", () => {
    render(<SiteFooter locale="pt" />);
    expect(footer()).toHaveTextContent("Disponível para novos projetos");
    expect(screen.getByRole("navigation")).toHaveAccessibleName("Navegação do rodapé");
    expect(windows().getByRole("link", { name: "início" })).toHaveAttribute("href", "/");
    expect(windows().getByRole("link", { name: "projetos" })).toHaveAttribute("href", "/projects");
    expect(windows().getByRole("link", { name: "contato" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "topo: Voltar ao topo" })).toHaveAttribute("href", "#top");
  });

  it("shows the same in English, with English routes", () => {
    pathname = "/en";
    render(<SiteFooter locale="en" />);
    expect(footer()).toHaveTextContent("Available for new projects");
    expect(screen.getByRole("navigation")).toHaveAccessibleName("Footer navigation");
    expect(windows().getByRole("link", { name: "home" })).toHaveAttribute("href", "/en");
    expect(windows().getByRole("link", { name: "projects" })).toHaveAttribute("href", "/en/projects");
    expect(windows().getByRole("link", { name: "contact" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "top: Back to top" })).toHaveAttribute("href", "#top");
  });

  it("marks the page on screen tmux-style and points Contact back to the Home Page", () => {
    pathname = "/en/projects";
    render(<SiteFooter locale="en" />);
    const projects = windows().getByRole("link", { name: "projects" });
    expect(projects).toHaveAttribute("aria-current", "page");
    expect(projects).toHaveTextContent("2:projects*");
    expect(windows().getByRole("link", { name: "home" })).not.toHaveAttribute("aria-current");
    expect(windows().getByRole("link", { name: "contact" })).toHaveAttribute("href", "/en#contact");
  });

  it.each([
    ["pt", "baixar o CV em português", "baixar o CV em inglês"],
    ["en", "download the CV in Portuguese", "download the CV in English"],
  ] as const)("downloads the CV PDFs, labelled in %s", (locale, ptHint, enHint) => {
    render(<SiteFooter locale={locale} />);
    const pt = screen.getByRole("link", { name: `cv-pt.pdf: ${ptHint}` });
    const en = screen.getByRole("link", { name: `cv-en.pdf: ${enHint}` });
    expect(pt).toHaveAttribute("href", "/cv/iago-benvindo-cv-pt.pdf");
    expect(en).toHaveAttribute("href", "/cv/iago-benvindo-cv-en.pdf");
    for (const link of [pt, en]) {
      expect(link).toHaveAttribute("download");
      expect(link).toHaveAttribute("type", "application/pdf");
    }
    expect(pt).toHaveAttribute("hreflang", "pt");
    expect(en).toHaveAttribute("hreflang", "en");
  });

  it("follows the language on screen, not the one the route was served in", async () => {
    vi.resetModules();
    vi.doMock("./LocaleProvider", () => ({ useLocale: () => "en" }));
    const { SiteFooter: Switched } = await import("./SiteFooter");
    render(<Switched locale="pt" />);
    expect(footer()).toHaveTextContent("Available for new projects");
    vi.doUnmock("./LocaleProvider");
  });
});
