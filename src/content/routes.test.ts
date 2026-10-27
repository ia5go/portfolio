import { describe, expect, it } from "vitest";
import { locales } from "./localized";
import { pagePath, parsePath, type PageId } from "./routes";

describe("parsePath", () => {
  it.each([
    ["/", "home", "pt"],
    ["/projects", "projects", "pt"],
    ["/en", "home", "en"],
    ["/en/", "home", "en"],
    ["/en/projects", "projects", "en"],
  ])("reads %s as the %s page in %s", (path, page, locale) => {
    expect(parsePath(path)).toEqual({ page, locale });
  });

  it("is the inverse of pagePath for every page and language", () => {
    for (const page of ["home", "projects"] as PageId[]) {
      for (const locale of locales) expect(parsePath(pagePath(page, locale))).toEqual({ page, locale });
    }
  });

  it("falls back to the Portuguese Home Page for unknown paths", () => {
    expect(parsePath("/whatever")).toEqual({ page: "home", locale: "pt" });
  });
});
