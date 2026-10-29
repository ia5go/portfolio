import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeaturedProjects } from "./FeaturedProjects";

const names = [
  "Girassol Azul",
  "DNA Genética",
  "Irmã Dulce (OSID)",
  "Esquire Brasil",
  "Engemon",
  "Platinum",
];

describe("Featured projects (Home Page)", () => {
  it("shows exactly six cards in the specified order", () => {
    render(<FeaturedProjects locale="pt" />);
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(6);
    expect(cards.map((c) => within(c).getByRole("heading").textContent)).toEqual(names);
  });

  it("each card shows screenshot, segment, role line and a live link", () => {
    render(<FeaturedProjects locale="pt" />);
    for (const card of screen.getAllByRole("article")) {
      expect(within(card).getByRole("img").getAttribute("src")).toMatch(
        /^\/projects\/.+\.webp$/,
      );
      expect(within(card).getByRole("link").getAttribute("href")).toMatch(/^https:\/\//);
    }
    expect(screen.getAllByText("Desenvolvimento do site")).toHaveLength(6);
  });

  it("uses the neutral crop asset for Platinum", () => {
    render(<FeaturedProjects locale="pt" />);
    const card = screen.getByRole("heading", { name: "Platinum" }).closest("article")!;
    expect(within(card).getByRole("img").getAttribute("src")).toBe("/projects/platinum.webp");
  });

  it("links 'see all' to the Projects Page of the current language", () => {
    const pt = render(<FeaturedProjects locale="pt" />);
    expect(
      screen.getByRole("link", { name: "Ver todos os projetos" }).getAttribute("href"),
    ).toBe("/projects");
    pt.unmount();
    render(<FeaturedProjects locale="en" />);
    expect(screen.getByRole("link", { name: "See all projects" }).getAttribute("href")).toBe(
      "/en/projects",
    );
    expect(screen.getAllByText("Website development")).toHaveLength(6);
  });
});
