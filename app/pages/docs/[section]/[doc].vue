<template>
  <DocArticle v-if="page" :page="page" />
</template>

<script setup>
import redirects from "~/assets/doc-redirects.json";
import { findRedirect } from "~~/lib/docs/redirects.mjs";

const route = useRoute();
const { section, doc } = route.params;

// Docs that are renamed or moved keep working through doc-redirects.json.
const moved = findRedirect(redirects, `/docs/${section}/${doc}`);

const { data: page } = moved
  ? { data: ref(null) }
  : await useFetch(`/api/docs/${section}/${doc}.json`, {
      key: `docs-${section}-${doc}`,
    });

if (moved) {
  await navigateTo(moved + route.hash, { replace: true, redirectCode: 301 });
} else if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}
</script>
