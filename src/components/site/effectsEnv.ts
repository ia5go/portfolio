export const DESKTOP_QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 900px)";

export function matches(query: string): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;
}

/** Desktop always animates; phones and touch devices respect reduced motion. */
export function canAnimate(): boolean {
  return matches(DESKTOP_QUERY) || !matches("(prefers-reduced-motion: reduce)");
}

/** Custom cursor runs only on hover-capable fine pointers and wide screens. It ignores
 * prefers-reduced-motion on purpose: the owner wants the desktop experience always on. */
export function shouldRunCursor(): boolean {
  return matches(DESKTOP_QUERY);
}
