import { describe, expect, it } from "vitest";
import screenshots from "./screenshots.json";
import { projects, selectFeatured, type Project } from "./projects";

const base = (slug: string, featured?: number): Project => ({
  slug,
  name: slug,
  url: "https://example.com",
  image: { src: "/x.webp", width: 1, height: 1 },
  segment: { pt: "a", en: "b" },
  roleLine: { pt: "a", en: "b" },
  featured,
});

describe("selectFeatured", () => {
  it("keeps only featured projects, ordered by position", () => {
    const list = [base("c", 3), base("x"), base("a", 1), base("b", 2)];
    expect(selectFeatured(list).map((p) => p.slug)).toEqual(["a", "b", "c"]);
  });

  it("does not mutate its input", () => {
    const list = [base("b", 2), base("a", 1)];
    selectFeatured(list);
    expect(list.map((p) => p.slug)).toEqual(["b", "a"]);
  });

  it("selects the six Home projects from the real data", () => {
    expect(selectFeatured(projects).map((p) => p.slug)).toEqual([
      "girassol-azul",
      "dna-genetica",
      "irma-dulce",
      "esquire-brasil",
      "engemon",
      "platinum",
    ]);
  });
});

describe("projects data", () => {
  it("covers every site of the screenshots manifest", () => {
    expect(projects).toHaveLength(24);
    expect(projects.map((p) => p.slug)).toEqual(screenshots.map((s) => s.slug));
  });

  it("gives the five large projects a custom description and the rest none", () => {
    const withDescription = projects.filter((p) => p.description).map((p) => p.slug);
    expect(withDescription.sort()).toEqual(
      ["dna-genetica", "engemon", "esquire-brasil", "girassol-azul", "irma-dulce"].sort(),
    );
  });
});
