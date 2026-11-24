// Heading ids in docs start with "user-content-" (lib/docs/render.mjs), but
// links and the address bar use the plain form, such as #naming, as on GitHub.
// The browser and router find no element with the plain id, so this scrolls to
// the prefixed heading instead: when a page opens (page:finish), and when only
// the #part changes, from a link within a doc or going back or forward
// (hashchange).
const PREFIX = "user-content-";

function scrollToContentHeading() {
  let id;
  try {
    id = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return;
  }
  if (!id || document.getElementById(id)) return;
  document.getElementById(`${PREFIX}${id}`)?.scrollIntoView();
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () =>
    window.requestAnimationFrame(scrollToContentHeading),
  );
  window.addEventListener("hashchange", scrollToContentHeading);
});
