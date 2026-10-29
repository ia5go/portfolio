import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePt from "./(pt)/page";
import HomeEn from "./(en)/en/page";

function group(name: RegExp) {
  return screen.getByRole("article", { name });
}
function items(el: HTMLElement) {
  return within(el)
    .getAllByRole("listitem")
    .map((li) => li.textContent);
}

describe("Skills section", () => {
  it("renders delivered, lab and tools groups in English", () => {
    render(<HomeEn />);
    const delivered = group(/Delivered in production/);
    const lab = group(/^Lab$/);
    const tools = group(/Automation and tools/);
    expect(delivered).toHaveAttribute("data-tier", "delivered");
    expect(lab).toHaveAttribute("data-tier", "lab");
    expect(items(delivered)).toHaveLength(23);
    expect(items(delivered)).toContain("Adobe XD");
    expect(items(lab)).toEqual(["Node.js", "React Native", "Supabase"]);
    expect(items(tools)).toEqual([
      "Monday",
      "Slack",
      "Zendesk",
      "Gmail",
      "Tool integrations",
      "Claude",
      "Anthropic API",
      "Vercel",
    ]);
  });

  it("renders labels in Portuguese", () => {
    render(<HomePt />);
    expect(group(/Entregues em produção/)).toBeInTheDocument();
    expect(group(/Laboratório/)).toBeInTheDocument();
    const tools = group(/Automação e ferramentas/);
    expect(items(tools)).toContain("API da Anthropic");
  });

  it("does not list Claude subagents", () => {
    render(<HomeEn />);
    const lists = [
      /Delivered in production/,
      /^Lab$/,
      /Automation and tools/,
    ].map((name) => group(name));
    for (const el of lists) {
      expect(within(el).queryByText(/subagent/i)).not.toBeInTheDocument();
    }
  });
});
