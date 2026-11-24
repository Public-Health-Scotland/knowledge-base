// Builds the documentation pages from a checkout of technical-docs.
//
// The checkout lives in .content-src/technical-docs (`npm run docs:fetch`), or
// wherever KB_DOCS_DIR points. Every doc becomes a pre-rendered page, so the
// site never calls the GitHub API.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { defineNuxtModule, useLogger } from "nuxt/kit";
import { collectDocs } from "../lib/docs/collect.mjs";
import { addUrls } from "../lib/docs/index.mjs";
import { redirectPages } from "../lib/docs/redirects.mjs";

export default defineNuxtModule({
  meta: { name: "docs" },
  setup(_options, nuxt) {
    const logger = useLogger("docs");
    const dir = resolve(
      nuxt.options.rootDir,
      process.env.KB_DOCS_DIR || ".content-src/technical-docs",
    );
    nuxt.options.runtimeConfig.docsDir = dir;
    if (nuxt.options._prepare) return;

    let collected;
    try {
      collected = collectDocs(dir);
    } catch (error) {
      // The rest of the site can still be developed without the docs.
      if (nuxt.options.dev) {
        logger.warn(error.message);
        return;
      }
      throw error;
    }

    const sections = addUrls(collected.sections);
    const live = new Set([
      "/docs/",
      ...sections.flatMap((s) => [s.url, ...s.docs.map((d) => d.url)]),
    ]);
    // The page data is also saved as files, so pages opened through the 404
    // page (such as old addresses) can load it without a server.
    const data = [
      "/api/docs/manifest.json",
      "/api/docs/search.json",
      ...sections.flatMap((s) => [
        `/api/docs/${s.slug}.json`,
        ...s.docs.map((d) => `/api/docs/${s.slug}/${d.slug}.json`),
      ]),
    ];

    // Old addresses must not shadow live pages, and should point at one.
    const redirects = JSON.parse(
      readFileSync(
        resolve(nuxt.options.srcDir, "assets/doc-redirects.json"),
        "utf8",
      ),
    );
    for (const [from, to] of Object.entries(redirects)) {
      if (live.has(`${from.replace(/\/+$/, "")}/`)) {
        throw new Error(
          `doc-redirects.json redirects "${from}", which is a live page. Remove that entry.`,
        );
      }
      if (!live.has(to)) {
        logger.warn(
          `doc-redirects.json sends "${from}" to "${to}", which no longer exists. Update the entry so old links keep working.`,
        );
      }
    }

    nuxt.hook("nitro:config", (config) => {
      config.prerender ||= {};
      config.prerender.routes = [
        ...(config.prerender.routes || []),
        ...live,
        ...data,
        "/docs-version.json",
      ];
    });

    nuxt.hook("nitro:init", (nitro) => {
      nitro.hooks.hook("prerender:done", () => {
        const pages = redirectPages(redirects, nitro.options.baseURL);
        for (const [file, html] of Object.entries(pages)) {
          const path = join(nitro.options.output.publicDir, file);
          mkdirSync(dirname(path), { recursive: true });
          writeFileSync(path, html);
        }
      });
    });
  },
});
