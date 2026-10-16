export const DESKTOP_QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 900px)";

export function matches(query: string): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;
}

/** Custom cursor runs only on hover-capable fine pointers and wide screens. It ignores
 * prefers-reduced-motion on purpose: the owner wants the desktop experience always on. */
export function shouldRunCursor(): boolean {
  return matches(DESKTOP_QUERY);
}
