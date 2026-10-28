import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();
let pathname = "/";
vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push }),
}));

import { LEAVE_MS, leaveOpacityAt, PageTransition } from "./PageTransition";

function mockMedia(active: (q: string) => boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: active(q),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  }));
}

let content: React.ReactNode = null;

function renderPage(node: React.ReactNode) {
  content = node;
  return render(<PageTransition>{content}</PageTransition>);
}

/** The router's pathname changes, as after a push or the browser's Back/Forward. */
function navigateTo(view: ReturnType<typeof renderPage>, next: string) {
  pathname = next;
  view.rerender(<PageTransition>{content}</PageTransition>);
}

function currentPage() {
  return document.querySelector(".page");
}

beforeEach(() => {
  vi.useFakeTimers();
  push.mockReset();
  pathname = "/";
  window.history.replaceState(null, "", "/");
  mockMedia((q) => q.includes("min-width: 900px"));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("leaveOpacityAt", () => {
  it("follows the fade-out's ease from 1 down to 0", () => {
    expect(leaveOpacityAt(0)).toBe(1);
    expect(leaveOpacityAt(LEAVE_MS)).toBe(0);
    // cubic-bezier(0.4, 0, 0.2, 1) at the midpoint is about 0.77 of the way.
    expect(leaveOpacityAt(LEAVE_MS / 2)).toBeCloseTo(0.226, 2);
    const steps = Array.from({ length: 49 }, (_, i) => leaveOpacityAt((i * LEAVE_MS) / 48));
    steps.slice(1).forEach((v, i) => expect(v).toBeLessThanOrEqual(steps[i]));
  });
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

  it("fades in, and stays, when Back returns to a page that was left by a link", () => {
    const view = renderPage(<a href="/projects">projects</a>);
    fireEvent.click(screen.getByText("projects"));
    act(() => vi.advanceTimersByTime(LEAVE_MS));
    expect(push).toHaveBeenCalledWith("/projects");

    // The router lands on Projects, then the browser's Back returns Home: no click.
    navigateTo(view, "/projects");
    expect(currentPage()).toHaveClass("page--entering");
    navigateTo(view, "/");
    expect(currentPage()).toHaveClass("page--entering");
    expect(currentPage()).not.toHaveClass("page--leaving");

    // Forward and Back again, then a language switch in place.
    navigateTo(view, "/projects");
    navigateTo(view, "/");
    navigateTo(view, "/en");
    expect(currentPage()).toHaveClass("page--entering");
    act(() => vi.advanceTimersByTime(LEAVE_MS * 4));
    expect(push).toHaveBeenCalledTimes(1);
  });

  it("drops the link's navigation when Back is pressed during the fade-out", () => {
    window.history.replaceState(null, "", "/projects");
    pathname = "/projects";
    let clock = 1000;
    vi.spyOn(performance, "now").mockImplementation(() => clock);
    const view = renderPage(<a href="/">home</a>);
    const leaving = currentPage()!;
    fireEvent.click(screen.getByText("home"));
    expect(leaving).toHaveClass("page--leaving");

    act(() => vi.advanceTimersByTime(200));
    clock += 200;
    window.history.replaceState(null, "", "/");
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    navigateTo(view, "/");
    const entering = currentPage() as HTMLElement;
    expect(entering).not.toBe(leaving);
    expect(entering).toHaveClass("page--entering");
    // The new page starts where the fade-out stood, and drifts in as usual.
    expect(Number(entering.style.getPropertyValue("--page-from"))).toBeCloseTo(leaveOpacityAt(200));
    expect(entering.style.getPropertyValue("--page-drift")).toBe("");

    act(() => vi.advanceTimersByTime(LEAVE_MS));
    expect(push).not.toHaveBeenCalled();
  });

  it("fades the page back in when Back only changes the hash during the fade-out", () => {
    let clock = 1000;
    vi.spyOn(performance, "now").mockImplementation(() => clock);
    renderPage(<a href="/projects">projects</a>);
    fireEvent.click(screen.getByText("projects"));
    act(() => vi.advanceTimersByTime(300));
    clock += 300;
    act(() => {
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
    const page = currentPage() as HTMLElement;
    expect(page).toHaveClass("page--entering");
    // Same page, same place: it fades back in from where it was, without drifting.
    expect(Number(page.style.getPropertyValue("--page-from"))).toBeCloseTo(leaveOpacityAt(300));
    expect(page.style.getPropertyValue("--page-drift")).toBe("0px");

    act(() => vi.advanceTimersByTime(LEAVE_MS));
    expect(push).not.toHaveBeenCalled();
  });

  it("navigates at once when motion is reduced on a phone", () => {
    mockMedia((q) => q.includes("prefers-reduced-motion"));
    renderPage(<a href="/projects">projects</a>);
    fireEvent.click(screen.getByText("projects"));
    expect(push).toHaveBeenCalledWith("/projects");
  });
});
