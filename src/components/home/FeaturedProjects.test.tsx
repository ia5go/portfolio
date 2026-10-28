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

  it("each card shows screenshot, name, segment tag and a live Visit link, and nothing else", () => {
    render(<FeaturedProjects locale="pt" />);
    for (const card of screen.getAllByRole("article")) {
      expect(within(card).getByRole("img").getAttribute("src")).toMatch(
        /^\/projects\/.+\.webp$/,
      );
      const link = within(card).getByRole("link");
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
      expect(link.textContent).toBe("Visitar site");
      // Heading (name) + segment tag only: no role line, no description.
      expect(card.querySelectorAll("p")).toHaveLength(1);
      expect(card.querySelector("p")!.className).toBe("project-card__tag");
    }
    expect(screen.getByText("Arte e cultura")).toBeTruthy();
    expect(screen.queryByText("Desenvolvimento do site")).toBeNull();
    expect(screen.queryByText(/incubadora de projetos/)).toBeNull();
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
    expect(screen.getByText("Arts and culture")).toBeTruthy();
    expect(screen.getAllByRole("link", { name: /^Visit site: / })).toHaveLength(6);
  });
});
