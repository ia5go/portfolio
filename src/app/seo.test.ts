import { describe, expect, it } from "vitest";
import { pageJsonLd } from "@/content/jsonld";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";
import robots from "./robots";
import sitemap from "./sitemap";
import { GET as llms } from "./llms.txt/route";

describe("crawler files", () => {
  it("robots.txt allows everything and points at the sitemap", () => {
    const r = robots();
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(r.sitemap).toBe(`${siteUrl}/sitemap.xml`);
  });

  it("sitemap lists both languages of both pages, each with all its alternates", () => {
    const entries = sitemap();
    expect(entries.map((e) => e.url)).toEqual([
      `${siteUrl}/`,
      `${siteUrl}/en`,
      `${siteUrl}/projects`,
      `${siteUrl}/en/projects`,
    ]);
    for (const e of entries) {
      expect(Object.keys(e.alternates?.languages ?? {})).toEqual(["pt", "en", "x-default"]);
    }
  });

  it("llms.txt is plain text naming the site and its pages", async () => {
    const res = llms();
    expect(res.headers.get("content-type")).toContain("text/plain");
    const body = await res.text();
    expect(body).toContain("# Iago Benvindo");
    expect(body).toContain(`${siteUrl}/en/projects`);
  });
});

describe("structured data", () => {
  it("home describes the person and the profile page in the page's language", () => {
    const pt = JSON.stringify(pageJsonLd("home", "pt"));
    expect(pt).toContain('"@type":"Person"');
    expect(pt).toContain('"@type":"ProfilePage"');
    expect(pt).toContain('"inLanguage":"pt-BR"');
    expect(JSON.stringify(pageJsonLd("home", "en"))).toContain('"inLanguage":"en"');
  });

  it("projects lists every project in an ItemList", () => {
    const graph = pageJsonLd("projects", "en")["@graph"];
    const page = graph.find((n) => n["@type"] === "CollectionPage") as {
      mainEntity: { itemListElement: unknown[] };
    };
    expect(page.mainEntity.itemListElement).toHaveLength(projects.length);
  });
});
