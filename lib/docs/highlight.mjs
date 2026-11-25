// Colours code blocks by their language when the site is built, so no
// highlighting code is sent to the browser.
import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import bash from "@shikijs/langs/bash";
import css from "@shikijs/langs/css";
import diff from "@shikijs/langs/diff";
import dockerfile from "@shikijs/langs/dockerfile";
import html from "@shikijs/langs/html";
import ini from "@shikijs/langs/ini";
import javascript from "@shikijs/langs/javascript";
import json from "@shikijs/langs/json";
import markdown from "@shikijs/langs/markdown";
import powershell from "@shikijs/langs/powershell";
import python from "@shikijs/langs/python";
import r from "@shikijs/langs/r";
import sql from "@shikijs/langs/sql";
import toml from "@shikijs/langs/toml";
import yaml from "@shikijs/langs/yaml";
import theme from "@shikijs/themes/github-light-high-contrast";

const THEME = "github-light-high-contrast";

// The high contrast theme keeps every colour above 4.5:1 on the code block
// background. Its white and near-white text is only meant for coloured
// backgrounds, which aren't kept, so that text uses the normal colour.
const COLOR_REPLACEMENTS = { "#ffffff": "#0e1116", "#e7ecf0": "#0e1116" };

let highlighter;

function load() {
  highlighter ??= createHighlighterCoreSync({
    themes: [theme],
    langs: [
      bash,
      css,
      diff,
      dockerfile,
      html,
      ini,
      javascript,
      json,
      markdown,
      powershell,
      python,
      r,
      sql,
      toml,
      yaml,
    ],
    engine: createJavaScriptRegexEngine(),
  });
  return highlighter;
}

// R Markdown chunks are written as {r} or {r, echo=FALSE}.
export function languageOf(info) {
  const match = info.trim().match(/^\{?\s*([\w+#.-]+)/);
  return match ? match[1].toLowerCase() : "";
}

// Names shown above code blocks, by Shiki's name for each language.
const NAMES = {
  shellscript: "Bash",
  css: "CSS",
  diff: "Diff",
  docker: "Dockerfile",
  html: "HTML",
  ini: "INI",
  javascript: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  powershell: "PowerShell",
  python: "Python",
  r: "R",
  sql: "SQL",
  toml: "TOML",
  yaml: "YAML",
};

// Shiki's own name for a language or one of its aliases (such as "py"), or
// null when it isn't loaded.
function resolve(language) {
  const shiki = load();
  if (!language || !shiki.getLoadedLanguages().includes(language)) return null;
  return shiki.getLanguage(language).name;
}

// The name to show for a language, or null when it isn't one the site knows.
export function languageName(language) {
  return NAMES[resolve(language)] ?? null;
}

// Returns the coloured lines of code as HTML, or null when the language isn't
// known, so the block is shown as plain text.
export function highlightCode(code, language) {
  const lang = resolve(language);
  if (!lang) return null;
  const html = load().codeToHtml(code, {
    lang,
    theme: THEME,
    colorReplacements: COLOR_REPLACEMENTS,
  });
  // Only the coloured text is kept. The block itself is styled by the site.
  return html.replace(/^<pre[^>]*><code>/, "").replace(/<\/code><\/pre>$/, "");
}
