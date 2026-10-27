import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { t, type Localized } from "@/content/localized";

let pathname = "/";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

import { LocaleProvider, useLocale, useSwitchLocale } from "./LocaleProvider";

const label: Localized = { pt: "Ver projetos", en: "View projects" };
let switchTo: ((l: "pt" | "en") => void) | null = null;

function Probe() {
  const locale = useLocale("pt");
  switchTo = useSwitchLocale();
  return <p data-testid="text">{t(label, locale)}</p>;
}

function mockMedia(active: (q: string) => boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: active(q),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  }));
}

let frames: FrameRequestCallback[] = [];

beforeEach(() => {
  pathname = "/";
  window.history.replaceState(null, "", "/");
  frames = [];
  vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => frames.push(cb));
  vi.stubGlobal("cancelAnimationFrame", () => {});
  // jsdom has no layout: every element reports a zero box, so treat text as on screen.
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    top: 0, bottom: 20, left: 0, right: 100, width: 100, height: 20, x: 0, y: 0, toJSON() {},
  });
  mockMedia((q) => q.includes("min-width: 900px"));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderApp() {
  const view = render(
    <LocaleProvider>
      <Probe />
    </LocaleProvider>,
  );
  // What Next's router does after history.replaceState: usePathname reports the new URL.
  const followUrl = () => {
    pathname = window.location.pathname;
    view.rerender(
      <LocaleProvider>
        <Probe />
      </LocaleProvider>,
    );
  };
  return followUrl;
}

describe("LocaleProvider", () => {
  it("reads the language from the URL", () => {
    pathname = "/en/projects";
    renderApp();
    expect(screen.getByTestId("text")).toHaveTextContent("View projects");
    expect(document.documentElement.lang).toBe("en");
    expect(document.title).toBe("Projects | Iago Benvindo");
  });

  it("switches in place: swaps the URL without a history entry, then scrambles the text", () => {
    const followUrl = renderApp();
    const historyLength = window.history.length;

    act(() => switchTo!("en"));
    expect(window.location.pathname).toBe("/en");
    expect(window.history.length).toBe(historyLength);

    act(() => followUrl());
    // First frame, before paint: still the old wording.
    expect(screen.getByTestId("text")).toHaveTextContent("Ver projetos");
    expect(document.documentElement.lang).toBe("en");

    act(() => {
      frames.splice(0).forEach((cb) => cb(0));
    });
    act(() => {
      frames.splice(0).forEach((cb) => cb(5000));
    });
    expect(screen.getByTestId("text")).toHaveTextContent("View projects");
  });

  it("switches at once, without scrambling, on phones that ask for reduced motion", () => {
    mockMedia((q) => q.includes("prefers-reduced-motion"));
    const followUrl = renderApp();
    act(() => switchTo!("en"));
    act(() => followUrl());
    expect(screen.getByTestId("text")).toHaveTextContent("View projects");
    expect(frames).toHaveLength(0);
  });

  it("ignores a switch to the language already on screen", () => {
    renderApp();
    act(() => switchTo!("pt"));
    expect(window.location.pathname).toBe("/");
  });
});
