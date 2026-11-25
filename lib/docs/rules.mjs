import { slug } from "github-slugger";

// The content checks run on technical-docs, in one table so the messages,
// the reference in technical-docs' CONTRIBUTING.md and the code can't drift.
//
// "error" means the problem breaks the site or stops someone using a page,
// and blocks a pull request once checks are required. "warning" is a
// suggestion and never blocks.

export const CONTRIBUTING_URL =
  "https://github.com/Public-Health-Scotland/technical-docs/blob/main/CONTRIBUTING.md";

export const RULES = {
  KB001: {
    title: "Same web address",
    severity: "error",
    why: "Each page needs its own web address, so only one of them could be published.",
    fix: "Rename one of the files or folders so their names differ by more than punctuation or capital letters.",
  },
  KB002: {
    title: "No web address",
    severity: "error",
    why: "Web addresses are made from the letters and numbers in a name, and this name has none.",
    fix: "Rename the file or folder to include some words.",
  },
  KB003: {
    title: "Broken link",
    severity: "error",
    why: "Readers following the link get a missing page or a missing image.",
    fix: "Check the spelling and capital letters of the file name. Links between docs start from the top of the repository, e.g. `/R/R%20Style%20Guide.md`.",
  },
  KB004: {
    title: "Document details can't be used",
    severity: "error",
    why: "The details between the `---` lines at the top of a doc set its title, order and review date.",
    fix: 'Write each detail as `name: value` on its own line, e.g. `last_reviewed: 2026-11-01`. See "Document details" in this guide.',
  },
  KB005: {
    title: "Image has no description",
    severity: "error",
    why: "People using screen readers hear nothing for an image without a description (alt text).",
    fix: "Describe what the image shows inside the square brackets, e.g. `![Posit Workbench new session dialog](new-session.png)`.",
  },
  KB006: {
    title: "Character not allowed in a file name",
    severity: "error",
    why: "Windows doesn't allow `?`, `:`, `*`, `\"`, `<`, `>`, `|` or `\\` in file names, so anyone working on a Windows laptop can't download the docs with Git. `#` and `%` are allowed on Windows, but links to the file have to write them as `%23` and `%25`, which is easy to get wrong. Spaces at the start or end of a name are dropped on Windows.",
    fix: "Remove the character or use a word instead, e.g. `What is Positron.md` rather than `What is Positron?.md`. The site's web address is made from the words in the name, so it doesn't change.",
  },
  KB010: {
    title: "Code block has no language",
    severity: "warning",
    why: "Naming the language shows the code with the right highlighting.",
    fix: "Add the language after the opening backticks, e.g. ` ```r ` or ` ```bash `. Use ` ```text ` for output.",
  },
  KB011: {
    title: "Page title missing or repeated",
    severity: "warning",
    why: "The level-one (`#`) heading is the page title. Without one the page is named after its file, and with two, screen reader users can't tell which is the main heading.",
    fix: "Start the doc with one `#` heading, e.g. `# How to Access Posit Workbench`, and use `##` for its sections.",
  },
  KB012: {
    title: "Not published",
    severity: "warning",
    why: "The site only publishes docs directly inside a section folder.",
    fix: "Move the docs up into the section folder, or into a new section at the top of the repository.",
  },
  KB013: {
    title: "Headings skip a level",
    severity: "warning",
    why: "Screen reader users move around a page by its headings, and a skipped level looks like missing content.",
    fix: "Go down one level at a time, e.g. `##` then `###`, not `##` then `####`.",
  },
  KB014: {
    title: "Link text doesn't say where it goes",
    severity: "warning",
    why: 'Screen readers often list links on their own, where "click here" means nothing.',
    fix: "Use the name of the page or what it does, e.g. `[request a Posit Workbench account](…)`.",
  },
  KB015: {
    title: "Numbered file name",
    severity: "warning",
    why: "Numbers in a file name end up in the page's web address and navigation.",
    fix: "Remove the number and set the position with `order:` in the document details instead.",
  },
  KB016: {
    title: "HTML in a doc",
    severity: "warning",
    why: "HTML is harder to review and edit than Markdown, and some of it is removed when the site is built.",
    fix: "Use Markdown instead where you can. `<br>` in tables and `<details>` are fine.",
  },
  KB017: {
    title: "Unknown document detail",
    severity: "warning",
    why: "The site ignores details it doesn't recognise, which is often a misspelt name.",
    fix: 'Check the spelling against the list in "Document details" in this guide.',
  },
};

// "KB003" -> "kb003-broken-link", the id GitHub gives the heading
// "#### KB003 Broken link" in CONTRIBUTING.md.
export const ruleAnchor = (code) => slug(`${code} ${RULES[code].title}`);

export const ruleUrl = (code) => `${CONTRIBUTING_URL}#${ruleAnchor(code)}`;

// The reference section for technical-docs' CONTRIBUTING.md.
export function rulesReference() {
  const section = (severity, heading, intro) => [
    `### ${heading}`,
    "",
    intro,
    "",
    ...Object.entries(RULES)
      .filter(([, rule]) => rule.severity === severity)
      .flatMap(([code, rule]) => [
        `#### ${code} ${rule.title}`,
        "",
        `${rule.why} ${rule.fix}`,
        "",
      ]),
  ];
  return [
    "## Content checks",
    "",
    "Every pull request is checked automatically. The results appear on the pull request's **Checks** tab and beside the lines they refer to under **Files changed**.",
    "",
    ...section(
      "error",
      "Must fix",
      "These break the site or stop someone using a page, so they need fixing before the pull request is merged.",
    ),
    ...section(
      "warning",
      "Suggestions",
      "These make docs easier to read and use. They never stop a pull request being merged.",
    ),
  ]
    .join("\n")
    .trimEnd();
}
