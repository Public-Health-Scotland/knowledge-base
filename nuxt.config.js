import { readFileSync } from "node:fs";

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

  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/main.css"],

  app: {
    head: {
      title: "PHS Data Science - Knowledge Base",
      htmlAttrs: { lang: "en-GB" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        { src: "https://cdn.lordicon.com/libs/frhvbuzj/lord-icon-2.0.2.js" },
      ],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "lord-icon",
    },
  },

  // Icons are bundled at build time - the site never calls an icon API.
  icon: {
    provider: "none",
    fallbackToApi: false,
    clientBundle: { scan: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: ["/", ...courses.map((course) => `/develop/${course.slug}`)],
    },
  },
});
