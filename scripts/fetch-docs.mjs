// Downloads (or updates) the technical-docs content that the docs pages are
// built from, into .content-src/technical-docs.
//
//   npm run docs:fetch
//
// To build from your own technical-docs checkout instead, skip this and set
// KB_DOCS_DIR, e.g. KB_DOCS_DIR=../technical-docs npm run dev
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const REPO = "https://github.com/Public-Health-Scotland/technical-docs.git";
const DIR = ".content-src/technical-docs";
const REF = process.env.KB_DOCS_REF || "main";

const git = (...args) => execFileSync("git", args, { stdio: "inherit" });

if (existsSync(`${DIR}/.git`)) {
  git("-C", DIR, "fetch", "--depth", "1", "origin", REF);
  git("-C", DIR, "checkout", "--quiet", "--force", "FETCH_HEAD");
} else {
  mkdirSync(dirname(DIR), { recursive: true });
  git("clone", "--quiet", "--depth", "1", "--branch", REF, REPO, DIR);
}
console.log(`Documentation from technical-docs (${REF}) is in ${DIR}`);
