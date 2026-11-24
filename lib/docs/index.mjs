// Loads technical-docs into the pages, navigation and links the site needs.
// Runs at build time only. Visitors never call GitHub for documentation.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { collectDocs } from "./collect.mjs";
import { findSiteRedirect } from "./redirects.mjs";
import { renderMarkdown } from "./render.mjs";

export const DOCS_REPO = "Public-Health-Scotland/technical-docs";
const BLOB = `https://github.com/${DOCS_REPO}/blob/main/`;
const RAW = `https://raw.githubusercontent.com/${DOCS_REPO}/main/`;

const encodePath = (path) => path.split("/").map(encodeURIComponent).join("/");

// The commit the docs were built from, so the live version can be checked.
export function docsVersion(dir) {
  try {
    return execFileSync("git", ["-C", dir, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

// Adds a url (and a GitHub link) to each section and doc.
export function addUrls(sections) {
  for (const section of sections) {
    section.url = `/docs/${section.slug}/`;
    section.githubUrl = BLOB + encodePath(section.readme?.path ?? section.path);
    for (const doc of section.docs) {
      doc.url = `${section.url}${doc.slug}/`;
      doc.githubUrl = BLOB + encodePath(doc.path);
    }
  }
  return sections;
}

// What the site needs about a doc, without its source or check details.
function pageFields(doc) {
  const copy = { ...doc };
  for (const field of ["source", "offset", "details", "detailProblems"]) {
    delete copy[field];
  }
  return copy;
}

export function loadDocs(dir, { base = "/", redirects = {} } = {}) {
  const { sections, warnings } = collectDocs(dir);
  addUrls(sections);

  const prefix = base.replace(/\/+$/, "");
  const pages = new Map([
    ["", "/docs/"],
    ["README.md", "/docs/"],
  ]);
  for (const section of sections) {
    pages.set(section.path, section.url);
    if (section.readme) pages.set(section.readme.path, section.url);
    for (const doc of section.docs) pages.set(doc.path, doc.url);
  }

  const links = {
    resolve: (path) => (pages.has(path) ? prefix + pages.get(path) : null),
    exists: (path) => existsSync(join(dir, path)),
    legacy: (href) => {
      const target = findSiteRedirect(redirects, href);
      return target && prefix + target;
    },
    fallback: (path, attribute) =>
      (attribute === "src" ? RAW : BLOB) + encodePath(path),
  };
  const render = (doc) =>
    renderMarkdown(doc.source, {
      path: doc.path,
      links,
      warn: (message) => warnings.push(message),
    });

  return {
    version: docsVersion(dir),
    warnings,
    sections: sections.map(({ readme, docs, ...section }) => ({
      ...section,
      ...(readme?.description && { description: readme.description }),
      html: readme ? render(readme) : "",
      docs: docs.map((doc) => ({ ...pageFields(doc), html: render(doc) })),
    })),
  };
}

// Navigation only: names, titles and addresses, without page content.
export function docsManifest(docs) {
  const withoutHtml = (item) => {
    const copy = { ...item };
    delete copy.html;
    return copy;
  };
  return {
    sections: docs.sections.map((section) => ({
      ...withoutHtml(section),
      docs: section.docs.map(withoutHtml),
    })),
  };
}
