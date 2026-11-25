// Reads a checkout of the technical-docs repository into sections and docs.
//
// Layout of technical-docs:
//   <Section name>/README.md     - the section's landing page
//   <Section name>/<Doc name>.md - one page per document
// Folders and files starting with "." (for example .github) are ignored, as
// are files at the top level.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { readFrontMatter } from "./frontmatter.mjs";

const README = /^readme\.md$/i;
const MARKDOWN = /\.md$/i;
const GLOSSARY = "Glossary";
// Names the site uses for its own files under /api/docs/.
const RESERVED = new Set(["manifest", "search"]);

// "How to Access Posit Workbench.md" -> "how-to-access-posit-workbench"
export function slugify(name) {
  return name
    .replace(MARKDOWN, "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// The first level-one heading, as plain text, or the fallback.
export function docTitle(source, fallback) {
  const heading = source.match(/^#[ \t]+(.+?)[ \t#]*$/m);
  if (!heading) return fallback;
  const text = heading[1]
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*`]/g, "")
    .trim();
  return text || fallback;
}

const byName = (a, b) =>
  a.name.localeCompare(b.name, "en", { sensitivity: "base" });

// Docs with an "order" come first, lowest first, then the rest by name.
const byOrderThenName = (a, b) =>
  (a.order ?? Infinity) - (b.order ?? Infinity) || byName(a, b);

function visibleEntries(dir) {
  return readdirSync(dir, { withFileTypes: true }).filter(
    (entry) => !entry.name.startsWith("."),
  );
}

// source is the Markdown without its front matter. offset is the number of
// lines removed, so problems can point at the right line of the file.
function readDoc(dir, sectionName, fileName) {
  const path = `${sectionName}/${fileName}`;
  const text = readFileSync(join(dir, path), "utf8");
  const { data, body, offset, problems } = readFrontMatter(text);
  const name = fileName.replace(MARKDOWN, "");
  return {
    name,
    file: fileName,
    path,
    title: data.title ?? docTitle(body, name),
    ...(data.description && { description: data.description }),
    ...(data.order !== undefined && { order: data.order }),
    details: data,
    detailProblems: problems,
    source: body,
    offset,
  };
}

// Two pages with the same web address can't both be published, so this
// throws unless the caller only wants the problems listed (content checks).
function checkSlugs(items, where, report) {
  const seen = new Map();
  for (const item of items) {
    if (!item.slug) {
      report({
        code: "KB002",
        file: item.path,
        message: `"${item.path}" has no letters or numbers to use in its web address.`,
      });
    } else if (where === "the documentation" && RESERVED.has(item.slug)) {
      report({
        code: "KB001",
        file: item.path,
        message: `"${item.path}" would have the web address /docs/${item.slug}/, which the site uses for its own files. Rename the folder.`,
      });
    } else if (seen.has(item.slug)) {
      report({
        code: "KB001",
        file: item.path,
        message: `"${seen.get(item.slug)}" and "${item.path}" in ${where} would have the same web address (/${item.slug}/). Rename one of them.`,
      });
    } else {
      seen.set(item.slug, item.path);
    }
  }
}

// Returns { sections, warnings, issues }. warnings are messages for the build
// log. issues are the same problems with a check code and file, for the
// content checks. With strict (the default) a problem that would break the
// site throws instead.
export function collectDocs(dir, { strict = true } = {}) {
  if (!existsSync(dir)) {
    throw new Error(
      `Documentation not found at ${dir}. Run "npm run docs:fetch", or set KB_DOCS_DIR to a technical-docs checkout.`,
    );
  }

  const issues = [];
  const report = (issue) => {
    if (strict) throw new Error(issue.message);
    issues.push(issue);
  };
  const warn = (issue) => issues.push(issue);

  const sections = visibleEntries(dir)
    .filter((entry) => entry.isDirectory())
    .map(({ name: sectionName }) => {
      const entries = visibleEntries(join(dir, sectionName));
      for (const entry of entries.filter((e) => e.isDirectory())) {
        warn({
          code: "KB012",
          file: `${sectionName}/${entry.name}`,
          message: `"${sectionName}/${entry.name}" is a folder inside a section. Documents in it aren't published.`,
        });
      }

      const files = entries.filter((e) => e.isFile() && MARKDOWN.test(e.name));
      const readmeFile = files.find((e) => README.test(e.name));
      const readme = readmeFile
        ? readDoc(dir, sectionName, readmeFile.name)
        : null;

      const docs = files
        .filter((e) => e !== readmeFile)
        .map((e) => ({
          ...readDoc(dir, sectionName, e.name),
          slug: slugify(e.name),
        }))
        .sort(byOrderThenName);
      checkSlugs(docs, `"${sectionName}"`, report);

      return {
        name: sectionName,
        slug: slugify(sectionName),
        path: sectionName,
        title: readme ? readme.title : sectionName,
        readme,
        docs,
      };
    })
    // Alphabetical, with the glossary last.
    .sort((a, b) =>
      a.name === GLOSSARY ? 1 : b.name === GLOSSARY ? -1 : byName(a, b),
    );
  checkSlugs(sections, "the documentation", report);

  for (const doc of sections.flatMap((s) => [s.readme, ...s.docs])) {
    for (const problem of doc?.detailProblems ?? []) {
      warn({
        code: problem.unknown ? "KB017" : "KB004",
        file: doc.path,
        line: 1,
        message: problem.field
          ? `"${problem.field}" in the document details ${problem.message}.`
          : `The document details at the top of the file ${problem.message}.`,
      });
    }
  }

  return {
    sections,
    warnings: issues.map((issue) => issue.message),
    issues,
  };
}
