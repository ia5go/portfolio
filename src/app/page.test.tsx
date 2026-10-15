import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomePage } from "@/components/HomePage";
import Page from "./page";

describe("Home page", () => {
  it("opens in Portuguese by default", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Iago Benvindo" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Do orçamento ao ar/)).toBeInTheDocument();
  });

  it("renders the English copy for the en locale", () => {
    render(<HomePage locale="en" />);
    expect(screen.getByText(/From quote to launch/)).toBeInTheDocument();
    expect(screen.queryByText(/Do orçamento ao ar/)).not.toBeInTheDocument();
  });
});
