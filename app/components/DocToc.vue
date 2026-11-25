<template>
  <!-- Labelled by the "On this page" heading in DocSidebar. -->
  <nav aria-labelledby="doc-panel-heading" class="doc-toc">
    <ul class="list-unstyled mb-0">
      <li
        v-for="heading in toc"
        :key="heading.id"
        :class="{ 'ps-3': heading.level === 3 }"
      >
        <a
          :href="`#${heading.anchor}`"
          :class="{ current: heading.id === current }"
          :aria-current="heading.id === current ? 'location' : undefined"
        >
          {{ heading.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
// The doc's sections. The one being read is highlighted as the page scrolls,
// without moving focus.
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const props = defineProps({
  toc: { type: Array, required: true },
});

const current = ref(null);
let observer;

function observe() {
  observer?.disconnect();
  if (typeof IntersectionObserver === "undefined") return;
  const visible = new Set();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      }
      const first = props.toc.find((h) => visible.has(h.id));
      if (first) current.value = first.id;
    },
    { rootMargin: "0px 0px -70% 0px" },
  );
  for (const heading of props.toc) {
    const element = document.getElementById(heading.id);
    if (element) observer.observe(element);
  }
}

onMounted(observe);
watch(() => props.toc, observe);
onBeforeUnmount(() => observer?.disconnect());
</script>
