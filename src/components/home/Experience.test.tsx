import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Experience } from "./Experience";

describe("Experience timeline", () => {
  it("lists entries newest first with the top three highlighted (pt)", () => {
    const { container } = render(<Experience locale="pt" />);
    const items = Array.from(container.querySelectorAll(".timeline > li"));
    expect(items.map((i) => i.getAttribute("data-highlight"))).toEqual([
      "true",
      "true",
      "true",
      "false",
    ]);
    const roles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(roles).toEqual([
      "Gestor de Inovação",
      "Desenvolvedor autônomo e consultor técnico",
      "Full-Stack Developer",
      "Educador em programação e TI",
    ]);
    expect(screen.getByText("06/2026 – presente")).toBeInTheDocument();
    expect(screen.getByText("03/2025 – 05/2026")).toBeInTheDocument();
    expect(screen.getByText("06/2021 – 02/2025")).toBeInTheDocument();
    expect(screen.getByText("2016 – 2021")).toBeInTheDocument();
  });

  it("renders in English", () => {
    render(<Experience locale="en" />);
    expect(screen.getByText("Innovation Manager")).toBeInTheDocument();
    expect(screen.getByText("06/2026 – present")).toBeInTheDocument();
    expect(screen.getByText(/Esquire Brasil/)).toBeInTheDocument();
  });

  it("describes the To-Do product as launching soon, without a link", () => {
    for (const locale of ["pt", "en"] as const) {
      const { container, unmount } = render(<Experience locale={locale} />);
      expect(container.textContent).toMatch(/To-Do/);
      expect(container.textContent).toMatch(/em breve|launching soon/);
      expect(container.querySelectorAll("a")).toHaveLength(0);
      unmount();
    }
  });

  it("shows no excluded content (retail job, other clients, financial values)", () => {
    for (const locale of ["pt", "en"] as const) {
      const { container, unmount } = render(<Experience locale={locale} />);
      const text = container.textContent ?? "";
      expect(text).not.toMatch(/varejo|retail|loja|store|vendedor|salesperson|cashier|caixa/i);
      expect(text).not.toMatch(
        /Girassol|DNA Gen|Irmã Dulce|Engemon|Platinum|Lauro de Freitas|Brasqu|Osmilto|Fátima|Mais Gráfica|RR Medical|Plano Brasil/i,
      );
      expect(text).not.toMatch(/R\$|US\$|€|\d+\s?(mil|k)\b|\d+%|funcionários|employees/i);
      unmount();
    }
  });
});
