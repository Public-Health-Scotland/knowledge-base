import redirects from "../../app/assets/doc-redirects.json";
import { loadDocs } from "../../lib/docs/index.mjs";

let docs;

// All documentation, read and rendered once per build.
export function useDocs() {
  if (!docs) {
    const config = useRuntimeConfig();
    docs = loadDocs(config.docsDir, { base: config.app.baseURL, redirects });
    // Broken links in technical-docs are reported but don't stop the build.
    for (const warning of docs.warnings) console.warn(`[docs] ${warning}`);
  }
  return docs;
}
