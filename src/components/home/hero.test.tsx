import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import HomePt from "@/app/(pt)/page";
import HomeEn from "@/app/(en)/en/page";
import ProjectsPt from "@/app/(pt)/projects/page";

describe("Hero", () => {
  it("renders the Portuguese copy and CTAs", () => {
    render(<HomePt />);
    expect(
      screen.getByText("Full-Stack Developer · Gestor de Inovação"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Sites, landing pages e sistemas sob medida. Do orçamento ao ar, sem enrolação.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver projetos" })).toHaveAttribute(
      "href",
      "#featured-projects",
    );
    expect(
      screen.getByRole("link", { name: "Pedir orçamento" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("renders the English copy and CTAs", () => {
    render(<HomeEn />);
    expect(screen.getByText(/Innovation Manager/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
      "href",
      "#featured-projects",
    );
    expect(
      screen.getByRole("link", { name: "Request a quote" }),
    ).toHaveAttribute("href", "#contact");
  });

  it("CTA targets exist on the page", () => {
    const { container } = render(<HomePt />);
    expect(container.querySelector("#featured-projects")).not.toBeNull();
    expect(container.querySelector("#contact")).not.toBeNull();
  });
});

describe("Nav menu", () => {
  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    render(<HomePt />);
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    const close = screen.getByRole("button", { name: "Fechar menu" });
    expect(close).toHaveAttribute("aria-expanded", "true");
    await user.click(close);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes after choosing an anchor", async () => {
    const user = userEvent.setup();
    const { container } = render(<HomePt />);
    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    await user.click(container.querySelector('nav a[href="#about"]')!);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("exposes in-page anchors on Home only", () => {
    const home = render(<HomePt />);
    expect(home.container.querySelector('nav a[href="#about"]')).not.toBeNull();
    home.unmount();
    const projects = render(<ProjectsPt />);
    expect(projects.container.querySelector('nav a[href="#about"]')).toBeNull();
  });
});
