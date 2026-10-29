export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

/** Localized Field (see CONTEXT.md): both languages always filled in. */
export type Localized = { en: string; pt: string };

export function t(field: Localized, locale: Locale): string {
  return field[locale];
}

/**
 * A Localized Field that is intentionally identical in both languages
 * (proper nouns, technology names). The guard test skips these.
 */
const sameInBoth = new WeakSet<Localized>();
export function properNoun(value: string): Localized {
  const field = { en: value, pt: value };
  sameInBoth.add(field);
  return field;
}
export function isProperNoun(field: Localized): boolean {
  return sameInBoth.has(field);
}

export function isLocalized(value: unknown): value is Localized {
  if (typeof value !== "object" || value === null) return false;
  const keys = Object.keys(value).sort();
  return keys.length === 2 && keys[0] === "en" && keys[1] === "pt";
}
