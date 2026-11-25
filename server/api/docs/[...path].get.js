// Documentation data for the pages, fetched while pre-rendering. Each page's
// data is saved with it, so these are never called from the live site.
//   /api/docs/manifest.json              - navigation
//   /api/docs/search.json                - every page as text, for search
//   /api/docs/<section>.json             - a section's landing page
//   /api/docs/<section>/<doc>.json       - a document
import { docsManifest } from "../../../lib/docs/index.mjs";
import { searchDocuments } from "../../../lib/docs/search-index.mjs";
import { useDocs } from "../../utils/docs.js";

export default defineEventHandler((event) => {
  const docs = useDocs();
  const path = getRouterParam(event, "path") || "";
  if (path === "manifest.json") return docsManifest(docs);
  if (path === "search.json") return searchDocuments(docs);

  const [sectionSlug, docSlug] = path.replace(/\.json$/, "").split("/");
  const section = docs.sections.find((s) => s.slug === sectionSlug);
  const page = docSlug
    ? section?.docs.find((d) => d.slug === docSlug)
    : section && {
        ...section,
        // Listed on the section page when it has no README.
        docs: section.docs.map(({ title, url, description }) => ({
          title,
          url,
          description,
        })),
      };

  if (!page || path.split("/").length > 2) {
    throw createError({ statusCode: 404, statusMessage: "Document not found" });
  }
  // A doc's breadcrumbs go through its section. A section page is the
  // section, so it has no section of its own.
  return docSlug
    ? { ...page, section: { name: section.name, url: section.url } }
    : page;
});
