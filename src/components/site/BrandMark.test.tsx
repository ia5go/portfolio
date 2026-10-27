import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Fresh module per test: the "intro already played this visit" flag lives in module scope.
async function loadBrandMark() {
  vi.resetModules();
  return import("./BrandMark");
}

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  window.sessionStorage.clear();
  scrollTo(0);
});

afterEach(() => {
  vi.useRealTimers();
});

const brand = () => screen.getByRole("link", { name: "Iago Benvindo" });

describe("BrandMark", () => {
  it("is a home link named with the full name, split into initials and the rest", async () => {
    const { BrandMark } = await loadBrandMark();
    const { container } = render(<BrandMark name="Iago Benvindo" href="/" />);
    expect(brand()).toHaveAttribute("href", "/");
    const live = container.querySelector(".brand-mark__live");
    const parts = [...live!.querySelectorAll(".brand-mark__initial, .brand-mark__rest")];
    expect(parts.map((p) => p.textContent)).toEqual(["I", "ago", "B", "envindo"]);
  });

  it("starts as initials and unfolds after the intro delay on the first page", async () => {
    const { BrandMark, INTRO_DELAY_MS } = await loadBrandMark();
    render(<BrandMark name="Iago Benvindo" href="/" />);
    expect(brand()).toHaveAttribute("data-expanded", "false");
    act(() => vi.advanceTimersByTime(INTRO_DELAY_MS - 1));
    expect(brand()).toHaveAttribute("data-expanded", "false");
    act(() => vi.advanceTimersByTime(1));
    expect(brand()).toHaveAttribute("data-expanded", "true");
  });

  it("unfolds quickly on later pages of the same visit", async () => {
    const { BrandMark, INTRO_DELAY_MS, REPEAT_DELAY_MS } = await loadBrandMark();
    const first = render(<BrandMark name="Iago Benvindo" href="/" />);
    act(() => vi.advanceTimersByTime(INTRO_DELAY_MS));
    first.unmount();

    render(<BrandMark name="Iago Benvindo" href="/" />);
    expect(brand()).toHaveAttribute("data-expanded", "false");
    act(() => vi.advanceTimersByTime(REPEAT_DELAY_MS));
    expect(brand()).toHaveAttribute("data-expanded", "true");
  });

  it("unfolds quickly after a full reload in the same visit, like switching language", async () => {
    const { BrandMark, INTRO_DELAY_MS, REPEAT_DELAY_MS } = await loadBrandMark();
    const first = render(<BrandMark name="Iago Benvindo" href="/" />);
    act(() => vi.advanceTimersByTime(INTRO_DELAY_MS));
    first.unmount();

    // A fresh module stands in for the reload: only sessionStorage remembers the intro.
    const reloaded = await loadBrandMark();
    render(<reloaded.BrandMark name="Iago Benvindo" href="/" />);
    act(() => vi.advanceTimersByTime(REPEAT_DELAY_MS));
    expect(brand()).toHaveAttribute("data-expanded", "true");
  });

  it("folds back when the page scrolls and unfolds again at the top", async () => {
    const { BrandMark, INTRO_DELAY_MS, COLLAPSE_SCROLL_Y } = await loadBrandMark();
    render(<BrandMark name="Iago Benvindo" href="/" />);
    act(() => vi.advanceTimersByTime(INTRO_DELAY_MS));

    scrollTo(COLLAPSE_SCROLL_Y + 1);
    expect(brand()).toHaveAttribute("data-expanded", "false");
    scrollTo(0);
    expect(brand()).toHaveAttribute("data-expanded", "true");
  });

  it("stays folded if the page loads already scrolled down", async () => {
    const { BrandMark, INTRO_DELAY_MS } = await loadBrandMark();
    scrollTo(500);
    render(<BrandMark name="Iago Benvindo" href="/" />);
    act(() => vi.advanceTimersByTime(INTRO_DELAY_MS));
    expect(brand()).toHaveAttribute("data-expanded", "false");
  });

  it("stops listening and cancels the timer on unmount", async () => {
    const { BrandMark } = await loadBrandMark();
    const remove = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<BrandMark name="Iago Benvindo" href="/" />);
    unmount();
    expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(vi.getTimerCount()).toBe(0);
    remove.mockRestore();
  });
});
