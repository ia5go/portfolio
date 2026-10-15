import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePt from "./(pt)/page";
import HomeEn from "./(en)/en/page";

const number = "5524992463369";

function waLinks() {
  return screen
    .getAllByRole("link")
    .filter((a) => a.getAttribute("href")?.startsWith("https://wa.me/"))
    // the Consulting section has its own automation-specific button
    .filter((a) => !/automa/i.test(a.getAttribute("href")!));
}

describe("Contact (pt)", () => {
  it("opens WhatsApp with a Portuguese pre-filled message, in strip and section", () => {
    render(<HomePt />);
    const links = waLinks();
    expect(links).toHaveLength(2);
    for (const a of links) {
      const url = new URL(a.getAttribute("href")!);
      expect(url.pathname).toBe(`/${number}`);
      expect(url.searchParams.get("text")).toMatch(/Olá, Iago/);
    }
  });

  it("places the strip between Featured Projects and About", () => {
    render(<HomePt />);
    const titles = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(titles.slice(0, 3)).toEqual([
      "Projetos em destaque",
      "Vamos conversar?",
      "Sobre",
    ]);
    expect(
      screen.getByText(/Gostou do que viu\? Vamos conversar sobre o seu projeto/),
    ).toBeInTheDocument();
  });

  it("lists WhatsApp, email, LinkedIn and GitHub in the Contact section", () => {
    render(<HomePt />);
    const section = document.getElementById("contact")!;
    const hrefs = within(section)
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"));
    expect(hrefs[0]).toMatch(/^https:\/\/wa\.me\//);
    expect(hrefs.slice(1)).toEqual([
      "mailto:benvindoiago@outlook.com",
      "https://www.linkedin.com/in/iago-benvindo-6b3b031b4/",
      "https://github.com/ia5go",
    ]);
  });
});

describe("Contact (en)", () => {
  it("pre-fills the WhatsApp message in English", () => {
    render(<HomeEn />);
    for (const a of waLinks()) {
      const url = new URL(a.getAttribute("href")!);
      expect(url.searchParams.get("text")).toMatch(/Hi Iago/);
    }
    expect(screen.getByText(/Liked what you saw\?/)).toBeInTheDocument();
  });
});
