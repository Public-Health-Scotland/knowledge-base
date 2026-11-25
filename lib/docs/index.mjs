// Loads technical-docs into the pages, navigation and links the site needs.
// Runs at build time only. Visitors never call GitHub for documentation.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { collectDocs } from "./collect.mjs";
import { findSiteRedirect } from "./redirects.mjs";
import { renderMarkdown } from "./render.mjs";
import { tableOfContents } from "./text.mjs";

export const DOCS_REPO = "Public-Health-Scotland/technical-docs";
const BLOB = `https://github.com/${DOCS_REPO}/blob/main/`;
const EDIT = `https://github.com/${DOCS_REPO}/edit/main/`;
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
    if (section.readme) {
      section.editUrl = EDIT + encodePath(section.readme.path);
    }
    for (const doc of section.docs) {
      doc.url = `${section.url}${doc.slug}/`;
      doc.githubUrl = BLOB + encodePath(doc.path);
      doc.editUrl = EDIT + encodePath(doc.path);
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

// The document details shown beside a page. Only valid values are kept.
function aboutPage(doc) {
  const { author, last_reviewed: lastReviewed } = doc?.details ?? {};
  const about = {
    ...(author && { author }),
    ...(lastReviewed && { lastReviewed }),
  };
  return Object.keys(about).length ? about : undefined;
}

// Docs a page links to, then docs that link to it, each listed once.
function relatedPages(url, linksFrom, titles) {
  const linkedTo = [...(linksFrom.get(url) ?? [])];
  const linkedFrom = [...linksFrom]
    .filter(([from, targets]) => from !== url && targets.has(url))
    .map(([from]) => from)
    .sort((a, b) => titles.get(a).localeCompare(titles.get(b), "en"));
  const urls = [...new Set([...linkedTo, ...linkedFrom])].filter(
    (other) => other !== url && titles.has(other),
  );
  return urls.map((other) => ({ title: titles.get(other), url: other }));
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
  // The site pages each page links to, for its related docs.
  const linksFrom = new Map();
  const render = (doc, url) => {
    const found = new Set();
    linksFrom.set(url, found);
    return renderMarkdown(doc.source, {
      path: doc.path,
      links: {
        ...links,
        resolve: (path) => {
          const target = links.resolve(path);
          if (target) found.add(target.slice(prefix.length));
          return target;
        },
      },
      warn: (message) => warnings.push(message),
    });
  };

  const built = sections.map(({ readme, docs, ...section }) => {
    const html = readme ? render(readme, section.url) : "";
    // Previous and next are only for docs given an order, as those are meant
    // to be read in turn. The first one goes back to the section page.
    const ordered = docs.filter((doc) => doc.order !== undefined);
    const link = (page) => page && { title: page.title, url: page.url };
    const pager = (doc) => {
      const i = ordered.indexOf(doc);
      if (i === -1) return {};
      return {
        previous: link(i === 0 ? (readme ? section : null) : ordered[i - 1]),
        next: link(ordered[i + 1]) ?? null,
      };
    };
    return {
      ...section,
      ...(readme?.description && { description: readme.description }),
      ...(aboutPage(readme) && { about: aboutPage(readme) }),
      html,
      toc: tableOfContents(html),
      docs: docs.map((doc) => {
        const docHtml = render(doc, doc.url);
        return {
          ...pageFields(doc),
          ...(aboutPage(doc) && { about: aboutPage(doc) }),
          html: docHtml,
          toc: tableOfContents(docHtml),
          ...pager(doc),
        };
      }),
    };
  });

  // Related docs need every page's links, so they're added last.
  const titles = new Map();
  for (const section of built) {
    if (section.html) titles.set(section.url, section.title);
    for (const doc of section.docs) titles.set(doc.url, doc.title);
  }
  for (const page of built.flatMap((section) => [section, ...section.docs])) {
    page.related = relatedPages(page.url, linksFrom, titles);
  }

  return { version: docsVersion(dir), warnings, sections: built };
}

// Navigation only: names, titles and addresses, without page content.
export function docsManifest(docs) {
  const withoutHtml = (item) => {
    const copy = { ...item };
    for (const field of [
      "html",
      "toc",
      "previous",
      "next",
      "editUrl",
      "about",
      "related",
    ]) {
      delete copy[field];
    }
    return copy;
  };
  return {
    sections: docs.sections.map((section) => ({
      ...withoutHtml(section),
      docs: section.docs.map(withoutHtml),
    })),
  };
}
