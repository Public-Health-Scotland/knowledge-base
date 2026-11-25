// Text from the HTML the renderer produces (render.mjs), at build time.
import sanitizeHtml from "sanitize-html";
import { ID_PREFIX } from "./render.mjs";

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
export function stripTags(html) {
  const spaced = html.replace(
    /<\/(?:p|li|h[1-6]|td|th|pre|div|dd|dt)>|<br\s*\/?>/gi,
    "$& ",
  );
  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, name) => ENTITIES[name])
    .replace(/\s+/g, " ")
    .trim();
}

// The doc's level-two and level-three headings, for its contents list. The
// anchor is the plain form links use, without the id's "user-content-".
//   [{ id: "user-content-installing-packages", anchor: "installing-packages",
//      text: "Installing packages", level: 2 }]
export function tableOfContents(html) {
  return [...html.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)]
    .map(([, level, id, inner]) => ({
      id,
      anchor: id.startsWith(ID_PREFIX) ? id.slice(ID_PREFIX.length) : id,
      text: stripTags(inner),
      level: Number(level),
    }))
    .filter((heading) => heading.text);
}
