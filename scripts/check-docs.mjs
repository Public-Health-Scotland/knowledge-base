// Checks technical-docs content and explains how to fix each problem.
//
//   npm run docs:check                       all docs, readable output
//   npm run docs:check -- --format github    GitHub annotations (in Actions)
//   npm run docs:check -- R/README.md        only report on these files
//   npm run docs:check -- --advisory         report, but never fail
//   npm run docs:check -- --rules            the reference for CONTRIBUTING.md
//
// Reads .content-src/technical-docs (npm run docs:fetch), or --dir, or
// KB_DOCS_DIR. Exits with 1 when something must be fixed, unless --advisory.
// In GitHub Actions a summary is also added to the job's page.
import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { checkDocs } from "../lib/docs/check.mjs";
import {
  formatGithub,
  formatSummary,
  formatText,
  totals,
} from "../lib/docs/report.mjs";
import { rulesReference } from "../lib/docs/rules.mjs";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    dir: { type: "string" },
    format: { type: "string", default: "text" },
    advisory: { type: "boolean", default: false },
    rules: { type: "boolean", default: false },
  },
});

if (values.rules) {
  console.log(rulesReference());
  process.exit(0);
}
if (!["text", "github"].includes(values.format)) {
  console.error(`Unknown --format "${values.format}". Use text or github.`);
  process.exit(2);
}

const dir = resolve(
  values.dir || process.env.KB_DOCS_DIR || ".content-src/technical-docs",
);

let result;
try {
  result = checkDocs(dir);
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

// Problems in other files aren't the fault of the change being checked.
if (positionals.length) {
  const only = new Set(positionals.map((p) => p.replace(/^\.\//, "")));
  result = {
    ...result,
    diagnostics: result.diagnostics.filter((d) => only.has(d.file)),
  };
}

if (values.format === "github") {
  const annotations = formatGithub(result);
  if (annotations) console.log(annotations);
  console.log(totals(result));
} else {
  console.log(formatText(result));
}
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, formatSummary(result));
}

const mustFix = result.diagnostics.some((d) => d.severity === "error");
process.exit(mustFix && !values.advisory ? 1 : 0);
