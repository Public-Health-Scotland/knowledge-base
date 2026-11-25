<template>
  <nav
    v-if="previous || next"
    aria-label="Previous and next documents"
    class="doc-pager d-print-none"
  >
    <NuxtLink
      v-if="previous"
      :to="previous.url"
      class="doc-pager-link"
      rel="prev"
    >
      <span class="doc-pager-label">Previous</span>
      <span>{{ previous.title }}</span>
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="next.url"
      class="doc-pager-link doc-pager-next"
      rel="next"
    >
      <span class="doc-pager-label">Next</span>
      <span>{{ next.title }}</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
defineProps({
  previous: { type: Object, default: null },
  next: { type: Object, default: null },
});
</script>
