<template>
  <div class="page-header">
    <div class="page-header-main">
      <component :is="tag" class="page-title">{{ title }}</component>
      <div v-if="$slots.default" class="page-intro"><slot /></div>
    </div>
    <div v-if="$slots.aside" class="page-header-aside d-print-none">
      <slot name="aside" />
    </div>
  </div>
</template>

<script setup>
// The title and introduction at the top of every page, with an optional
// aside (such as a search box) beside them on wide screens.
defineProps({
  title: { type: String, required: true },
  // Pages that show a document use "p", as the document has its own h1.
  tag: { type: String, default: "h1" },
});
</script>
