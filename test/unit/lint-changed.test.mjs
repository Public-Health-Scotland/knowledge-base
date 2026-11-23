import { describe, expect, test } from "vitest";
import { selectFiles } from "../../scripts/lint-changed.mjs";

describe("selectFiles", () => {
  test("routes each file to the tools that understand it", () => {
    const files = selectFiles([
      "pages/docs.vue",
      "nuxt.config.js",
      "assets/content.scss",
      "README.md",
    ]);

    expect(files.eslint).toEqual(["pages/docs.vue", "nuxt.config.js"]);
    expect(files.stylelint).toEqual(["pages/docs.vue", "assets/content.scss"]);
    expect(files.prettier).toEqual([
      "pages/docs.vue",
      "nuxt.config.js",
      "assets/content.scss",
      "README.md",
    ]);
  });

  test("skips generated output, dependencies, static assets and the lockfile", () => {
    const files = selectFiles([
      "docs/index.html",
      ".nuxt/client.js",
      "node_modules/x/index.js",
      "static/phs-logo.png",
      "package-lock.json",
    ]);

    expect(files).toEqual({ eslint: [], stylelint: [], prettier: [] });
  });

  test("ignores empty entries from git output", () => {
    expect(selectFiles(["", "pages/index.vue"]).eslint).toEqual([
      "pages/index.vue",
    ]);
  });
});
