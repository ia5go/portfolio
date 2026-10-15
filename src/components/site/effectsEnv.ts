export const DESKTOP_QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 900px)";
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function matches(query: string): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;
}

/** Custom cursor runs only on hover-capable fine pointers, wide, and with motion allowed. */
export function shouldRunCursor(): boolean {
  return matches(DESKTOP_QUERY) && !matches(REDUCED_MOTION_QUERY);
}
