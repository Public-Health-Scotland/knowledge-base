<template>
  <DocArticle v-if="page" :page="page" />
</template>

<script setup>
// A section's landing page. Also handles addresses from before v3, such as
// /docs/Posit%20Infrastructure?doc=FAQs.md, which reach the site through the
// 404 page and are sent on to the new address.
import redirects from "~/assets/doc-redirects.json";
import { findRedirect, oldSectionPath } from "~~/lib/docs/redirects.mjs";

const route = useRoute();
const { section } = route.params;
const { doc } = route.query;

const here = `/docs/${section}/`;
const oldPath = doc && oldSectionPath(redirects, here);
const target =
  findRedirect(redirects, `/docs/${section}`, doc) ??
  (oldPath && findRedirect(redirects, oldPath, doc));
// Already on the right page (an old link to a doc that no longer exists).
const moved = target !== here && target;
if (target === here) {
  onMounted(() => useRouter().replace({ path: here, hash: route.hash }));
}

const { data: page } = moved
  ? { data: ref(null) }
  : await useFetch(`/api/docs/${section}.json`, { key: `docs-${section}` });

if (moved) {
  await navigateTo(moved + route.hash, { replace: true, redirectCode: 301 });
} else if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}
</script>
