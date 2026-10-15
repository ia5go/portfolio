import { describe, expect, it } from "vitest";
import { isLocalized, isProperNoun, type Localized } from "./localized";

// Every module under src/content and src/components is scanned: any exported
// object shaped { en, pt } (at any depth) is a Localized Field. Content added
// by later tickets is picked up automatically. Fields that are identical on
// purpose (names, technologies) must be created with properNoun().
const modules = import.meta.glob(
  [
    "/src/content/**/*.{ts,tsx}",
    "/src/components/**/*.{ts,tsx}",
    "!/src/**/*.test.*",
    "!/src/components/site/RootShell.tsx", // loads next/font, holds no content
  ],
  { eager: true },
) as Record<string, Record<string, unknown>>;

function collect(
  value: unknown,
  path: string,
  out: [string, Localized][],
  seen = new Set<unknown>(),
) {
  if (typeof value !== "object" || value === null || seen.has(value)) return;
  seen.add(value);
  if (isLocalized(value)) {
    out.push([path, value]);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    collect(child, `${path}.${key}`, out, seen);
  }
}

const fields: [string, Localized][] = [];
for (const [file, mod] of Object.entries(modules)) {
  for (const [name, value] of Object.entries(mod)) {
    collect(value, `${file}#${name}`, fields);
  }
}

describe("Localized Fields", () => {
  it("finds fields to guard", () => {
    expect(fields.length).toBeGreaterThan(10);
  });

  it("have both sides filled in", () => {
    const bad = fields
      .filter(([, f]) => !f.en?.trim() || !f.pt?.trim())
      .map(([p]) => p);
    expect(bad).toEqual([]);
  });

  it("do not repeat one side by accident (use properNoun() for names)", () => {
    const bad = fields
      .filter(([, f]) => !isProperNoun(f) && f.en.trim() === f.pt.trim())
      .map(([p]) => p);
    expect(bad).toEqual([]);
  });
});
