// Formats content check results for a terminal, for GitHub annotations and
// for a GitHub job summary.
import { RULES, ruleUrl } from "./rules.mjs";

const fixFor = (d) => d.fix ?? RULES[d.code].fix;
const where = (d) => (d.line ? `${d.file}:${d.line}` : d.file);

function split(diagnostics) {
  return {
    errors: diagnostics.filter((d) => d.severity === "error"),
    warnings: diagnostics.filter((d) => d.severity === "warning"),
  };
}

function byFile(diagnostics) {
  const files = new Map();
  for (const d of diagnostics) {
    if (!files.has(d.file)) files.set(d.file, []);
    files.get(d.file).push(d);
  }
  return files;
}

export function totals({ docs, diagnostics }) {
  const { errors, warnings } = split(diagnostics);
  const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
  return `Checked ${plural(docs, "doc")}: ${plural(errors.length, "problem")} to fix, ${plural(warnings.length, "suggestion")}.`;
}

export function formatText(result) {
  const { errors, warnings } = split(result.diagnostics);
  const group = (heading, list) =>
    list.length === 0
      ? []
      : [
          `${heading} (${list.length})`,
          "",
          ...[...byFile(list)].flatMap(([file, items]) => [
            file,
            ...items.flatMap((d) => [
              `  ${d.line ? `line ${d.line}` : "file"}  ${d.code} ${RULES[d.code].title}: ${d.message}`,
              `        ${fixFor(d)}`,
            ]),
            "",
          ]),
        ];
  return [
    ...group("Must fix", errors),
    ...group("Suggestions", warnings),
    totals(result),
    "Each check is explained in the technical-docs contributing guide:",
    ruleUrl("KB001").replace(/#.*/, "#content-checks"),
  ].join("\n");
}

// GitHub workflow commands, which show each problem beside its line on the
// pull request. Values are escaped so a file name can't inject a command.
const escapeData = (s) =>
  String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const escapeProperty = (s) =>
  escapeData(s).replace(/:/g, "%3A").replace(/,/g, "%2C");

export function formatGithub(result) {
  return result.diagnostics
    .map((d) => {
      const properties = [
        `file=${escapeProperty(d.file)}`,
        d.line && `line=${d.line}`,
        `title=${escapeProperty(`${d.code} ${RULES[d.code].title}`)}`,
      ].filter(Boolean);
      return `::${d.severity} ${properties.join(",")}::${escapeData(
        `${d.message} ${fixFor(d)} ${ruleUrl(d.code)}`,
      )}`;
    })
    .join("\n");
}

// Markdown for the job summary. Cells are escaped so content can't break
// the table.
const cell = (s) => String(s).replace(/\|/g, "\\|").replace(/\n/g, " ");

export function formatSummary(result) {
  const { errors, warnings } = split(result.diagnostics);
  const table = (list) => [
    "| Where | Check | What to do |",
    "| --- | --- | --- |",
    ...list.map(
      (d) =>
        `| ${cell(where(d))} | [${d.code} ${RULES[d.code].title}](${ruleUrl(d.code)}) | ${cell(d.message)} ${cell(fixFor(d))} |`,
    ),
  ];
  return [
    "## Documentation checks",
    "",
    totals(result),
    "",
    "### Must fix before merging",
    "",
    ...(errors.length ? table(errors) : ["Nothing to fix."]),
    "",
    "### Suggestions",
    "",
    ...(warnings.length
      ? [
          "These never stop a pull request being merged.",
          "",
          ...table(warnings),
        ]
      : ["No suggestions."]),
    "",
  ].join("\n");
}
