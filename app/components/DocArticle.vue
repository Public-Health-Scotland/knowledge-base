<template>
  <!-- Rendered and sanitised at build time (lib/docs/render.mjs). -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <article v-if="page.html" v-html="page.html"></article>
  <article v-else>
    <h1>{{ page.title }}</h1>
    <ul>
      <li v-for="doc in page.docs" :key="doc.url">
        <NuxtLink :to="doc.url">{{ doc.title }}</NuxtLink>
        <p v-if="doc.description" class="mb-2">{{ doc.description }}</p>
      </li>
    </ul>
  </article>
</template>

<script setup>
const props = defineProps({
  page: { type: Object, required: true },
});

useHead({
  title: () => `${props.page.title} - PHS Data Science - Knowledge Base`,
  meta: () =>
    props.page.description
      ? [{ name: "description", content: props.page.description }]
      : [],
});
</script>
