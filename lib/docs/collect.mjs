// Reads a checkout of the technical-docs repository into sections and docs.
//
// Layout of technical-docs:
//   <Section name>/README.md     - the section's landing page
//   <Section name>/<Doc name>.md - one page per document
// Folders and files starting with "." (for example .github) are ignored, as
// are files at the top level.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const README = /^readme\.md$/i;
const MARKDOWN = /\.md$/i;
const GLOSSARY = "Glossary";

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

function visibleEntries(dir) {
  return readdirSync(dir, { withFileTypes: true }).filter(
    (entry) => !entry.name.startsWith("."),
  );
}

function readDoc(dir, sectionName, fileName) {
  const source = readFileSync(join(dir, sectionName, fileName), "utf8");
  const name = fileName.replace(MARKDOWN, "");
  return {
    name,
    file: fileName,
    path: `${sectionName}/${fileName}`,
    title: docTitle(source, name),
    source,
  };
}

function assertUniqueSlugs(items, where) {
  const seen = new Map();
  for (const item of items) {
    if (!item.slug) {
      throw new Error(
        `"${item.path}" has no letters or numbers to use in its web address.`,
      );
    }
    if (seen.has(item.slug)) {
      throw new Error(
        `"${seen.get(item.slug)}" and "${item.path}" in ${where} would have the same web address (/${item.slug}/). Rename one of them.`,
      );
    }
    seen.set(item.slug, item.path);
  }
}

export function collectDocs(dir) {
  if (!existsSync(dir)) {
    throw new Error(
      `Documentation not found at ${dir}. Run "npm run docs:fetch", or set KB_DOCS_DIR to a technical-docs checkout.`,
    );
  }

  const warnings = [];
  const sections = visibleEntries(dir)
    .filter((entry) => entry.isDirectory())
    .map(({ name: sectionName }) => {
      const entries = visibleEntries(join(dir, sectionName));
      for (const entry of entries.filter((e) => e.isDirectory())) {
        warnings.push(
          `"${sectionName}/${entry.name}" is a folder inside a section; documents in it are not published.`,
        );
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
        .sort(byName);
      assertUniqueSlugs(docs, `"${sectionName}"`);

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
  assertUniqueSlugs(sections, "the documentation");

  return { sections, warnings };
}
