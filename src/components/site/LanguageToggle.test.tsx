import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const switchLocale = vi.fn();
let insideProvider = true;
vi.mock("./LocaleProvider", () => ({
  useSwitchLocale: () => (insideProvider ? switchLocale : null),
}));

import { LanguageToggle } from "./LanguageToggle";

beforeEach(() => {
  switchLocale.mockReset();
  insideProvider = true;
});

afterEach(() => vi.restoreAllMocks());

const group = () => screen.getByRole("group");
const option = (name: "PT" | "EN") => screen.getByRole("link", { name });

describe("LanguageToggle", () => {
  it("links each language to the same page and marks the current one", () => {
    render(<LanguageToggle locale="pt" page="projects" />);
    expect(option("PT")).toHaveAttribute("href", "/projects");
    expect(option("EN")).toHaveAttribute("href", "/en/projects");
    expect(option("PT")).toHaveAttribute("aria-current", "true");
    expect(option("EN")).not.toHaveAttribute("aria-current");
    expect(option("PT")).toHaveAttribute("data-active", "true");
    expect(group()).toHaveStyle({ "--lang-index": "0" });
  });

  it("slides the thumb and switches the language in place, without navigating", () => {
    render(<LanguageToggle locale="pt" page="home" />);
    const notPrevented = fireEvent.click(option("EN"));

    expect(notPrevented).toBe(false);
    expect(switchLocale).toHaveBeenCalledWith("en");
    expect(group()).toHaveAttribute("data-selected", "en");
    expect(group()).toHaveStyle({ "--lang-index": "1" });
    expect(option("EN")).toHaveAttribute("data-active", "true");
  });

  it("follows the language once the URL has switched", () => {
    const { rerender } = render(<LanguageToggle locale="pt" page="home" />);
    rerender(<LanguageToggle locale="en" page="home" />);
    expect(group()).toHaveAttribute("data-selected", "en");
    expect(option("EN")).toHaveAttribute("aria-current", "true");
  });

  it("does nothing when the selected language is clicked", () => {
    render(<LanguageToggle locale="en" page="home" />);
    fireEvent.click(option("EN"));
    expect(switchLocale).not.toHaveBeenCalled();
  });

  it("can be switched back mid-animation", () => {
    render(<LanguageToggle locale="pt" page="home" />);
    fireEvent.click(option("EN"));
    fireEvent.click(option("PT"));
    expect(switchLocale.mock.calls).toEqual([["en"], ["pt"]]);
    expect(group()).toHaveAttribute("data-selected", "pt");
  });

  it("leaves a modified click (new tab) to the browser", () => {
    render(<LanguageToggle locale="pt" page="home" />);
    const notPrevented = fireEvent.click(option("EN"), { ctrlKey: true });
    expect(notPrevented).toBe(true);
    expect(switchLocale).not.toHaveBeenCalled();
  });

  it("is a plain link to the other language outside the provider", () => {
    insideProvider = false;
    render(<LanguageToggle locale="pt" page="home" />);
    const notPrevented = fireEvent.click(option("EN"));
    expect(notPrevented).toBe(true);
    expect(group()).toHaveAttribute("data-selected", "pt");
  });
});
