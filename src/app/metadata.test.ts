import { describe, expect, it } from "vitest";
import { localeMetadata } from "@/content/metadata";

describe("page metadata", () => {
  it.each(["home", "projects"] as const)("%s has language alternates", (page) => {
    const pt = localeMetadata("pt", page);
    const en = localeMetadata("en", page);
    const suffix = page === "home" ? "" : "/projects";
    expect(pt.alternates?.canonical).toBe(suffix || "/");
    expect(en.alternates?.canonical).toBe(`/en${suffix}`);
    for (const m of [pt, en]) {
      expect(m.alternates?.languages).toEqual({
        pt: suffix || "/",
        en: `/en${suffix}`,
        "x-default": suffix || "/",
      });
      expect(m.title).toBeTruthy();
      expect(m.description).toBeTruthy();
      expect(m.openGraph).toMatchObject({ type: "website" });
      expect(m.twitter).toBeTruthy();
    }
    expect(pt.description).not.toBe(en.description);
    expect(pt.openGraph).toMatchObject({ locale: "pt_BR" });
    expect(en.openGraph).toMatchObject({ locale: "en_US" });
  });
});
