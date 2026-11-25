// The text that docs search looks through, saved by the build as
// /api/docs/search.json. See search.mjs for the browser side.
import { stripTags } from "./text.mjs";

// Plain text of rendered HTML, with headings kept separately so a match in
// a heading ranks higher than one in a paragraph.
export function plainText(html) {
  const headings = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)]
    .map((m) => stripTags(m[1]))
    .filter(Boolean);
  return { text: stripTags(html), headings };
}

// One entry per section page and doc, for /api/docs/search.json.
export function searchDocuments(docs) {
  const entry = (page, section) => {
    const { text: full, headings } = plainText(page.html);
    // The title is shown with each result, so the preview starts after it.
    const text = full.startsWith(headings[0] ?? "\0")
      ? full.slice(headings[0].length).trim()
      : full;
    return {
      id: page.url,
      url: page.url,
      title: page.title,
      section: section.name,
      description: page.description ?? "",
      headings: headings.join(" "),
      text,
    };
  };
  return docs.sections.flatMap((section) => [
    ...(section.html ? [entry(section, section)] : []),
    ...section.docs.map((doc) => entry(doc, section)),
  ]);
}
