// Every page the site generates is checked with axe for WCAG 2.2 A and AA
// problems. Pages are found in the generated output, so new pages and docs
// are checked without changing this file.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const SITE_DIR = process.env.SITE_DIR || ".output/public";

function pages(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      return entry.name.startsWith("_") || entry.name === "api"
        ? []
        : pages(path);
    }
    if (entry.name !== "index.html") return [];
    // Pages that only send old addresses on to new ones.
    if (/http-equiv="refresh"/i.test(readFileSync(path, "utf8"))) return [];
    const route = relative(SITE_DIR, dir).split(sep).join("/");
    return [route ? `/${route}/` : "/"];
  });
}

test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
});

for (const path of pages(SITE_DIR)) {
  test(`${path} has no WCAG A or AA problems`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      // Doc content comes from technical-docs, which checks it on every pull
      // request (npm run docs:check). This checks the site around it.
      .exclude(".kb-content")
      .analyze();
    const summary = violations.map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help} - ${v.nodes
          .slice(0, 3)
          .map((n) => n.target.join(" "))
          .join(", ")}`,
    );
    expect(summary).toEqual([]);
  });
}
