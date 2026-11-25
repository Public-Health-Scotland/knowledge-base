<template>
  <div class="doc-sidebar">
    <section class="doc-panel" aria-labelledby="doc-panel-heading">
      <p id="doc-panel-heading" class="doc-panel-heading">On this page</p>
      <DocToc v-if="page.toc?.length >= 3" :toc="page.toc" />

      <dl v-if="page.about" class="doc-about">
        <template v-if="page.about.author">
          <dt>Author</dt>
          <dd>
            <a
              :href="`https://github.com/${page.about.author}`"
              target="_blank"
              rel="noopener noreferrer"
              >{{ page.about.author }}</a
            >
          </dd>
        </template>
        <template v-if="page.about.lastReviewed">
          <dt>Last reviewed</dt>
          <dd>
            <time :datetime="page.about.lastReviewed">{{ reviewed }}</time>
          </dd>
        </template>
      </dl>

      <ul class="doc-actions list-unstyled d-print-none">
        <li v-if="page.editUrl">
          <a :href="page.editUrl" target="_blank" rel="noopener noreferrer">
            <Icon name="eva:edit-outline" size="18" aria-hidden="true" />
            Suggest a change
          </a>
        </li>
        <li v-if="page.githubUrl">
          <a :href="page.githubUrl" target="_blank" rel="noopener noreferrer">
            <Icon name="eva:github-outline" size="18" aria-hidden="true" />
            View on GitHub
          </a>
        </li>
      </ul>
    </section>

    <nav
      v-if="page.related?.length"
      aria-labelledby="doc-related-heading"
      class="doc-panel d-print-none"
    >
      <p id="doc-related-heading" class="doc-panel-heading">Related docs</p>
      <ul class="list-unstyled mb-0">
        <li v-for="doc in page.related" :key="doc.url">
          <NuxtLink :to="doc.url">{{ doc.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
// Beside each page: its contents, details, links to GitHub and related docs.
const props = defineProps({
  page: { type: Object, required: true },
});

// UTC so the date is the same when built and in the browser.
const reviewed = computed(() =>
  new Date(`${props.page.about.lastReviewed}T00:00:00Z`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" },
  ),
);
</script>
