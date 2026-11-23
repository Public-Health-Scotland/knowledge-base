import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Course pages are generated from the catalogue so each has a real HTML file.
const courses = JSON.parse(
  readFileSync(new URL("./app/assets/courses.json", import.meta.url), "utf8"),
);

export default defineNuxtConfig({
  compatibilityDate: "2026-11-01",

  // Pages are rendered to static HTML at build time (`nuxt generate`).
  ssr: true,
  devtools: { enabled: false },

  modules: ["@bootstrap-vue-next/nuxt", "@nuxt/icon"],

  // BootstrapVueNext passes both `to` and `href` to NuxtLink, which Nuxt warns
  // about on every link (bootstrap-vue-next#3316). Its components render
  // Vue Router's RouterLink instead, which accepts both.
  bootstrapVueNext: {
    plugin: {
      // Set on BLink too, as the module's own BLink default would win.
      components: {
        global: { routerComponentName: "RouterLink" },
        BLink: { routerComponentName: "RouterLink" },
      },
    },
  },

  // Bootstrap is built from the PHS brand tokens (app/assets/styles/brand).
  // Its Sass still uses @import, so those warnings are silenced. The brand
  // files themselves are checked.
  vite: {
    // Bundle these when the dev server starts. Otherwise Vite finds them as
    // pages load, bundles them again and reloads the page, which can leave
    // two copies of Vue running ("Cannot read properties of null (reading
    // 'ce')"). Every BootstrapVueNext component is listed, so using a new one
    // doesn't bring this back.
    optimizeDeps: {
      include: [
        "@lordicon/element",
        "bootstrap-vue-next",
        "minisearch",
        ...readdirSync(
          fileURLToPath(
            new URL(
              "./node_modules/bootstrap-vue-next/dist/src/components",
              import.meta.url,
            ),
          ),
        )
          .filter((name) => /^B[A-Z]/.test(name))
          .map((name) => `bootstrap-vue-next/components/${name}`),
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ["import", "global-builtin", "color-functions"],
        },
      },
    },
  },

  css: [
    "~/assets/styles/main.scss",
    "~/assets/css/main.css",
    "~/assets/css/content.css",
  ],

  app: {
    head: {
      title: "PHS Data Science - Knowledge Base",
      htmlAttrs: { lang: "en-GB" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  // Icons are bundled at build time - the site never calls an icon API.
  icon: {
    provider: "none",
    fallbackToApi: false,
    clientBundle: { scan: true },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "lord-icon",
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: ["/", ...courses.map((course) => `/develop/${course.slug}`)],
    },
  },
});
