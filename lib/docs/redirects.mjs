// Old documentation addresses and where they now live.
//
// Before v3 the docs pages used the technical-docs folder and file names:
//   /docs/<Section name>                   -> a section's README
//   /docs/<Section name>?doc=<File name.md> -> a document
// Each old address is a key in app/assets/doc-redirects.json, e.g.
//   "/docs/Posit Infrastructure?doc=FAQs.md": "/docs/posit-infrastructure/faqs/"
// Keys are decoded (spaces, not %20). Entries can also be added for docs that
// move later, e.g. "/docs/r/old-name": "/docs/r/new-name/".

const SITE =
  /^https?:\/\/(?:public-health-scotland\.github\.io\/knowledge-base|kb\.publichealthscotland\.scot)(\/docs\/[^?#]+)(\?[^#]*)?(#.*)?$/i;

function decode(value) {
  try {
    return decodeURIComponent(value.replace(/\+/g, " "));
  } catch {
    return value;
  }
}

// The lookup key for a docs address, from its decoded path and ?doc= value.
export function redirectKey(path, doc) {
  const clean = path.replace(/\/+$/, "");
  return doc ? `${clean}?doc=${doc}` : clean;
}

// The new address for an old one, or undefined. Old links to a document that
// no longer exists fall back to its section.
export function findRedirect(redirects, path, doc) {
  return (
    redirects[redirectKey(path, doc)] ??
    (doc ? redirects[redirectKey(path)] : undefined)
  );
}

// The old path of a section, from its new address, e.g. "/docs/r/" -> "/docs/R".
// Used when an old address such as /docs/R?doc=... reaches the new section
// page, which happens on servers that ignore the case of file names.
export function oldSectionPath(redirects, url) {
  return Object.keys(redirects).find(
    (key) => !key.includes("?") && redirects[key] === url,
  );
}

// The new address for a full old-style link such as
// https://public-health-scotland.github.io/knowledge-base/docs/R?doc=R%20Style%20Guide.md#naming
export function findSiteRedirect(redirects, href) {
  const match = href.match(SITE);
  if (!match) return undefined;
  const [, path, query = "", hash = ""] = match;
  const doc = new URLSearchParams(query).get("doc") || undefined;
  const target = findRedirect(redirects, decode(path), doc);
  return target && target + hash;
}

// Old addresses for the docs as they are now. Used to create the redirect map.
export function legacyRedirects(sections) {
  const redirects = {};
  for (const section of sections) {
    redirects[redirectKey(`/docs/${section.name}`)] = section.url;
    redirects[redirectKey(`/docs/${section.name}`, "README.md")] = section.url;
    for (const doc of section.docs) {
      redirects[redirectKey(`/docs/${section.name}`, doc.file)] = doc.url;
    }
  }
  return redirects;
}

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

// A static page for each old section address, so old links redirect with a
// 200 status before the site loads rather than through the 404 page.
// Returns { "docs/Posit Infrastructure.html": "<!doctype html>..." }.
export function redirectPages(redirects, base = "/") {
  const prefix = base.replace(/\/+$/, "");
  const pages = {};
  for (const [path, section] of Object.entries(redirects)) {
    if (path.includes("?")) continue;
    const docs = {};
    for (const [key, target] of Object.entries(redirects)) {
      if (key.startsWith(`${path}?doc=`)) {
        docs[key.slice(path.length + 5)] = prefix + target;
      }
    }
    const fallback = escapeHtml(prefix + section);
    // Embedded in a script, so "<" is escaped to keep "</script>" out.
    const map = JSON.stringify(docs).replace(/</g, "\\u003c");
    pages[`${path.slice(1)}.html`] = `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<link rel="canonical" href="${fallback}">
<script>
var docs = ${map};
var doc = new URLSearchParams(location.search).get("doc");
location.replace((docs[doc] || ${JSON.stringify(prefix + section)}) + location.hash);
</script>
<noscript><meta http-equiv="refresh" content="0; url=${fallback}"></noscript>
<title>Redirecting</title>
</head>
<body><p>This page has moved to <a href="${fallback}">${fallback}</a>.</p></body>
</html>
`;
  }
  return pages;
}
