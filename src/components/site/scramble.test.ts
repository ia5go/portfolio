import { afterEach, describe, expect, it, vi } from "vitest";
import {
  frameAt,
  GLYPH_STEP_MS,
  planScramble,
  scrambleChanges,
  snapshotText,
  SWAP_MS,
  type Where,
} from "./scramble";

// Deterministic Math.random stand-in so plans are reproducible.
function seeded(seed = 7) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function timeline(from: string, to: string) {
  const plan = planScramble(from, to, seeded());
  const frames: { t: number; text: string }[] = [];
  for (let t = 0; t <= plan.duration + 10; t += 5) frames.push({ t, text: frameAt(plan, t) });
  return { plan, frames };
}

const isLetter = (c: string) => /[\p{L}\p{N}]/u.test(c);
/** Same length, with the same spaces and punctuation in the same places. */
function sameShape(a: string, b: string) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (isLetter(a[i]) !== isLetter(b[i])) return false;
    if (!isLetter(a[i]) && a[i] !== b[i]) return false;
  }
  return true;
}

const CASES: [string, string][] = [
  ["Ver projetos", "View projects"],
  ["Desenvolvimento do site", "Website development"],
  ["Pedir orçamento", "Request a quote"],
  ["2016 – 2021 · Ensino", "2016 – 2021 · Teaching"],
  ["", "New text"],
  ["Old text", ""],
];

describe("planScramble / frameAt", () => {
  it.each(CASES)("starts on the old text and lands exactly on the new one (%s → %s)", (from, to) => {
    const { plan, frames } = timeline(from, to);
    expect(frames[0].text).toBe(from);
    expect(frameAt(plan, plan.duration)).toBe(to);
    expect(frames.at(-1)!.text).toBe(to);
  });

  it.each(CASES)("keeps the old shape until the swap, then the new shape (%s → %s)", (from, to) => {
    // Same shape means same line breaks in monospace: the layout moves only at the swap.
    for (const { t, text } of timeline(from, to).frames) {
      expect(sameShape(text, t < SWAP_MS ? from : to)).toBe(true);
    }
  });

  it("cycles letters into letters and digits only", () => {
    for (const { text } of timeline("Pedir orçamento", "Request a quote").frames) {
      expect(/^[\p{L}\p{N} ]*$/u.test(text)).toBe(true);
    }
  });

  it("holds characters shared by both texts at the same position", () => {
    for (const { text } of timeline("Projetos", "Projects").frames) {
      expect(text.slice(0, 4)).toBe("Proj");
    }
  });

  it("is fully scrambled around the swap, so the reflow happens inside the noise", () => {
    const from = "Desenvolvimento do site";
    const to = "Website development";
    const plan = planScramble(from, to, seeded());
    const before = frameAt(plan, SWAP_MS - 1);
    const after = frameAt(plan, SWAP_MS);
    const readable = (text: string, ref: string) =>
      [...text].filter((c, i) => isLetter(c) && c === ref[i]).length;
    // Only same-position shared letters may survive (none here beyond chance glyphs).
    expect(readable(before, from)).toBeLessThan(from.length / 4);
    expect(readable(after, to)).toBeLessThan(to.length / 4);
  });

  it("holds each glyph for a whole step instead of changing every frame", () => {
    const plan = planScramble("abcdefghij", "klmnopqrst", seeded());
    const t = Math.ceil(SWAP_MS / GLYPH_STEP_MS) * GLYPH_STEP_MS;
    expect(frameAt(plan, t + 1)).toBe(frameAt(plan, t + GLYPH_STEP_MS - 1));
  });

  it("holds off-screen text still: the old text until the swap, then the new", () => {
    const plan = planScramble("Contato", "Contact", seeded(), true);
    expect(frameAt(plan, SWAP_MS - 1)).toBe("Contato");
    expect(frameAt(plan, SWAP_MS)).toBe("Contact");
  });
});

describe("scrambleChanges", () => {
  let queue: FrameRequestCallback[] = [];
  const flushFrame = (now: number) => {
    const run = queue;
    queue = [];
    run.forEach((cb) => cb(now));
  };

  afterEach(() => {
    queue = [];
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  function setup() {
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => queue.push(cb));
    vi.stubGlobal("cancelAnimationFrame", () => {
      queue = [];
    });
    document.body.innerHTML =
      "<p>Ver projetos</p><p>Iago</p><span>Contato</span><em>Sobre</em>";
    const [visible, same, above, below] = [...document.body.children].map(
      (el) => el.firstChild as Text,
    );
    const where = new Map<Text, Where>([[above, "above"], [below, "below"]]);
    const before = snapshotText(document.body, (n) => where.get(n) ?? "visible");
    // React writes the new language...
    visible.nodeValue = "View projects";
    above.nodeValue = "Contact";
    below.nodeValue = "About";
    return { visible, same, above, below, before };
  }

  it("puts the old text back before paint, so the click shows no flash of the new language", () => {
    const { visible, same, above, below, before } = setup();
    scrambleChanges(document.body, before, null);
    expect([visible, same, above, below].map((n) => n.nodeValue)).toEqual([
      "Ver projetos",
      "Iago",
      "Contato",
      "Sobre",
    ]);
  });

  it("switches text above the viewport at the swap, and text below only after the scramble", () => {
    const { visible, above, below, before } = setup();
    scrambleChanges(document.body, before, null);

    flushFrame(0);
    flushFrame(SWAP_MS - 1);
    expect(visible.nodeValue).toHaveLength("Ver projetos".length);
    expect(above.nodeValue).toBe("Contato");

    flushFrame(SWAP_MS);
    expect(visible.nodeValue).toHaveLength("View projects".length);
    expect(above.nodeValue).toBe("Contact");
    expect(below.nodeValue).toBe("Sobre");

    flushFrame(5000); // visible scramble done
    expect(visible.nodeValue).toBe("View projects");
    expect(below.nodeValue).toBe("Sobre");
    flushFrame(5016); // next frame: the text below
    expect(below.nodeValue).toBe("About");
    expect(queue).toHaveLength(0);
  });

  it("settles everything on the new text when cancelled mid-way", () => {
    const { visible, above, below, before } = setup();
    const cancel = scrambleChanges(document.body, before, null);
    flushFrame(0);
    flushFrame(200);
    cancel();
    expect([visible, above, below].map((n) => n.nodeValue)).toEqual([
      "View projects",
      "Contact",
      "About",
    ]);
  });
});
