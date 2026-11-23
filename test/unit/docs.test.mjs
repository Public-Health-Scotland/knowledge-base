import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { collectDocs, docTitle, slugify } from "../../lib/docs/collect.mjs";
import { renderMarkdown } from "../../lib/docs/render.mjs";
import { addUrls, docsManifest, loadDocs } from "../../lib/docs/index.mjs";
import {
  findRedirect,
  findSiteRedirect,
  legacyRedirects,
  redirectPages,
  oldSectionPath,
} from "../../lib/docs/redirects.mjs";

const FIXTURE = fileURLToPath(
  new URL("../fixtures/technical-docs", import.meta.url),
);

describe("slugify", () => {
  it.each([
    ["How to Access Posit Workbench.md", "how-to-access-posit-workbench"],
    ["PHS R packages.md", "phs-r-packages"],
    ["Git & GitHub (basics)?.md", "git-and-github-basics"],
    ["Café Guide.md", "cafe-guide"],
    ["R", "r"],
  ])("%s -> %s", (name, slug) => {
    expect(slugify(name)).toBe(slug);
  });
});

describe("docTitle", () => {
  it("uses the first level-one heading as plain text", () => {
    expect(
      docTitle("Intro\n# Guide to [{renv}](https://x.y) `code`\n", "x"),
    ).toBe("Guide to {renv} code");
  });

  it("falls back when there is no heading", () => {
    expect(docTitle("## Only level two\n", "Fallback")).toBe("Fallback");
  });
});

describe("collectDocs", () => {
  const { sections, warnings } = collectDocs(FIXTURE);

  it("lists section folders alphabetically with the glossary last", () => {
    expect(sections.map((s) => s.name)).toEqual([
      "Second Section",
      "Section One",
      "Glossary",
    ]);
  });

  it("ignores top-level files and hidden folders", () => {
    const paths = sections.flatMap((s) => s.docs.map((d) => d.path));
    expect(paths).toEqual([
      "Second Section/Another Doc.md",
      "Section One/First Doc.md",
    ]);
  });

  it("names docs after the file and titles them from the heading", () => {
    const [doc] = sections[1].docs;
    expect(doc).toMatchObject({
      name: "First Doc",
      slug: "first-doc",
      title: "First Doc",
    });
    expect(sections[0].docs[0].title).toBe("Another Doc");
  });

  it("warns about documents in nested folders", () => {
    expect(warnings).toEqual([
      `"Section One/Nested" is a folder inside a section. Documents in it aren't published.`,
    ]);
  });

  it("explains how to get the docs when the folder is missing", () => {
    expect(() => collectDocs(join(FIXTURE, "missing"))).toThrow(
      /npm run docs:fetch/,
    );
  });

  it("refuses two docs that would share an address", () => {
    const dir = mkdtempSync(join(tmpdir(), "docs-"));
    mkdirSync(join(dir, "R"));
    writeFileSync(join(dir, "R", "Style Guide.md"), "# A\n");
    writeFileSync(join(dir, "R", "Style guide!.md"), "# B\n");
    expect(() => collectDocs(dir)).toThrow(
      /same web address \(\/style-guide\/\)/,
    );
  });
});

describe("loadDocs", () => {
  const redirects = legacyRedirects(addUrls(collectDocs(FIXTURE).sections));
  const docs = loadDocs(FIXTURE, { base: "/", redirects });
  const html = docs.sections[1].docs[0].html;

  it.each([
    ["a sibling README", '"/docs/section-one/#section-one"'],
    ["another section", '"/docs/second-section/another-doc/"'],
    ["a repository path", '"/docs/section-one/first-doc/#why-cant-i-log-in"'],
    [
      "an old knowledge base address",
      '"/docs/second-section/another-doc/#top"',
    ],
    [
      "files that aren't pages to GitHub",
      '"https://github.com/Public-Health-Scotland/technical-docs/blob/main/CONTRIBUTING.md"',
    ],
    [
      "images to GitHub",
      '"https://raw.githubusercontent.com/Public-Health-Scotland/technical-docs/main/Section%20One/diagram.png"',
    ],
  ])("points links to %s", (_, href) => {
    expect(html).toContain(href);
  });

  it("opens external links in a new tab and leaves email links alone", () => {
    expect(html).toContain(
      '<a href="https://posit.co" target="_blank" rel="noopener noreferrer">',
    );
    expect(html).toContain('<a href="mailto:team@example.com">');
  });

  it("gives headings GitHub's ids, prefixed as GitHub does", () => {
    expect(html).toContain('<h2 id="user-content-why-cant-i-log-in">');
  });

  it("removes scripts", () => {
    expect(html).not.toContain("<script");
  });

  it("protects raw HTML links and ids", () => {
    expect(html).toContain(
      '<a href="https://example.org" target="_blank" rel="noopener noreferrer">Raw</a>',
    );
    expect(html).not.toContain('id="__nuxt"');
    expect(html).not.toContain("//evil.example");
  });

  it("links section pages to other sections", () => {
    expect(docs.sections[1].html).toContain('"/docs/second-section/"');
  });

  it("reports links to files that don't exist", () => {
    expect(docs.warnings).toContain(
      '"Section One/First Doc.md" links to "Missing%20Doc.md", which doesn\'t exist.',
    );
  });

  it("prefixes site links with the base path", () => {
    const preview = loadDocs(FIXTURE, { base: "/preview/12/", redirects });
    expect(preview.sections[1].docs[0].html).toContain(
      '"/preview/12/docs/second-section/another-doc/"',
    );
  });

  it("leaves page content out of the navigation", () => {
    const manifest = docsManifest(docs);
    expect(JSON.stringify(manifest)).not.toContain("<h1");
    expect(manifest.sections[1].docs[0]).toMatchObject({
      name: "First Doc",
      url: "/docs/section-one/first-doc/",
    });
  });
});

describe("redirects", () => {
  const redirects = legacyRedirects(addUrls(collectDocs(FIXTURE).sections));

  it("maps every old section and document address", () => {
    expect(redirects).toMatchObject({
      "/docs/Section One": "/docs/section-one/",
      "/docs/Section One?doc=README.md": "/docs/section-one/",
      "/docs/Section One?doc=First Doc.md": "/docs/section-one/first-doc/",
    });
  });

  it("sends removed documents to their section", () => {
    expect(findRedirect(redirects, "/docs/Section One", "Gone.md")).toBe(
      "/docs/section-one/",
    );
    expect(findRedirect(redirects, "/docs/Unknown", "Gone.md")).toBeUndefined();
  });

  it("writes a redirect page for each old section", () => {
    const pages = redirectPages(redirects, "/preview/12/");
    const html = pages["docs/Section One.html"];
    expect(Object.keys(pages)).toContain("docs/Section One.html");
    expect(html).toContain(
      '"First Doc.md":"/preview/12/docs/section-one/first-doc/"',
    );
    expect(html).toContain('url=/preview/12/docs/section-one/"');
  });

  it("finds a section's old path from its new address", () => {
    expect(oldSectionPath(redirects, "/docs/section-one/")).toBe(
      "/docs/Section One",
    );
  });

  it("recognises old links on both site addresses", () => {
    for (const site of [
      "https://public-health-scotland.github.io/knowledge-base",
      "https://kb.publichealthscotland.scot",
    ]) {
      expect(
        findSiteRedirect(
          redirects,
          `${site}/docs/Section%20One?doc=First%20Doc.md#a`,
        ),
      ).toBe("/docs/section-one/first-doc/#a");
    }
    expect(
      findSiteRedirect(redirects, "https://example.com/docs/x"),
    ).toBeUndefined();
  });
});

describe("ids in rendered docs", () => {
  const links = {
    resolve: (path) => (path === "R/Guide.md" ? "/docs/r/guide/" : null),
    exists: () => true,
    legacy: () => "/docs/r/guide/#naming",
    fallback: (path) => path,
  };
  const render = (source) => renderMarkdown(source, { path: "R/a.md", links });

  it("prefixes every id and anchor name from a doc", () => {
    expect(
      render(
        '## Installing packages\n\n<h2 id="__NUXT_DATA__">x</h2>\n<a name="main-content">a</a>',
      ),
    ).toBe(
      '<h2 id="user-content-installing-packages">Installing packages</h2>\n<h2 id="user-content-__NUXT_DATA__">x</h2>\n<a name="user-content-main-content">a</a>',
    );
  });

  it("keeps links to headings in the plain form", () => {
    expect(render("[a](#installing-packages)")).toContain(
      'href="#installing-packages"',
    );
    expect(render("[b](Guide.md#naming)")).toContain(
      'href="/docs/r/guide/#naming"',
    );
    expect(
      render(
        "[c](https://kb.publichealthscotland.scot/docs/R?doc=Guide.md#naming)",
      ),
    ).toContain('href="/docs/r/guide/#naming"');
  });

  it("leaves ids that already have the prefix alone", () => {
    expect(render('<h2 id="user-content-x">x</h2>')).toBe(
      '<h2 id="user-content-x">x</h2>',
    );
  });
});
