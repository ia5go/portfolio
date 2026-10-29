import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePt from "./(pt)/page";
import ProjectsPt from "./(pt)/projects/page";
import HomeEn from "./(en)/en/page";
import ProjectsEn from "./(en)/en/projects/page";

function switchLinks() {
  const group = screen.getByRole("group", { name: /idioma|language/i });
  return {
    pt: within(group).getByText("PT").closest("a"),
    en: within(group).getByText("EN").closest("a"),
  };
}

const ptTitles = [
  "Projetos em destaque",
  "Vamos conversar?",
  "Sobre",
  "Habilidades",
  "Experiência",
  "Consultoria e automação",
  "Formação e cursos",
  "Contato",
];
const enTitles = [
  "Featured projects",
  "Shall we talk?",
  "About",
  "Skills",
  "Experience",
  "Consulting and automation",
  "Formation and courses",
  "Contact",
];

describe("Home Page", () => {
  it("renders in Portuguese at the root route", () => {
    render(<HomePt />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Iago Benvindo" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Do orçamento ao ar/)).toBeInTheDocument();
    expect(screen.queryByText(/From quote to launch/)).not.toBeInTheDocument();
  });

  it("renders in English under /en", () => {
    render(<HomeEn />);
    expect(screen.getByText(/From quote to launch/)).toBeInTheDocument();
    expect(screen.queryByText(/Do orçamento ao ar/)).not.toBeInTheDocument();
  });

  it("lists sections in spec order (pt)", () => {
    render(<HomePt />);
    const titles = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(titles).toEqual(ptTitles);
  });

  it("lists sections in spec order (en)", () => {
    render(<HomeEn />);
    const titles = screen
      .getAllByRole("heading", { level: 2 })
      .map((h) => h.textContent);
    expect(titles).toEqual(enTitles);
  });

  it("switches to the equivalent page in the other language", () => {
    const pt = render(<HomePt />);
    expect(switchLinks().en).toHaveAttribute("href", "/en");
    expect(switchLinks().pt).toHaveAttribute("href", "/");
    pt.unmount();

    render(<HomeEn />);
    expect(switchLinks().pt).toHaveAttribute("href", "/");
  });
});

describe("Home Page complete section order", () => {
  const expected = [
    "hero",
    "featured-projects",
    "contact-strip",
    "about",
    "skills",
    "experience",
    "consulting",
    "formation",
    "contact",
  ];

  it.each([
    ["pt", HomePt],
    ["en", HomeEn],
  ])("renders all nine sections in spec order (%s)", (_locale, Page) => {
    const { container } = render(<Page />);
    const ids = Array.from(container.querySelectorAll("main > section")).map(
      (s) => s.id,
    );
    expect(ids).toEqual(expected);
  });
});

describe("Projects Page", () => {
  it("renders in both locales with a switch to the equivalent page", () => {
    const pt = render(<ProjectsPt />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Projetos" }),
    ).toBeInTheDocument();
    expect(switchLinks().en).toHaveAttribute("href", "/en/projects");
    pt.unmount();

    render(<ProjectsEn />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Projects" }),
    ).toBeInTheDocument();
    expect(switchLinks().pt).toHaveAttribute("href", "/projects");
  });
});
