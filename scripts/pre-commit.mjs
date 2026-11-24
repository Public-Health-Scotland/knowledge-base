// Runs before each commit: fixes formatting in staged files, says which files
// it changed, and stops the commit if problems remain that need a manual fix.
// Skip once with `git commit --no-verify`.
import { execFileSync } from "node:child_process";
import { run, selectFiles } from "./lint-changed.mjs";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" });
const list = (output) => output.split("\0").filter(Boolean);
const hash = (file) => git("hash-object", "--", file).trim();

const staged = list(
  git("diff", "--cached", "--name-only", "-z", "--diff-filter=ACMR"),
);
const files = selectFiles(staged);
const all = [...new Set(Object.values(files).flat())];
if (all.length === 0) process.exit(0);

// Files with unstaged edits are only checked, so those edits aren't committed.
const unstaged = new Set(list(git("diff", "--name-only", "-z")));
const fixable = (paths) => paths.filter((p) => !unstaged.has(p));
const before = new Map(fixable(all).map((file) => [file, hash(file)]));

const quiet = (command, options, paths) =>
  paths.length === 0 || run(command, options, paths, "ignore");
quiet("prettier", ["--write"], fixable(files.prettier));
quiet("eslint", ["--fix"], fixable(files.eslint));
quiet("stylelint", ["--fix", "--allow-empty-input"], fixable(files.stylelint));

const changed = [...before].filter(([file, was]) => hash(file) !== was);
if (changed.length > 0) {
  git("add", "--", ...changed.map(([file]) => file));
  console.log("Formatting fixed and included in this commit:");
  for (const [file] of changed) console.log(`  ${file}`);
  console.log("Review with `git show` after committing.\n");
}
for (const file of all.filter((p) => unstaged.has(p))) {
  console.log(`Checked but not fixed (has unstaged changes): ${file}`);
}

const passed = [
  files.eslint.length === 0 || run("eslint", [], files.eslint),
  files.stylelint.length === 0 ||
    run("stylelint", ["--allow-empty-input"], files.stylelint),
  files.prettier.length === 0 ||
    run("prettier", ["--check", "--log-level", "warn"], files.prettier),
].every(Boolean);

if (!passed) {
  console.error(
    "\nCommit stopped: fix the problems above, `git add` the files and commit again.",
  );
  process.exit(1);
}
