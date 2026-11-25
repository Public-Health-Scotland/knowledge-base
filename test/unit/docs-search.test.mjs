import { fileURLToPath } from "node:url";
import MiniSearch from "minisearch";
import { describe, expect, it } from "vitest";
import { loadDocs } from "../../lib/docs/index.mjs";
import { plainText, searchDocuments } from "../../lib/docs/search-index.mjs";
import { SEARCH_OPTIONS, snippet } from "../../lib/docs/search.mjs";

const FIXTURE = fileURLToPath(
  new URL("../fixtures/technical-docs", import.meta.url),
);

describe("plainText", () => {
  it("keeps words apart and decodes characters", () => {
    expect(
      plainText(
        "<h1>Install &amp; <code>run</code></h1><p>x &lt; 1</p><ul><li>a</li><li>b</li></ul>",
      ),
    ).toEqual({ text: "Install & run x < 1 a b", headings: ["Install & run"] });
  });
});

describe("searchDocuments", () => {
  const documents = searchDocuments(loadDocs(FIXTURE));

  it("has one entry per section page and doc, with its address", () => {
    expect(documents.map((d) => d.url)).toEqual([
      "/docs/second-section/another-doc/",
      "/docs/section-one/",
      "/docs/section-one/first-doc/",
      "/docs/glossary/",
    ]);
    expect(documents[0]).toMatchObject({
      id: "/docs/second-section/another-doc/",
      section: "Second Section",
      text: expect.any(String),
    });
  });

  it("finds docs by words in their text, best match first", () => {
    const index = new MiniSearch(SEARCH_OPTIONS);
    index.addAll(documents);
    const [best] = index.search(documents[2].text.split(" ").at(-1));
    expect(best.url).toBe(documents[2].url);
    expect(index.search("zzzz-not-in-any-doc")).toEqual([]);
  });
});

describe("snippet", () => {
  const text =
    "Projects are easier to share when renv records the package versions they use, so others get the same results.";

  it("marks every matched word", () => {
    const parts = snippet(text, ["renv"], 200);
    expect(parts.filter((p) => p.match).map((p) => p.text)).toEqual(["renv"]);
    expect(parts.map((p) => p.text).join("")).toBe(text);
  });

  it("shortens long text around the first match, on whole words", () => {
    const parts = snippet(`${"word ".repeat(40)}${text}`, ["versions"], 80);
    const joined = parts.map((p) => p.text).join("");
    expect(joined.startsWith("… ")).toBe(true);
    expect(joined.endsWith(" …")).toBe(true);
    expect(joined).toContain("versions");
  });

  it("treats search words as text, not patterns", () => {
    expect(() => snippet(text, ["(", "a+"])).not.toThrow();
  });
});
