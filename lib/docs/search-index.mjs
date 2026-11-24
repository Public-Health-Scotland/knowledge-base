// The text that docs search looks through, saved by the build as
// /api/docs/search.json. See search.mjs for the browser side.
import sanitizeHtml from "sanitize-html";

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#39": "'",
  nbsp: " ",
};

// Text without tags. Block elements end with a space so words from
// neighbouring paragraphs, cells or list items don't run together.
function stripTags(html) {
  const spaced = html.replace(
    /<\/(?:p|li|h[1-6]|td|th|pre|div|dd|dt)>|<br\s*\/?>/gi,
    "$& ",
  );
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, name) => ENTITIES[name])
    .replace(/\s+/g, " ")
    .trim();
}

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
