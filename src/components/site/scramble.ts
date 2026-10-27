/*
 * Language-switch scramble: each text turns from the old language into the new one by
 * cycling random glyphs in place, Matrix-style, in two phases around one shared moment:
 *
 *  1. Old shape (0 to SWAP_MS): the old text's letters start cycling, left to right.
 *     Only letters and digits change, into other letters and digits; spaces and
 *     punctuation stay. Monospace type then keeps every line break exactly where it
 *     was, so nothing on the page moves.
 *  2. Swap (SWAP_MS): every text on the page, on screen or not, takes the new text's
 *     shape in the same frame, still fully scrambled. This is the single moment the
 *     layout reflows, hidden in the noise.
 *  3. New shape: the new text's letters land, left to right. The shape is final, so
 *     again nothing moves.
 *
 * Characters equal in both texts at the same position stay still throughout, and a
 * glyph holds for GLYPH_STEP_MS before changing so the cycling reads as flicker.
 */

export const GLYPH_STEP_MS = 55;
export const SWAP_MS = 300;
const START_SPREAD_MS = 200; // phase 1 wave: when each old letter starts cycling
const REVEAL_DELAY_MS = 140; // new letters keep cycling at least this long after the swap
const REVEAL_SPREAD_MS = 380; // phase 3 wave: when each new letter lands
const JITTER_MS = 120; // per-letter variation in when it lands

// Letters and digits only: other symbols ("/", "?", "-") would add line-break points.
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";

export type ScramblePlan = {
  from: string;
  to: string;
  /** When each old letter starts cycling (phase 1). */
  start: number[];
  /** When each new letter lands (phase 3). */
  reveal: number[];
  seed: number;
  duration: number;
  /** Off-screen: no cycling, just the old text until the swap and the new one after. */
  still: boolean;
};

export function planScramble(
  from: string,
  to: string,
  random: () => number = Math.random,
  still = false,
): ScramblePlan {
  const wave = (i: number, n: number) => (n > 1 ? i / (n - 1) : 0);
  const start = [...from].map((_, i) => wave(i, from.length) * START_SPREAD_MS);
  const reveal = [...to].map(
    (_, i) => SWAP_MS + REVEAL_DELAY_MS + wave(i, to.length) * REVEAL_SPREAD_MS + random() * JITTER_MS,
  );
  return {
    from,
    to,
    start,
    reveal,
    seed: Math.floor(random() * 2 ** 31),
    duration: still || reveal.length === 0 ? SWAP_MS : Math.max(...reveal),
    still,
  };
}

function glyph(seed: number, slot: number, step: number): string {
  let h = seed ^ Math.imul(slot + 1, 0x9e3779b1) ^ Math.imul(step + 1, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
  h ^= h >>> 12;
  return GLYPHS[(h >>> 0) % GLYPHS.length];
}

const isLetter = (c: string) => /[\p{L}\p{N}]/u.test(c);

/** The text to show `elapsed` ms into the scramble. */
export function frameAt(plan: ScramblePlan, elapsed: number): string {
  if (elapsed >= plan.duration) return plan.to;
  const { from, to } = plan;
  if (plan.still) return elapsed < SWAP_MS ? from : to;
  const step = Math.floor(elapsed / GLYPH_STEP_MS);
  let out = "";
  if (elapsed < SWAP_MS) {
    for (let i = 0; i < from.length; i++) {
      const c = from[i];
      // Inclusive, so the very first frame is the untouched old text.
      const waiting = elapsed <= plan.start[i];
      out += waiting || !isLetter(c) || to[i] === c ? c : glyph(plan.seed, i, step);
    }
  } else {
    for (let i = 0; i < to.length; i++) {
      const c = to[i];
      const landed = elapsed >= plan.reveal[i];
      out += landed || !isLetter(c) || from[i] === c ? c : glyph(plan.seed, i, step);
    }
  }
  return out;
}

/* ---- DOM ---------------------------------------------------------------------- */

const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);

function textNodes(root: Node): Text[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      SKIP.has(node.parentElement?.tagName ?? "") || !node.nodeValue?.trim()
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  });
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

/** Where a text sits relative to the viewport when the switch starts. */
export type Where = "above" | "visible" | "below";
export type TextSnapshot = Map<Text, { text: string; where: Where }>;

function locate(node: Text): Where {
  const rect = node.parentElement?.getBoundingClientRect();
  if (!rect || (rect.width === 0 && rect.height === 0)) return "below"; // not rendered
  if (rect.bottom < -100) return "above";
  if (rect.top > window.innerHeight + 100) return "below";
  return "visible";
}

/**
 * Every text node under `root` with its value and position. Measured on the settled
 * page, before React writes anything, so reading positions forces no extra layout.
 */
export function snapshotText(root: Node, where: (node: Text) => Where = locate): TextSnapshot {
  return new Map(textNodes(root).map((n) => [n, { text: n.nodeValue ?? "", where: where(n) }]));
}

// The browser's scroll anchoring must be off from before React writes the new texts:
// otherwise it reacts to that transient commit (which the scramble immediately reverts
// to the old wording) and scrolls the page. keepInView does the anchoring instead.
let heldAnchoring: string | null = null;
function holdAnchoring() {
  const html = document.documentElement;
  heldAnchoring ??= html.style.overflowAnchor;
  html.style.overflowAnchor = "none";
}
function releaseAnchoring() {
  if (heldAnchoring === null) return;
  document.documentElement.style.overflowAnchor = heldAnchoring;
  heldAnchoring = null;
}

/**
 * Call right before the texts change (before the URL swap): snapshots them for
 * scrambleChanges and holds the browser's scroll anchoring until the scramble ends.
 */
export function prepareScramble(root: Node): TextSnapshot {
  holdAnchoring();
  return snapshotText(root);
}

/**
 * Keeps what the visitor is looking at in place while `write` reflows the page: the
 * topmost element visible in `content` must not move on screen, so text that grew or
 * shrank above the viewport is compensated with an instant scroll, before paint. The
 * browser's own scroll anchoring is unreliable here (and Safari has none).
 */
function keepInView(content: Element | null, write: () => void) {
  if (!content) return write();
  const headerBottom = document.querySelector(".site-nav")?.getBoundingClientRect().bottom ?? 0;
  let anchor: Element | null = null;
  let anchorTop = Infinity;
  for (const el of content.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.height > 0 && r.top >= headerBottom && r.top < anchorTop) {
      anchor = el;
      anchorTop = r.top;
    }
  }
  write();
  if (!anchor) return;
  const moved = anchor.getBoundingClientRect().top - anchorTop;
  if (Math.abs(moved) >= 1) window.scrollBy({ top: moved, behavior: "instant" });
}

/** Text below the viewport switches after the visible scramble, this many per frame. */
const BELOW_PER_FRAME = 60;

/**
 * Scrambles every text node under `root` whose value changed since `before` (React has
 * already written the new values; each node goes back to its old text before paint):
 *  - visible: cycles glyphs, takes the new shape at the swap;
 *  - above the viewport: switches at the swap, with the view held in place;
 *  - below the viewport: switches after the scramble, a batch per frame. It moves
 *    nothing on screen, and keeping it out of the swap frame keeps that frame light.
 * Returns a cancel function that settles every node on its final text.
 */
export function scrambleChanges(
  root: Node,
  before: TextSnapshot,
  content: Element | null = document.querySelector("main"),
): () => void {
  const changed = textNodes(root)
    .map((node) => ({ node, to: node.nodeValue ?? "", was: before.get(node) }))
    .filter((r) => r.was && r.was.text !== r.to)
    .map((r) => ({ node: r.node, to: r.to, from: r.was!.text, where: r.was!.where }));

  if (changed.length === 0) {
    releaseAnchoring();
    return () => {};
  }

  // First frame now, before paint: no flash of the new language.
  for (const r of changed) r.node.nodeValue = r.from;

  const runs = changed
    .filter((r) => r.where !== "below")
    .map((r) => ({ ...r, plan: planScramble(r.from, r.to, Math.random, r.where === "above"), shown: r.from }));
  const below = changed.filter((r) => r.where === "below");

  const duration = Math.max(SWAP_MS, ...runs.map((r) => r.plan.duration));
  let frame = 0;
  let t0: number | undefined;
  let swapped = false;
  let done = false;
  const write = (elapsed: number) => {
    for (const r of runs) {
      const text = frameAt(r.plan, elapsed);
      if (text !== r.shown) {
        r.node.nodeValue = text;
        r.shown = text;
      }
    }
  };
  // The writes that change the page's shape above or on screen: the swap, or settling
  // before it.
  const reshape = (elapsed: number) => {
    swapped = true;
    keepInView(content, () => write(elapsed));
  };
  const settleVisible = () => {
    if (swapped) write(Infinity);
    else reshape(Infinity);
    releaseAnchoring();
  };
  const switchBelow = () => {
    const batch = below.splice(0, BELOW_PER_FRAME);
    for (const r of batch) r.node.nodeValue = r.to;
    if (below.length) frame = requestAnimationFrame(switchBelow);
    else done = true;
  };
  const tick = (now: number) => {
    t0 ??= now;
    const elapsed = now - t0;
    if (elapsed >= duration) {
      settleVisible();
      frame = requestAnimationFrame(switchBelow);
      return;
    }
    if (!swapped && elapsed >= SWAP_MS) reshape(elapsed);
    else write(elapsed);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);

  return () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(frame);
    settleVisible();
    for (const r of below) r.node.nodeValue = r.to;
    below.length = 0;
  };
}
