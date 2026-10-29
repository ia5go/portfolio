import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePt from "./(pt)/page";
import HomeEn from "./(en)/en/page";

describe("Consulting and automation", () => {
  it("renders after Experience and opens WhatsApp with the automation message (pt)", () => {
    render(<HomePt />);
    const titles = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(titles.indexOf("Consultoria e automação")).toBe(
      titles.indexOf("Experiência") + 1,
    );
    const link = screen.getByRole("link", { name: "Falar sobre automação" });
    const url = new URL(link.getAttribute("href")!);
    expect(url.pathname).toBe("/5524992463369");
    expect(url.searchParams.get("text")).toMatch(/automação/);
  });

  it("renders in English with an English message", () => {
    render(<HomeEn />);
    const link = screen.getByRole("link", { name: "Talk about automation" });
    const url = new URL(link.getAttribute("href")!);
    expect(url.searchParams.get("text")).toMatch(/automation/);
    expect(screen.getByText(/fintech/)).toBeInTheDocument();
  });

  it("mentions no numbers or money in the section", () => {
    render(<HomePt />);
    const section = document.getElementById("consulting")!;
    expect(section.textContent).not.toMatch(/\d|R\$|%/);
  });
});
