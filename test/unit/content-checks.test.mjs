import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { checkDocs } from "../../lib/docs/check.mjs";
import { collectDocs } from "../../lib/docs/collect.mjs";
import { readFrontMatter } from "../../lib/docs/frontmatter.mjs";
import {
  formatGithub,
  formatSummary,
  formatText,
} from "../../lib/docs/report.mjs";
import { RULES, ruleAnchor, rulesReference } from "../../lib/docs/rules.mjs";

const FIXTURE = fileURLToPath(
  new URL("../fixtures/content-checks", import.meta.url),
);
const TODAY = "2026-11-23";

describe("readFrontMatter", () => {
  it("returns the doc unchanged when there are no details", () => {
    expect(readFrontMatter("# Title\n")).toEqual({
      data: {},
      body: "# Title\n",
      offset: 0,
      problems: [],
    });
  });

  it("reads valid details and counts the lines it removed", () => {
    const source =
      "---\ntitle: Guide\norder: 2\nauthor: '@octocat'\nlast_reviewed: 2026-01-31\nreview_interval: 6\n---\n# Guide\n";
    expect(readFrontMatter(source, { today: TODAY })).toEqual({
      data: {
        title: "Guide",
        order: 2,
        author: "octocat",
        last_reviewed: "2026-01-31",
        review_interval: 6,
      },
      body: "# Guide\n",
      offset: 7,
      problems: [],
    });
  });

  it.each([
    ["order: -1", "order"],
    ["order: 1.5", "order"],
    ["author: not a login", "author"],
    ["last_reviewed: 2026-02-30", "last_reviewed"],
    ["last_reviewed: 01/02/2026", "last_reviewed"],
    ["last_reviewed: 2026-12-01", "last_reviewed"],
    ["review_interval: 48", "review_interval"],
    ["title: ''", "title"],
  ])("rejects %s", (line, field) => {
    const { data, problems } = readFrontMatter(`---\n${line}\n---\n`, {
      today: TODAY,
    });
    expect(data).toEqual({});
    expect(problems).toEqual([{ field, message: expect.any(String) }]);
  });

  it("reports details it can't read, and unknown fields", () => {
    expect(readFrontMatter("---\ntitle: [x\n---\n").problems).toEqual([
      { field: null, message: expect.stringMatching(/^can't be read/) },
    ]);
    expect(readFrontMatter("---\nreviewer: x\n---\n").problems).toEqual([
      { field: "reviewer", message: expect.any(String), unknown: true },
    ]);
  });

  it("leaves a horizontal rule later in the doc alone", () => {
    const source = "# Title\n\n---\n\nText\n";
    expect(readFrontMatter(source).body).toBe(source);
  });
});

describe("collectDocs with document details", () => {
  const { sections } = collectDocs(FIXTURE, { strict: false });
  const good = sections.find((s) => s.name === "Good Section");

  it("puts docs with an order first, then the rest by name", () => {
    expect(good.docs.map((d) => d.name)).toEqual(["Second", "First"]);
  });

  it("takes the title and description from the details", () => {
    expect(good.docs[0]).toMatchObject({
      title: "Second, by its details",
      description: "A doc with every detail set.",
      order: 1,
    });
    expect(good.docs[0].source.startsWith("\n# Second")).toBe(true);
  });

  it("throws on a clash unless only listing problems", () => {
    expect(() => collectDocs(FIXTURE)).toThrow(/web address/);
  });
});

describe("checkDocs", () => {
  const result = checkDocs(FIXTURE);
  const codes = (file) =>
    result.diagnostics.filter((d) => d.file === file).map((d) => d.code);

  it("finds nothing in docs that follow the guidance", () => {
    expect(
      result.diagnostics.filter((d) => d.file.startsWith("Good Section")),
    ).toEqual([]);
  });

  it("finds problems in a doc, each on its line", () => {
    const numbered = "Bad Section/1. Numbered.md";
    expect(codes(numbered)).toEqual([
      "KB015",
      "KB011",
      "KB013",
      "KB003",
      "KB003",
      "KB003",
      "KB014",
      "KB003",
      "KB005",
      "KB005",
      "KB016",
      "KB010",
    ]);
    expect(result.diagnostics.find((d) => d.code === "KB010").line).toBe(11);
  });

  it("suggests the fix for links and names it can work out", () => {
    const fixes = result.diagnostics.map((d) => d.fix).filter(Boolean);
    expect(fixes).toEqual(
      expect.arrayContaining([
        'Write it in full, as "https://posit.co".',
        'Write it as "mailto:someone@phs.scot".',
        'Rename it to "Numbered.md" and add "order: 1" to its document details.',
        'Rename it to "What.md".',
      ]),
    );
  });

  it("checks document details", () => {
    expect(codes("Bad Section/Details.md")).toEqual([
      "KB004",
      "KB004",
      "KB017",
      "KB011",
    ]);
    expect(codes("Bad Section/Broken YAML.md")).toEqual(["KB004"]);
  });

  it("checks folders and names", () => {
    expect(codes("Bad Section/Nested")).toEqual(["KB012"]);
    expect(codes("Bad Section/What?.md")).toEqual(["KB006"]);
    expect(codes("Clash/Same-Name.md")).toEqual(["KB001"]);
    expect(codes("Clash/!!!.md")).toEqual(["KB002"]);
  });

  it("marks each problem as must fix or suggestion from the rules", () => {
    for (const d of result.diagnostics) {
      expect(d.severity).toBe(RULES[d.code].severity);
    }
  });
});

describe("check output", () => {
  const result = {
    docs: 2,
    diagnostics: [
      {
        code: "KB003",
        severity: "error",
        file: "R/a,b:c.md",
        line: 4,
        message: "Line one\nline two | 100%",
      },
      { code: "KB012", severity: "warning", file: "R/Nested", message: "x" },
    ],
  };

  it("escapes annotations so content can't add workflow commands", () => {
    const [error, warning] = formatGithub(result).split("\n");
    expect(error).toMatch(
      /^::error file=R\/a%2Cb%3Ac\.md,line=4,title=KB003 Broken link::Line one%0Aline two \| 100%25 /,
    );
    expect(warning).toMatch(/^::warning file=R\/Nested,title=KB012/);
  });

  it("splits must-fix problems from suggestions", () => {
    const text = formatText(result);
    expect(text.indexOf("Must fix (1)")).toBeLessThan(
      text.indexOf("Suggestions (1)"),
    );
    expect(text).toContain("Checked 2 docs: 1 problem to fix, 1 suggestion.");
  });

  it("escapes table cells in the job summary", () => {
    expect(formatSummary(result)).toContain("line two \\| 100%");
  });
});

describe("rules reference", () => {
  it("has a heading whose GitHub id matches each rule's link", () => {
    const reference = rulesReference();
    for (const code of Object.keys(RULES)) {
      expect(reference).toContain(`#### ${code} ${RULES[code].title}`);
    }
    expect(ruleAnchor("KB004")).toBe("kb004-document-details-cant-be-used");
  });
});
