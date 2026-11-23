// Points git at the repository's hooks in .githooks. Runs on `npm install`.
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", stdio: "pipe" }).trim();

try {
  // Only for a developer's own checkout, not CI or installs as a dependency.
  if (
    !process.env.CI &&
    resolve(git("rev-parse", "--show-toplevel")) === resolve(process.cwd())
  ) {
    git("config", "core.hooksPath", ".githooks");
  }
} catch {
  // Not a git checkout: nothing to set up.
}
