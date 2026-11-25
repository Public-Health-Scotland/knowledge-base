import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { docsManifest, loadDocs } from "../../lib/docs/index.mjs";
import { renderMarkdown } from "../../lib/docs/render.mjs";
import { tableOfContents } from "../../lib/docs/text.mjs";

const FIXTURE = fileURLToPath(
  new URL("../fixtures/technical-docs", import.meta.url),
);
const links = {
  resolve: () => null,
  exists: () => true,
  legacy: () => null,
  fallback: (path) => path,
};
const render = (source) => renderMarkdown(source, { path: "R/a.md", links });

describe("callouts", () => {
  it("turns GitHub's [!TYPE] quotes into labelled callouts", () => {
    expect(render("> [!WARNING]\n> Never commit passwords.")).toBe(
      '<div class="markdown-alert markdown-alert-warning"><p class="markdown-alert-title">Warning</p>\n<p>Never commit passwords.</p>\n</div>\n',
    );
  });

  it("matches GitHub: any case, marker on its own line", () => {
    expect(render("> [!tip]\n> Use renv.")).toContain(
      '<p class="markdown-alert-title">Tip</p>\n<p>Use renv.</p>',
    );
    // GitHub shows these as ordinary quotes, so the site does too.
    expect(render("> [!NOTE] Same line")).toContain("<blockquote>");
    expect(render("> [!UNKNOWN]\n> x")).toContain("<blockquote>");
    expect(render("> Just a quote")).toBe(
      "<blockquote>\n<p>Just a quote</p>\n</blockquote>\n",
    );
  });
});

describe("scrolling blocks", () => {
  it("lets keyboard users scroll code and tables", () => {
    expect(render("```text\nx <- 1\n```")).toBe(
      '<pre tabindex="0"><code class="language-text">x &lt;- 1\n</code></pre>\n',
    );
    expect(render("|a|\n|-|\n|1|")).toMatch(
      /^<div class="table-scroll" role="region" aria-label="Table" tabindex="0">\n<table>/,
    );
  });

  it("only allows those attribute values from raw HTML", () => {
    expect(
      render(
        '<div class="table-scroll other" role="button" tabindex="-1" onclick="x">a</div>\n\n<pre tabindex="3">b</pre>\n\n<code class="language-r evil">c</code>',
      ),
    ).toBe(
      '<div class="table-scroll">a</div>\n<pre>b</pre>\n<p><code class="language-r">c</code></p>\n',
    );
  });
});

describe("syntax highlighting", () => {
  it("colours code by its language, including R Markdown chunks", () => {
    for (const fence of ["```r", "```{r}", "```{r, echo=FALSE}", "```R"]) {
      const html = render(`${fence}\nx <- 1 # note\n\`\`\``);
      expect(html).toMatch(
        /^<div class="code-block"><p class="code-language">R<\/p>\n<pre tabindex="0"><code class="language-[^"]+">/,
      );
      expect(html).toContain('<span class="line"><span style="color:#');
      expect(html).toContain("# note</span>");
    }
  });

  it("labels known languages, by any of their names", () => {
    for (const [fence, name] of [
      ["py", "Python"],
      ["sh", "Bash"],
      ["yml", "YAML"],
      ["dockerfile", "Dockerfile"],
    ]) {
      expect(render(`\`\`\`${fence}\nx\n\`\`\``)).toContain(
        `<p class="code-language">${name}</p>\n<pre`,
      );
    }
    for (const markdown of ["```nope\nx\n```", "```\nx\n```", "    x\n"]) {
      expect(render(markdown)).not.toContain("code-language");
    }
  });

  it("leaves unknown languages and plain blocks as text", () => {
    expect(render("```nope\nx\n```")).not.toContain("<span");
    expect(render("```\nx\n```")).not.toContain("<span");
    expect(render("    indented\n")).not.toContain("<span");
  });

  it("only allows colours on spans from raw HTML", () => {
    expect(
      render(
        '<span class="line evil" style="color:#123456;position:fixed" onclick="x">a</span> <span style="color:red">b</span>',
      ),
    ).toBe(
      '<p><span class="line" style="color:#123456">a</span> <span>b</span></p>\n',
    );
  });
});

describe("tableOfContents", () => {
  it("lists level two and three headings as text", () => {
    expect(
      tableOfContents(
        '<h1 id="user-content-t">T</h1><h2 id="user-content-a">A &amp; <code>b</code></h2><h4 id="user-content-x">X</h4><h3 id="user-content-c">C</h3>',
      ),
    ).toEqual([
      { id: "user-content-a", anchor: "a", text: "A & b", level: 2 },
      { id: "user-content-c", anchor: "c", text: "C", level: 3 },
    ]);
  });
});

describe("doc page data", () => {
  const docs = loadDocs(FIXTURE);
  const sectionOne = docs.sections.find((s) => s.name === "Section One");
  const second = docs.sections.find((s) => s.name === "Second Section");

  it("has no previous or next links for docs without an order", () => {
    expect(sectionOne.docs[0]).not.toHaveProperty("previous");
    expect(second.docs[0]).not.toHaveProperty("next");
  });

  it("lists docs linked to and from a page, once each", () => {
    expect(sectionOne.docs[0].related).toEqual([
      { title: "Section One", url: "/docs/section-one/" },
      { title: "Another Doc", url: "/docs/second-section/another-doc/" },
    ]);
    // Only linked to from First Doc.
    expect(second.docs[0].related).toEqual([
      { title: "First Doc", url: "/docs/section-one/first-doc/" },
    ]);
    // A section without its own page isn't a related doc.
    expect(sectionOne.related).toEqual([
      { title: "First Doc", url: "/docs/section-one/first-doc/" },
    ]);
  });

  it("links to GitHub's editor for each doc", () => {
    expect(sectionOne.docs[0].editUrl).toBe(
      "https://github.com/Public-Health-Scotland/technical-docs/edit/main/Section%20One/First%20Doc.md",
    );
  });

  it("keeps page-only details out of the navigation", () => {
    expect(docsManifest(docs).sections[1]).not.toHaveProperty("related");
    const [doc] = docsManifest(docs).sections[1].docs;
    expect(Object.keys(doc)).not.toEqual(
      expect.arrayContaining(["toc", "previous", "next", "editUrl", "html"]),
    );
    for (const field of [
      "toc",
      "previous",
      "next",
      "editUrl",
      "html",
      "about",
      "related",
    ]) {
      expect(doc).not.toHaveProperty(field);
    }
  });
});

describe("ordered docs", () => {
  // A section where two docs are read in turn and one stands alone.
  const dir = mkdtempSync(join(tmpdir(), "kb-order-"));
  mkdirSync(join(dir, "Guide"));
  const write = (name, text) => writeFileSync(join(dir, "Guide", name), text);
  write("README.md", "# Guide\n");
  write(
    "Start.md",
    "---\norder: 1\nauthor: octocat\nlast_reviewed: 2026-11-01\n---\n# Start\n",
  );
  write("Then.md", "---\norder: 2\n---\n# Then\n");
  write("Aside.md", "# Aside\n");
  const [guide] = loadDocs(dir).sections;
  const doc = (title) => guide.docs.find((d) => d.title === title);

  it("links ordered docs in turn, starting from the section page", () => {
    expect(doc("Start").previous).toEqual({
      title: "Guide",
      url: "/docs/guide/",
    });
    expect(doc("Start").next).toEqual({
      title: "Then",
      url: "/docs/guide/then/",
    });
    expect(doc("Then").previous).toEqual({
      title: "Start",
      url: "/docs/guide/start/",
    });
    expect(doc("Then").next).toBeNull();
  });

  it("leaves docs without an order out of the sequence", () => {
    expect(doc("Aside")).not.toHaveProperty("previous");
    expect(doc("Aside")).not.toHaveProperty("next");
  });

  it("shows the author and review date from the document details", () => {
    expect(doc("Start").about).toEqual({
      author: "octocat",
      lastReviewed: "2026-11-01",
    });
    expect(doc("Then")).not.toHaveProperty("about");
  });
});
