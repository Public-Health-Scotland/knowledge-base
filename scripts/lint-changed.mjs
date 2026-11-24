#!/usr/bin/env node
// Lint only the files changed against a base ref, so existing files are
// tidied when they are next touched rather than in one large reformat.
//
// Usage: node scripts/lint-changed.mjs [base-ref]   (default: origin/main)

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { pathToFileURL } from "node:url";

const IGNORED_DIRS = [
  ".nuxt/",
  ".output/",
  "docs/",
  "node_modules/",
  "public/",
  ".content-src/",
];

const TOOLS = {
  eslint: /\.(js|mjs|cjs|vue)$/,
  stylelint: /\.(css|scss|vue)$/,
  prettier: /\.(js|mjs|cjs|vue|css|scss|json|ya?ml|md)$/,
};

/**
 * Group changed paths by the tool that should check them.
 * @param {string[]} paths repository-relative paths
 * @returns {{ eslint: string[], stylelint: string[], prettier: string[] }}
 */
export function selectFiles(paths) {
  const kept = paths.filter(
    (p) =>
      p &&
      // A file name can't be mistaken for a command-line option.
      !p.startsWith("-") &&
      ![...p].some((c) => c.charCodeAt(0) < 32) &&
      !IGNORED_DIRS.some((dir) => p.startsWith(dir)) &&
      p !== "package-lock.json",
  );
  return Object.fromEntries(
    Object.entries(TOOLS).map(([tool, pattern]) => [
      tool,
      kept.filter((p) => pattern.test(p)),
    ]),
  );
}

function changedFiles(baseRef) {
  const output = execFileSync(
    "git",
    ["diff", "-z", "--name-only", "--diff-filter=ACMR", `${baseRef}...HEAD`],
    { encoding: "utf8" },
  );
  return output.split("\0").filter((p) => p && existsSync(p));
}

const require = createRequire(import.meta.url);

// The tool's own script, run with Node directly. No shell is involved, so
// file names can't be read as commands (npx goes through a shell on Windows).
function toolScript(tool) {
  const manifest = require.resolve(`${tool}/package.json`);
  const { bin } = JSON.parse(readFileSync(manifest, "utf8"));
  return join(dirname(manifest), typeof bin === "string" ? bin : bin[tool]);
}

// Files are passed after "--" so they are never read as options.
export function run(command, options, files, stdio = "inherit") {
  const result = spawnSync(
    process.execPath,
    [toolScript(command), ...options, "--", ...files],
    { stdio },
  );
  return result.status === 0;
}

function main() {
  const baseRef = process.argv[2] || "origin/main";
  const files = selectFiles(changedFiles(baseRef));
  const total = new Set(Object.values(files).flat()).size;

  if (total === 0) {
    console.log(`No lintable files changed against ${baseRef}.`);
    return;
  }

  console.log(`Checking ${total} changed file(s) against ${baseRef}.`);
  const results = [
    files.eslint.length === 0 || run("eslint", [], files.eslint),
    files.stylelint.length === 0 ||
      run("stylelint", ["--allow-empty-input"], files.stylelint),
    files.prettier.length === 0 || run("prettier", ["--check"], files.prettier),
  ];

  if (results.includes(false)) {
    console.error(
      "\nLint failed. Run `npm run format` to fix formatting, then fix any remaining errors.",
    );
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
