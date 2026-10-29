import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormationCourses } from "./FormationCourses";
import { courseGroups } from "@/content/formation";

describe("Formation and courses card", () => {
  it("renders the degree and all courses in Portuguese", () => {
    render(<FormationCourses locale="pt" />);
    expect(screen.getByText(/Tecnólogo em Tecnologia da Informação/)).toBeTruthy();
    expect(screen.getByText(/FAETERJ · 2015 – 2020/)).toBeTruthy();
    expect(screen.getByText(/Inglês: Avançado/)).toBeTruthy();
    expect(screen.getByText("Git Completo")).toBeTruthy();
    expect(screen.getByText("Princípios SOLID")).toBeTruthy();
    expect(screen.getAllByText(/Anthropic Academy/)).toHaveLength(7);
    expect(screen.getByText("AI Hero Skills Workflow")).toBeTruthy();
  });

  it("renders in English", () => {
    render(<FormationCourses locale="en" />);
    expect(screen.getByText(/Associate degree/)).toBeTruthy();
    expect(screen.getByText(/English: Advanced/)).toBeTruthy();
    expect(screen.getByText("Git Complete")).toBeTruthy();
    expect(screen.getByText("SOLID principles")).toBeTruthy();
  });

  it("carries no query string or tracking parameters in any link", () => {
    const urls = courseGroups
      .flatMap((g) => g.courses.map((c) => c.url))
      .filter((u): u is string => Boolean(u));
    const { container } = render(<FormationCourses locale="en" />);
    const hrefs = [
      ...urls,
      ...Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href") ?? ""),
    ];
    for (const href of hrefs) {
      const u = new URL(href);
      expect(u.search).toBe("");
      expect(u.hash).toBe("");
    }
  });
});
