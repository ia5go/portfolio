import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "./HomePage";
import { ProjectsPage } from "./ProjectsPage";

const excluded = [
  /F[aá]tima Pissarra/i,
  /Sou Mais Gr[aá]fica/i,
  /RR Medical/i,
  /Plano Brasil Sa[uú]de/i,
];

describe("Home vs Projects Page", () => {
  it("Home shows six projects while the Projects Page shows the full list", () => {
    const home = render(<HomePage locale="pt" />);
    const homeCount = within(
      document.getElementById("featured-projects") as HTMLElement,
    ).getAllByRole("article").length;
    home.unmount();
    render(<ProjectsPage locale="pt" />);
    expect(homeCount).toBe(6);
    expect(screen.getAllByRole("article").length).toBeGreaterThan(6);
    expect(screen.getByRole("heading", { name: "RI Lauro de Freitas" })).toBeTruthy();
  });

  it("does not list the sites without a valid screenshot", () => {
    render(<ProjectsPage locale="pt" />);
    for (const card of screen.getAllByRole("article")) {
      const name = within(card).getByRole("heading").textContent ?? "";
      for (const re of excluded) expect(name).not.toMatch(re);
    }
  });

  it("uses the compact card: no role line or description on any card", () => {
    render(<ProjectsPage locale="en" />);
    expect(screen.queryByText("Website development")).toBeNull();
    for (const card of screen.getAllByRole("article")) {
      expect(card.querySelectorAll("p")).toHaveLength(1);
      expect(within(card).getByRole("link").textContent).toBe("Visit site");
    }
  });

  it("links back to Home in each language with a `cd ~` command chip", () => {
    const pt = render(<ProjectsPage locale="pt" />);
    const ptLink = screen.getByRole("link", { name: "cd ~ # início: voltar para o início" });
    expect(ptLink.getAttribute("href")).toBe("/");
    expect(ptLink.textContent).toBe("cd ~# início");
    pt.unmount();
    render(<ProjectsPage locale="en" />);
    const enLink = screen.getByRole("link", { name: "cd ~ # home: back to home" });
    expect(enLink.getAttribute("href")).toBe("/en");
    expect(enLink.textContent).toBe("cd ~# home");
    expect(screen.getAllByRole("link", { name: /^Visit site: / }).length).toBeGreaterThan(6);
  });
});
