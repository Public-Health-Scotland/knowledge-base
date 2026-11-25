<template>
  <nav aria-label="Breadcrumb" class="doc-breadcrumbs d-print-none">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item">
        <NuxtLink to="/docs/">Documentation</NuxtLink>
      </li>
      <li v-if="page.section" class="breadcrumb-item">
        <NuxtLink :to="page.section.url">{{ page.section.name }}</NuxtLink>
      </li>
      <li class="breadcrumb-item active" aria-current="page">
        {{ page.title }}
      </li>
    </ol>
  </nav>
</template>

<script setup>
// A doc's page data has its section, and a section page has none.
defineProps({
  page: { type: Object, required: true },
});
</script>
