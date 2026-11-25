// Turns a technical-docs Markdown file into safe HTML for the site.
import { posix } from "node:path";
import GithubSlugger from "github-slugger";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import sanitizeHtml from "sanitize-html";
import { highlightCode, languageName, languageOf } from "./highlight.mjs";

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

// Every id and anchor name from a doc starts with "user-content-", as on
// GitHub, so a doc can never stand in for an element the site depends on
// (such as the page data Nuxt finds with getElementById("__NUXT_DATA__")).
// Links keep the plain form, such as #naming, and
// app/plugins/content-anchors.client.js scrolls to the prefixed heading.
export const ID_PREFIX = "user-content-";

const prefixed = (value) =>
  value.startsWith(ID_PREFIX) ? value : `${ID_PREFIX}${value}`;

// Prefixes the attribute, or drops it if it's empty.
const namespace = (attribute) => (tagName, attribs) => {
  const safe = { ...attribs };
  if (attribute in safe) {
    if (safe[attribute].trim()) safe[attribute] = prefixed(safe[attribute]);
    else delete safe[attribute];
  }
  return { tagName, attribs: safe };
};

// GitHub's callouts: a quote starting with [!NOTE], [!TIP] and so on.
const ALERTS = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution",
};
const ALERT_MARKER =
  /^\[!(note|tip|important|warning|caution)\][ \t]*(?:\n|$)/i;

// Turns "> [!WARNING]" quotes into labelled callouts, as GitHub shows them.
// The label is text, so the type doesn't rely on colour or an icon alone.
function githubAlerts(markdown) {
  markdown.core.ruler.after("block", "github_alerts", (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i += 1) {
      const inline = tokens[i + 2];
      if (
        tokens[i].type !== "blockquote_open" ||
        tokens[i + 1]?.type !== "paragraph_open" ||
        inline?.type !== "inline"
      ) {
        continue;
      }
      const marker = inline.content.match(ALERT_MARKER);
      if (!marker) continue;

      inline.content = inline.content.slice(marker[0].length);
      if (!inline.content.trim()) tokens.splice(i + 1, 3);

      let depth = 0;
      let close = i;
      for (; close < tokens.length; close += 1) {
        if (tokens[close].type === "blockquote_open") depth += 1;
        if (tokens[close].type === "blockquote_close") depth -= 1;
        if (depth === 0) break;
      }
      tokens[i].type = "alert_open";
      tokens[i].meta = { type: marker[1].toLowerCase() };
      tokens[close].type = "alert_close";
    }
  });
  markdown.renderer.rules.alert_open = (tokens, idx) => {
    const { type } = tokens[idx].meta;
    return `<div class="markdown-alert markdown-alert-${type}"><p class="markdown-alert-title">${ALERTS[type]}</p>\n`;
  };
  markdown.renderer.rules.alert_close = () => "</div>\n";
}

// Wide tables and long lines of code scroll sideways in their own box, which
// keyboard users can focus to scroll.
function scrollableBlocks(markdown) {
  const { rules } = markdown.renderer;
  rules.table_open = () =>
    '<div class="table-scroll" role="region" aria-label="Table" tabindex="0">\n<table>\n';
  rules.table_close = () => "</table>\n</div>\n";
  for (const name of ["fence", "code_block"]) {
    const original = rules[name];
    rules[name] = (...args) =>
      original(...args).replace(/^<pre>/, '<pre tabindex="0">');
  }
}

// Code in a known language is labelled with it. The label is outside the
// <pre>, so it isn't copied with the code.
function languageLabels(markdown) {
  const { rules } = markdown.renderer;
  const original = rules.fence;
  rules.fence = (tokens, idx, ...rest) => {
    const html = original(tokens, idx, ...rest);
    const name = languageName(languageOf(tokens[idx].info));
    if (!name) return html;
    return `<div class="code-block"><p class="code-language">${name}</p>\n${html}</div>\n`;
  };
}

// Drops each named attribute unless it has the allowed value.
const keepOnly = (allowed) => (tagName, attribs) => {
  const safe = { ...attribs };
  for (const [name, value] of Object.entries(allowed)) {
    if (name in safe && safe[name] !== value) delete safe[name];
  }
  return { tagName, attribs: safe };
};

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
    // Scrolling code blocks and tables can be reached with the keyboard.
    pre: ["tabindex"],
    div: ["class", "aria-label", "role", "tabindex"],
    p: ["class"],
    // Colours from the syntax highlighter.
    span: ["class", "style"],
  },
  allowedClasses: {
    code: ["language-*"],
    div: ["markdown-alert", "markdown-alert-*", "table-scroll", "code-block"],
    p: ["markdown-alert-title", "code-language"],
    span: ["line"],
  },
  allowedStyles: {
    "*": { "text-align": [/^(left|right|center)$/] },
    span: { color: [/^#[0-9a-f]{6}$/i] },
  },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
  transformTags: {
    ...Object.fromEntries(
      ["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => [tag, namespace("id")]),
    ),
    // Only the values the renderer itself uses, whatever raw HTML says.
    pre: keepOnly({ tabindex: "0" }),
    div: keepOnly({ tabindex: "0", role: "region" }),
    // Every link that opens a new tab, including ones written as raw HTML in
    // a doc, gets rel="noopener noreferrer".
    a: (tagName, attribs) => {
      const safe = namespace("name")(tagName, attribs).attribs;
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
  const markdown = new MarkdownIt({
    html: true,
    linkify: true,
    highlight: (code, language) =>
      highlightCode(code.replace(/\n$/, ""), languageOf(language)) ?? "",
  })
    .use(
      markdownItAnchor,
      // Match GitHub's heading ids, which existing links already use.
      { slugify: (text) => slugger.slug(text) },
    )
    .use(githubAlerts)
    .use(scrollableBlocks)
    .use(languageLabels);

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
