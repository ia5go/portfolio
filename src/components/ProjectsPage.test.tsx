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
    const homeCount = screen.getAllByRole("article").length;
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

  it("links back to Home in each language", () => {
    const pt = render(<ProjectsPage locale="pt" />);
    expect(
      screen.getByRole("link", { name: /Voltar para o início/ }).getAttribute("href"),
    ).toBe("/");
    pt.unmount();
    render(<ProjectsPage locale="en" />);
    expect(screen.getByRole("link", { name: /Back to Home/ }).getAttribute("href")).toBe("/en");
    expect(screen.getAllByText("Website development").length).toBeGreaterThan(6);
  });
});
