import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: [".nuxt/", "docs/", "node_modules/", "static/", ".content-src/"],
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/vue2-recommended"],
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
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
  // Formatting is handled by Prettier; this must stay last.
  prettier,
];
