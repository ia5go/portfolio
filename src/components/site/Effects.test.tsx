import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Effects } from "./Effects";

function mockMedia(active: (q: string) => boolean) {
  vi.stubGlobal("matchMedia", (q: string) => ({
    matches: active(q),
    media: q,
    addEventListener() {},
    removeEventListener() {},
  }));
}

afterEach(() => vi.unstubAllGlobals());

describe("Effects", () => {
  it("is decorative and hidden from assistive tech", () => {
    mockMedia(() => false);
    const { container } = render(<Effects />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("mounts the cursor on desktop with a fine hover pointer", () => {
    mockMedia((q) => q.includes("min-width: 900px"));
    render(<Effects />);
    expect(screen.getByTestId("fx-cursor")).toBeInTheDocument();
    expect(document.documentElement).toHaveClass("has-custom-cursor");
  });

  it("does not mount the cursor on touch devices", () => {
    mockMedia(() => false);
    render(<Effects />);
    expect(screen.queryByTestId("fx-cursor")).toBeNull();
    expect(document.documentElement).not.toHaveClass("has-custom-cursor");
  });

  it("mounts the cursor on desktop even when reduced motion is requested", () => {
    mockMedia(() => true);
    render(<Effects />);
    expect(screen.getByTestId("fx-cursor")).toBeTruthy();
  });
});
