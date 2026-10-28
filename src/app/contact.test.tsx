import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePt from "./(pt)/page";
import HomeEn from "./(en)/en/page";
import { easeInOut, lerpRect, MOVE_MS, nextStep, overlap, REST_MS } from "@/components/home/ContactLinks";

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

  it("shows labels only, in order, with meaningful accessible names", () => {
    render(<HomePt />);
    const section = document.getElementById("contact")!;
    expect(
      within(section).getByText("Me chame no WhatsApp ou use o canal que preferir."),
    ).toBeInTheDocument();
    const links = within(section).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual(["WhatsApp", "E-mail", "LinkedIn", "GitHub"]);
    expect(links.map((a) => a.getAttribute("aria-label"))).toEqual([
      "WhatsApp: conversar comigo",
      "E-mail: escrever para benvindoiago@outlook.com",
      "LinkedIn: meu perfil profissional",
      "GitHub: veja meu código",
    ]);
    // each accessible name starts with the visible label (WCAG 2.5.3)
    for (const a of links) expect(a.getAttribute("aria-label")!.startsWith(a.textContent!)).toBe(true);
    expect(section.querySelector(".contact-links__box")).toHaveAttribute("aria-hidden", "true");
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

describe("Contact (en) labels", () => {
  it("labels the buttons in English", () => {
    render(<HomeEn />);
    const section = document.getElementById("contact")!;
    expect(
      within(section).getByText("Message me on WhatsApp or use whichever channel you prefer."),
    ).toBeInTheDocument();
    const links = within(section).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual(["WhatsApp", "Email", "LinkedIn", "GitHub"]);
    expect(links[1]).toHaveAccessibleName("Email: write to benvindoiago@outlook.com");
    expect(links[3]).toHaveAccessibleName("GitHub: see my code");
  });
});

describe("Contact compose window", () => {
  it("reads as a new message to Iago, in each language, with a labelled button group", () => {
    for (const [Page, title, to, subject, via] of [
      [HomePt, "nova mensagem", "para:", "o seu próximo projeto", "enviar por"],
      [HomeEn, "new message", "to:", "your next project", "send via"],
    ] as const) {
      const { unmount } = render(<Page />);
      const section = document.getElementById("contact")!;
      expect(section).toHaveAttribute("data-window", title);
      expect(within(section).getByText(to)).toBeInTheDocument();
      expect(within(section).getByText("Iago Benvindo")).toBeInTheDocument();
      expect(within(section).getByText(subject)).toBeInTheDocument();
      expect(within(section).getByRole("list", { name: via })).toBeInTheDocument();
      unmount();
    }
  });
});

describe("ContactLinks motion maths", () => {
  it("rests about 2 s and moves in 400 to 500 ms", () => {
    expect(REST_MS).toBe(2000);
    expect(MOVE_MS).toBeGreaterThanOrEqual(400);
    expect(MOVE_MS).toBeLessThanOrEqual(500);
  });

  it("eases in and out, monotonically, from 0 to 1", () => {
    expect(easeInOut(0)).toBe(0);
    expect(easeInOut(0.5)).toBeCloseTo(0.5);
    expect(easeInOut(1)).toBe(1);
    expect(easeInOut(0.1)).toBeLessThan(0.1);
    expect(easeInOut(0.9)).toBeGreaterThan(0.9);
    let prev = -1;
    for (let i = 0; i <= 100; i++) {
      const v = easeInOut(i / 100);
      expect(v).toBeGreaterThanOrEqual(prev);
      prev = v;
    }
  });

  it("interpolates position and size in 2D", () => {
    const a = { x: 0, y: 0, w: 100, h: 48 };
    const b = { x: 120, y: 60, w: 140, h: 48 };
    expect(lerpRect(a, b, 0.5)).toEqual({ x: 60, y: 30, w: 120, h: 48 });
  });

  it("finds the part of a label the box covers, in the label's coordinates", () => {
    const label = { x: 100, y: 10, w: 80, h: 20 };
    const none = { x: 0, y: 0, w: 0, h: 0 };
    expect(overlap({ x: 0, y: 0, w: 100, h: 50 }, label)).toEqual(none);
    expect(overlap({ x: 140, y: 0, w: 100, h: 50 }, label)).toEqual({ x: 40, y: 0, w: 40, h: 20 });
    expect(overlap({ x: 90, y: 0, w: 100, h: 50 }, label)).toEqual({ x: 0, y: 0, w: 80, h: 20 });
    expect(overlap({ x: 100, y: 20, w: 80, h: 50 }, label)).toEqual({ x: 0, y: 10, w: 80, h: 10 });
  });
});

describe("ContactLinks back-and-forth cycle", () => {
  it("visits neighbours only and turns around at both ends", () => {
    let at = 0;
    let dir: 1 | -1 = 1;
    const path = [at];
    for (let i = 0; i < 8; i++) {
      ({ to: at, dir } = nextStep(at, dir, 4));
      path.push(at);
    }
    expect(path).toEqual([0, 1, 2, 3, 2, 1, 0, 1, 2]);
  });
});
