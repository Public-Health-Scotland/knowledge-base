<template>
  <div>
    <vue-markdown :source="source" toc></vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  components: { VueMarkdown },
  data() {
    return {
      source: "",
      raw: "",
    };
  },
  watch: {
    $route: function () {
      this.getMarkdownFile();
    },
  },
  methods: {
    async getMarkdownFile() {
      this.$route.query.doc = this.$route.query.doc || "README.md";
      let path = this.$route.params.doc;

      let doc = await this.$axios
        .get("/repos/Public-Health-Scotland/technical-docs/contents/" + path, {
          baseURL: "https://api.github.com",
          headers: {},
        })
        .then((r) => r.data)
        .catch((e) => ({}));

      if (Array.isArray(doc))
        doc = doc.find((d) => d.name == this.$route.query.doc);

      if (doc.type == "file") {
        this.source = await this.$axios
          .get(doc.git_url)
          .then((r) => Buffer.from(r.data.content, "base64").toString("ascii"))
          .catch((e) => "");
      } else {
        this.source = "";
      }

      this.raw = this.source;

      // Workaround for links in the md file
      // eg. [Get support](Login%20to%20Posit%20Workbench.md) should link to
      // /knowledge-base/docs/${$route.params.doc}?doc=Login%20to%20Posit%20Workbench.md
      console.log(this.$route.query.doc);
      this.source = this.source.replace(
        /(?<!\!)\[([^[\]]+)\]\(([^()]*)\)/g,
        (match, p1, p2) => {
          if (p2.startsWith("#") & (this.$route.query.doc != "README.md"))
            return `[${p1}](/knowledge-base${this.$route.path.replace(
              / /g,
              "%20"
            )}?doc=${this.$route.query.doc.replace(/ /g, "%20")}${p2})`;
          if (p2.startsWith("#"))
            return `[${p1}](/knowledge-base${this.$route.path.replace(
              / /g,
              "%20"
            )}${p2})`;
          if (p2.includes("http"))
            return `<a href="${p2}" target="_blank">${p1}</a>`;
          return `[${p1}](/knowledge-base/docs/${this.$route.params.doc.replace(
            / /g,
            "%20"
          )}?doc=${p2})`;
        }
      );
    },
  },
  created() {
    this.getMarkdownFile();
  },
};
</script>

<style>
.toc-anchor-link {
  display: none;
}
</style>
