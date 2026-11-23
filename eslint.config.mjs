import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: [
      ".nuxt/",
      ".output/",
      "docs/",
      "node_modules/",
      "public/",
      ".content-src/",
    ],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        // Auto-imported by Nuxt.
        $fetch: "readonly",
        defineNuxtConfig: "readonly",
        createError: "readonly",
        useHead: "readonly",
        useRoute: "readonly",
        useRouter: "readonly",
        useRuntimeConfig: "readonly",
      },
    },
    rules: {
      // Nuxt pages and layouts are named by their file path.
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["test/**/*.{js,mjs}"],
    languageOptions: { globals: { ...globals.node } },
  },
  // Formatting is handled by Prettier - this must stay last.
  prettier,
];
