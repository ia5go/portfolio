import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PixelStars } from "./PixelStars";

function mockMedia(active: (q: string) => boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: active(q),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  }));
}

const fakeCtx = () => ({
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  fillStyle: "",
  globalAlpha: 1,
});

let ctx: ReturnType<typeof fakeCtx> | null;
let raf: ReturnType<typeof vi.fn>;
let caf: ReturnType<typeof vi.fn>;

beforeEach(() => {
  ctx = fakeCtx();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    () => ctx as unknown as CanvasRenderingContext2D,
  );
  raf = vi.fn(() => 1);
  caf = vi.fn();
  vi.stubGlobal("requestAnimationFrame", raf);
  vi.stubGlobal("cancelAnimationFrame", caf);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

const DESKTOP = (q: string) => q.includes("min-width: 900px");
const PHONE_REDUCED = (q: string) => q.includes("prefers-reduced-motion");

describe("PixelStars", () => {
  it("renders a decorative canvas hidden from assistive tech", () => {
    mockMedia(DESKTOP);
    const { container } = render(<PixelStars />);
    const canvas = container.querySelector("canvas");
    expect(canvas).toHaveClass("pixel-stars");
    expect(canvas).toHaveAttribute("aria-hidden", "true");
  });

  it("does not throw when the 2D context is unavailable", () => {
    ctx = null;
    mockMedia(DESKTOP);
    expect(() => render(<PixelStars />)).not.toThrow();
    expect(raf).not.toHaveBeenCalled();
  });

  it("animates on desktop even when reduced motion is requested", () => {
    mockMedia(() => true);
    render(<PixelStars />);
    expect(raf).toHaveBeenCalled();
  });

  it("animates on phones that allow motion", () => {
    mockMedia(() => false);
    render(<PixelStars />);
    expect(raf).toHaveBeenCalled();
  });

  it("draws one still frame on phones that ask for reduced motion", () => {
    mockMedia(PHONE_REDUCED);
    render(<PixelStars />);
    expect(raf).not.toHaveBeenCalled();
    expect(ctx?.clearRect).toHaveBeenCalledTimes(1);
  });

  it("stops the loop and listeners on unmount", () => {
    mockMedia(DESKTOP);
    const removeWindow = vi.spyOn(window, "removeEventListener");
    const removeDoc = vi.spyOn(document, "removeEventListener");
    const { unmount } = render(<PixelStars />);
    unmount();
    expect(caf).toHaveBeenCalled();
    expect(removeWindow).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(removeDoc).toHaveBeenCalledWith("visibilitychange", expect.any(Function));
  });
});
