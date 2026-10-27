import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
let pathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push }),
}));

import { LEAVE_MS, PageTransition } from "./PageTransition";

function mockMedia(active: (q: string) => boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: active(q),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  }));
}

function renderPage(content: React.ReactNode) {
  return render(<PageTransition>{content}</PageTransition>);
}

beforeEach(() => {
  vi.useFakeTimers();
  push.mockReset();
  pathname = "/";
  mockMedia((q) => q.includes("min-width: 900px"));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("PageTransition", () => {
  it("fades the page out, then navigates, when a link goes to another page", () => {
    renderPage(<a href="/projects">projects</a>);
    const page = screen.getByText("projects").parentElement!;
    expect(page).toHaveClass("page--entering");

    fireEvent.click(screen.getByText("projects"));
    expect(page).toHaveClass("page--leaving");
    expect(push).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(LEAVE_MS));
    expect(push).toHaveBeenCalledWith("/projects");
  });

  it("keeps the page mounted, with no fade, when only the language in the URL changes", () => {
    const { rerender } = renderPage(<p>content</p>);
    const page = screen.getByText("content").parentElement!;

    pathname = "/en";
    rerender(<PageTransition><p>content</p></PageTransition>);

    expect(screen.getByText("content").parentElement).toBe(page);
    expect(page).not.toHaveClass("page--leaving");
  });

  it("shows the page again when it comes back from the back/forward cache", () => {
    renderPage(<a href="/projects">projects</a>);
    const page = screen.getByText("projects").parentElement!;
    fireEvent.click(screen.getByText("projects"));
    act(() => vi.advanceTimersByTime(LEAVE_MS));
    expect(page).toHaveClass("page--leaving");

    act(() => {
      window.dispatchEvent(new PageTransitionEvent("pageshow", { persisted: true }));
    });
    expect(page).not.toHaveClass("page--leaving");
  });

  it("navigates at once when motion is reduced on a phone", () => {
    mockMedia((q) => q.includes("prefers-reduced-motion"));
    renderPage(<a href="/projects">projects</a>);
    fireEvent.click(screen.getByText("projects"));
    expect(push).toHaveBeenCalledWith("/projects");
  });
});
