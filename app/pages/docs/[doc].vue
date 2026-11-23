<template>
  <!-- Sanitised with DOMPurify before rendering. -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="html"></div>
</template>

<script>
import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

const GITHUB_CONTENTS =
  "https://api.github.com/repos/Public-Health-Scotland/technical-docs/contents/";

const markdown = new MarkdownIt({ html: true, linkify: true }).use(
  markdownItAnchor,
);

// GitHub returns file content as base64; decode it as UTF-8 text.
function decodeBase64(content) {
  const bytes = Uint8Array.from(atob(content.replace(/\s/g, "")), (c) =>
    c.charCodeAt(0),
  );
  return new TextDecoder("utf-8").decode(bytes);
}

export default {
  data() {
    return {
      html: "",
    };
  },
  watch: {
    $route() {
      this.getMarkdownFile();
    },
  },
  // Loaded in the browser only, so pre-rendering doesn't call the GitHub API.
  mounted() {
    this.getMarkdownFile();
  },
  methods: {
    async getMarkdownFile() {
      const docName = this.$route.query.doc || "README.md";
      const section = this.$route.params.doc;

      let doc = await $fetch(GITHUB_CONTENTS + section).catch(() => ({}));
      if (Array.isArray(doc)) doc = doc.find((d) => d.name == docName) || {};

      let source = "";
      if (doc.type == "file") {
        source = await $fetch(doc.git_url)
          .then((blob) => decodeBase64(blob.content))
          .catch(() => "");
      }

      // Point links between docs at this site rather than at the raw files,
      // e.g. [Get support](Posit%20Support.md) becomes
      // /docs/<section>?doc=Posit%20Support.md
      const base = this.$config.app.baseURL.replace(/\/$/, "");
      const sectionPath = `${base}/docs/${section.replace(/ /g, "%20")}`;
      source = source.replace(
        /(?<!!)\[([^[\]]+)\]\(([^()]*)\)/g,
        (match, text, href) => {
          if (href.startsWith("#") && docName != "README.md")
            return `[${text}](${sectionPath}?doc=${docName.replace(/ /g, "%20")}${href})`;
          if (href.startsWith("#")) return `[${text}](${sectionPath}${href})`;
          if (href.includes("http"))
            return `<a href="${href}" target="_blank">${text}</a>`;
          return `[${text}](${sectionPath}?doc=${href})`;
        },
      );

      this.html = DOMPurify.sanitize(markdown.render(source), {
        ADD_ATTR: ["target"],
      });
    },
  },
};
</script>
