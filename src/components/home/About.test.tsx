import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { About } from "./About";

function stats() {
  const list = screen.getByRole("list");
  return within(list)
    .getAllByRole("listitem")
    .map((li) => li.textContent);
}

describe("About", () => {
  it("renders four stat cards in Portuguese", () => {
    render(<About locale="pt" />);
    expect(stats()).toEqual([
      "5+anos de desenvolvimento web",
      "25+sites entregues",
      "100+alunos ensinados",
      "∞bugs resolvidos",
    ]);
    expect(screen.getByText(/Sou desenvolvedor full-stack/)).toBeInTheDocument();
  });

  it("renders four stat cards in English", () => {
    render(<About locale="en" />);
    expect(stats()).toEqual([
      "5+years of web development",
      "25+sites delivered",
      "100+students taught",
      "∞bugs squashed",
    ]);
    expect(screen.getByText(/I'm a full-stack developer/)).toBeInTheDocument();
  });

  it("presents a developer, not AI as the delivery process", () => {
    for (const locale of ["pt", "en"] as const) {
      const { container, unmount } = render(<About locale={locale} />);
      expect(container.textContent).not.toMatch(/\bIA\b|\bAI\b/);
      unmount();
    }
  });
});
