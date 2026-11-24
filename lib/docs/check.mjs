// Checks a technical-docs checkout for problems, with the line and a fix for
// each. The site build only stops for problems that would break it (see
// collect.mjs). These checks are for contributors, on their pull requests.
import { existsSync } from "node:fs";
import { join } from "node:path";
import MarkdownIt from "markdown-it";
import { collectDocs } from "./collect.mjs";
import { resolveRepoLink } from "./render.mjs";
import { RULES } from "./rules.mjs";

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
// A link like "posit.co" or "www.nhs.scot/page", which needs "https://".
const WEBSITE =
  /^(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|org|net|co|uk|scot|io|gov|edu|ac|nhs)(?:\/.*)?$/i;
const UNSAFE_NAME = /[?#%\\:*"<>|]/;
const NUMBERED_NAME = /^\d+\s*[.)_-]\s*/;
const VAGUE_LINK_TEXT = new Set([
  "click here",
  "click",
  "here.",
  "link",
  "this link",
  "this",
  "read more",
  "more",
  "more info",
]);
// HTML that's fine in a doc: line breaks in tables, collapsible sections and
// small inline markup Markdown doesn't have.
const ALLOWED_HTML = new Set(["br", "details", "summary", "sup", "sub", "kbd"]);

const markdown = new MarkdownIt({ html: true, linkify: true });

function nameIssues(path, name, isFile) {
  const issues = [];
  const shown = isFile ? name.replace(/\.md$/i, "") : name;
  if (UNSAFE_NAME.test(shown) || shown !== shown.trim()) {
    const fixed = shown.replace(new RegExp(UNSAFE_NAME, "g"), "").trim();
    issues.push({
      code: "KB006",
      file: path,
      message: `"${name}" has characters that can't be used in file names on Windows, or that make links to it harder to write.`,
      fix: `Rename it to "${fixed}${isFile ? ".md" : ""}".`,
    });
  }
  if (isFile && NUMBERED_NAME.test(shown)) {
    const number = parseInt(shown, 10);
    issues.push({
      code: "KB015",
      file: path,
      message: `"${name}" starts with a number.`,
      fix: `Rename it to "${shown.replace(NUMBERED_NAME, "")}.md" and add "order: ${number}" to its document details.`,
    });
  }
  return issues;
}

function textOf(tokens) {
  return tokens
    .map((t) =>
      t.type === "text" || t.type === "code_inline" ? t.content : "",
    )
    .join("")
    .trim();
}

// Problems in one doc's Markdown. linkExists(path) says whether a repository
// path is a file or folder in the checkout.
function markdownIssues(doc, linkExists) {
  const issues = [];
  // Table cells have no line of their own, so they use the last line seen.
  let line = 1;
  const at = (_token, code, message, fix) => {
    const last = issues.at(-1);
    const entry = { code, file: doc.path, line: doc.offset + line, message };
    if (fix) entry.fix = fix;
    const repeat =
      last &&
      last.code === code &&
      last.line === entry.line &&
      last.message === message;
    if (!repeat) issues.push(entry);
  };

  const tokens = markdown.parse(doc.source, {});
  let previousLevel = null;
  let titles = 0;

  for (const token of tokens) {
    if (token.map) line = token.map[0] + 1;
    if (token.type === "fence" && !token.info.trim()) {
      at(token, "KB010", "This code block doesn't say what language it is.");
    }

    if (token.type === "heading_open") {
      const level = Number(token.tag.slice(1));
      if (level === 1) titles += 1;
      if (level === 1 && titles === 2) {
        at(
          token,
          "KB011",
          "This is a second level-one (#) heading. Use ## for sections of the doc.",
        );
      }
      if (previousLevel !== null && level > previousLevel + 1) {
        at(
          token,
          "KB013",
          `This heading jumps from level ${previousLevel} to level ${level}.`,
        );
      }
      previousLevel = level;
    }

    if (token.type === "html_block") {
      reportHtml(token, token.content);
    }

    const children = token.children ?? [];
    children.forEach((child, index) => {
      if (child.type === "html_inline") reportHtml(token, child.content);

      if (child.type === "image") {
        if (!child.content.trim()) {
          at(
            token,
            "KB005",
            `The image "${child.attrGet("src")}" has no description.`,
          );
        }
        checkLink(token, child.attrGet("src"), "image");
      }

      if (child.type === "link_open") {
        const close = children.findIndex(
          (t, i) => i > index && t.type === "link_close",
        );
        const text = textOf(children.slice(index + 1, close));
        if (VAGUE_LINK_TEXT.has(text.toLowerCase())) {
          at(
            token,
            "KB014",
            `The link text "${text}" doesn't say where the link goes.`,
          );
        }
        if (child.markup !== "linkify") {
          checkLink(token, child.attrGet("href"), "link");
        }
      }
    });
  }

  if (titles === 0 && !doc.details.title) {
    issues.push({
      code: "KB011",
      file: doc.path,
      line: doc.offset + 1,
      message: `This doc has no level-one (#) heading, so it's titled "${doc.title}".`,
    });
  }

  function checkLink(token, href, kind) {
    if (!href || href.startsWith("#") || EXTERNAL.test(href)) return;
    const resolved = resolveRepoLink(href, doc.path);
    if (resolved && linkExists(resolved.path)) return;
    const email = /^[^/\s]+@[^/\s]+\.[a-z]+$/i.test(href);
    const website = WEBSITE.test(href);
    at(
      token,
      "KB003",
      email
        ? `The link "${href}" looks like an email address.`
        : website
          ? `The link "${href}" looks like a website.`
          : `The ${kind} "${href}" points at a file that isn't in the repository.`,
      email
        ? `Write it as "mailto:${href}".`
        : website
          ? `Write it in full, as "https://${href}".`
          : undefined,
    );
  }

  function reportHtml(token, html) {
    for (const [img] of html.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\balt\s*=\s*("[^"]+"|'[^']+'|[^\s>"']+)/i.test(img)) {
        at(
          token,
          "KB005",
          "This image (<img>) has no description.",
          'Add one with alt="…", describing what the image shows.',
        );
      }
    }
    const tags = [...html.matchAll(/<\/?([a-z][a-z0-9-]*)/gi)]
      .map((m) => m[1].toLowerCase())
      .filter((tag) => !ALLOWED_HTML.has(tag));
    if (tags.length) {
      at(
        token,
        "KB016",
        `This uses HTML (<${[...new Set(tags)].join(">, <")}>).`,
      );
    }
  }

  return issues;
}

// Returns { docs, diagnostics }: how many docs were checked and every problem
// found, each { code, severity, file, line?, message }, sorted by file.
export function checkDocs(dir) {
  const { sections, issues } = collectDocs(dir, { strict: false });
  const exists = (path) => path === "" || existsSync(join(dir, path));

  const found = [...issues];
  for (const section of sections) {
    found.push(...nameIssues(section.path, section.name, false));
    const docs = [section.readme, ...section.docs].filter(Boolean);
    for (const doc of docs) {
      if (doc !== section.readme) {
        found.push(...nameIssues(doc.path, doc.file, true));
      }
      found.push(...markdownIssues(doc, exists));
    }
  }

  const diagnostics = found
    .map((issue) => ({ ...issue, severity: RULES[issue.code].severity }))
    .sort(
      (a, b) =>
        a.file.localeCompare(b.file) ||
        (a.line ?? 0) - (b.line ?? 0) ||
        a.code.localeCompare(b.code),
    );
  const docs = sections.reduce(
    (total, s) => total + s.docs.length + (s.readme ? 1 : 0),
    0,
  );
  return { docs, diagnostics };
}
