// Turns a technical-docs Markdown file into safe HTML for the site.
import { posix } from "node:path";
import GithubSlugger from "github-slugger";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import sanitizeHtml from "sanitize-html";

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

const SANITIZE = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "del",
    "details",
    "summary",
  ],
  allowedAttributes: {
    // Ids only on headings (for #anchor links), so content can't override
    // ids the site itself uses.
    ...Object.fromEntries(
      ["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => [tag, ["id"]]),
    ),
    a: ["href", "name", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height"],
    code: ["class"],
    th: ["style"],
    td: ["style"],
  },
  allowedStyles: { "*": { "text-align": [/^(left|right|center)$/] } },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
  transformTags: {
    // Every link that opens a new tab, including ones written as raw HTML in
    // a doc, gets rel="noopener noreferrer".
    a: (tagName, attribs) => {
      const safe = { ...attribs };
      delete safe.rel;
      if (safe.target === "_blank") safe.rel = "noopener noreferrer";
      return { tagName, attribs: safe };
    },
  },
};

function decode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// Resolves a link written in a doc to the repository path it points at,
// e.g. "../R/R%20Style%20Guide.md#naming" from "Python/README.md" gives
// { path: "R/R Style Guide.md", hash: "#naming" }. Returns null for links that
// point outside the repository.
export function resolveRepoLink(href, fromPath) {
  const [target, ...rest] = href.split("#");
  const hash = rest.length ? `#${rest.join("#")}` : "";
  const clean = decode(target.split("?")[0]);
  const joined = clean.startsWith("/")
    ? posix.normalize(clean.slice(1))
    : posix.join(posix.dirname(fromPath), clean);
  const path = joined.replace(/\/+$/, "").replace(/^\.$/, "");
  if (path.startsWith("..")) return null;
  return { path, hash };
}

// links.resolve(repoPath) returns the site URL for a repository path, or null.
// links.exists(repoPath) says whether the file is in the repository.
// links.legacy(href) returns the site URL for an old-style knowledge base link.
// links.fallback(repoPath, attribute) gives a GitHub URL for files that aren't
// pages on the site (for example CONTRIBUTING.md or an image).
export function renderMarkdown(source, { path, links, warn = () => {} }) {
  const slugger = new GithubSlugger();
  const markdown = new MarkdownIt({ html: true, linkify: true }).use(
    markdownItAnchor,
    // Match GitHub's heading ids, which existing links already use.
    { slugify: (text) => slugger.slug(text) },
  );

  function rewrite(token, attribute) {
    const href = token.attrGet(attribute);
    if (!href || href.startsWith("#")) return;

    if (EXTERNAL.test(href)) {
      const legacy = links.legacy(href);
      if (legacy) {
        token.attrSet(attribute, legacy);
        return;
      }
      if (attribute === "href" && /^https?:/i.test(href)) {
        token.attrSet("target", "_blank");
      }
      return;
    }

    const resolved = resolveRepoLink(href, path);
    const url = resolved && links.resolve(resolved.path);
    if (url) {
      token.attrSet(attribute, url + resolved.hash);
      return;
    }

    if (!resolved || !links.exists(resolved.path)) {
      warn(`"${path}" links to "${href}", which doesn't exist.`);
    }
    if (resolved) {
      token.attrSet(attribute, links.fallback(resolved.path, attribute));
    }
  }

  markdown.core.ruler.push("site_links", (state) => {
    for (const block of state.tokens) {
      for (const token of block.children || []) {
        if (token.type === "link_open") rewrite(token, "href");
        if (token.type === "image") rewrite(token, "src");
      }
    }
  });

  return sanitizeHtml(markdown.render(source), SANITIZE);
}
