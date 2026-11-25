// Full-text search of the docs. The build saves every page as plain text
// (search-index.mjs) and the browser builds the index from it the first time
// someone searches, so search works on a static site with no server.
// Nothing here may import server-only packages: it's bundled for the browser.

// Used by the browser and the tests, so the tests search the same way.
export const SEARCH_OPTIONS = {
  fields: ["title", "headings", "description", "text"],
  storeFields: ["url", "title", "section", "description"],
  searchOptions: {
    boost: { title: 4, headings: 2, description: 2 },
    prefix: true,
    fuzzy: (term) => (term.length > 4 ? 0.2 : false),
    combineWith: "AND",
  },
};

// A short extract around the first match, split into parts so the matched
// words can be highlighted without inserting HTML.
//   [{ text: "…how to ", match: false }, { text: "install", match: true }, …]
export function snippet(text, terms, length = 160) {
  const words = terms.filter(Boolean).map((t) => t.toLowerCase());
  if (!words.length) return [{ text: text.slice(0, length), match: false }];

  const lower = text.toLowerCase();
  const first = Math.min(
    ...words.map((w) => lower.indexOf(w)).filter((i) => i >= 0),
  );
  const start = Number.isFinite(first) ? Math.max(0, first - 40) : 0;
  let extract = text.slice(start, start + length);
  // Start and end on whole words.
  if (start > 0) extract = extract.replace(/^\S*\s/, "");
  if (start + length < text.length) extract = extract.replace(/\s\S*$/, "");

  const alternatives = words
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const isMatch = new RegExp(`^(?:${alternatives})$`, "i");
  const parts = extract
    .split(new RegExp(`(${alternatives})`, "i"))
    .filter(Boolean)
    .map((part) => ({ text: part, match: isMatch.test(part) }));
  if (start > 0) parts.unshift({ text: "… ", match: false });
  if (start + length < text.length) parts.push({ text: " …", match: false });
  return parts;
}
