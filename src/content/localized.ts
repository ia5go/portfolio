export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

/** Localized Field (see CONTEXT.md): both languages always filled in. */
export type Localized = { en: string; pt: string };

export function t(field: Localized, locale: Locale): string {
  return field[locale];
}
