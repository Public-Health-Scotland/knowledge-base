<template>
  <div>
    <div class="top-row">
      <div class="title-container">
        <b-card no-body class="overflow-hidden head-card">
          <b-row no-gutters align-v="center">
            <b-col md="7">
              <b-card-body>
                <h3>
                  <NuxtLink to="/docs/" class="text-reset text-decoration-none">
                    Documentation
                  </NuxtLink>
                </h3>
                <b-card-text tag="div">
                  <p>Data Science information, guidance, and best practice</p>
                </b-card-text>
              </b-card-body>
            </b-col>

            <b-col md="1"> </b-col>

            <b-col md="4">
              <b-form-input
                v-model="search"
                class="search mt-2"
                type="search"
                placeholder="Search"
                aria-label="Search document titles"
              />
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>

    <b-row class="d-flex" align-h="end">
      <b-col cols="12" md="7" lg="6" xl="5">
        <b-list-group
          v-if="searchResults.length"
          class="search-results flex-fill"
          style="position: absolute; background-color: white; z-index: 500"
        >
          <b-list-group-item
            v-for="result in searchResults"
            :key="result.url"
            :to="result.url"
            @click="search = ''"
          >
            <div class="d-flex flex-row">
              <i class="mx-2">{{ result.section }}: </i>
              <span class="mx-2 align-middle">{{ result.name }}</span>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" md="4" lg="3">
        <!-- The navigation collapses below the md breakpoint -->
        <b-row class="mt-3 mx-1">
          <div class="d-flex justify-content-between w-100">
            <div>
              <b-button
                v-b-toggle.collapse-1
                variant="outline-dark"
                class="d-md-none mx-1"
              >
                <span class="when-closed"
                  ><Icon
                    name="eva:menu-outline"
                    size="24"
                    class="me-2 icon-dark"
                /></span>
                <span class="when-open"
                  ><Icon
                    name="eva:close-outline"
                    size="24"
                    class="me-2 icon-dark"
                /></span>
                {{ currentDoc?.name || currentSection?.name || "Docs" }}
              </b-button>
            </div>
            <div>
              <b-button-toolbar v-if="currentDoc" class="d-md-none">
                <b-button-group class="mx-1">
                  <a
                    v-b-tooltip.hover
                    title="View on GitHub"
                    aria-label="View on GitHub"
                    class="btn btn-outline-dark"
                    :href="currentDoc.githubUrl"
                    target="_blank"
                    rel="noopener"
                  >
                    <Icon name="eva:github-outline" size="24" />
                  </a>
                </b-button-group>
              </b-button-toolbar>
            </div>
          </div>
        </b-row>

        <b-collapse id="collapse-1" class="d-md-block">
          <nav aria-label="Documentation sections">
            <b-nav vertical>
              <li
                v-for="section in sections"
                :key="section.url"
                class="nav-item"
              >
                <NuxtLink
                  :to="section.url"
                  class="nav-link"
                  :class="section === currentSection ? 'active' : 'not-active'"
                >
                  {{ section.name }}
                  <Icon
                    v-if="section.docs.length"
                    name="eva:chevron-down-outline"
                    size="24"
                    class="icon-accent"
                  />
                </NuxtLink>
                <ul
                  v-if="section === currentSection && section.docs.length"
                  class="nav flex-column ms-3"
                >
                  <li
                    v-for="doc in section.docs"
                    :key="doc.url"
                    class="nav-item"
                  >
                    <NuxtLink
                      :to="doc.url"
                      class="nav-link"
                      :class="doc === currentDoc ? 'active' : 'not-active'"
                    >
                      {{ doc.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </b-nav>
          </nav>
        </b-collapse>
      </b-col>

      <b-col md="8" lg="9" fluid>
        <div class="d-none d-md-block">
          <b-button-toolbar v-if="currentDoc" class="justify-content-end">
            <b-button-group class="gh-button mx-1">
              <a
                v-b-tooltip.hover
                title="View on GitHub"
                aria-label="View on GitHub"
                class="btn btn-outline-dark d-flex align-self-end"
                :href="currentDoc.githubUrl"
                target="_blank"
                rel="noopener"
              >
                <Icon name="eva:github-outline" size="24" />
              </a>
            </b-button-group>
          </b-button-toolbar>
        </div>
        <NuxtPage class="mt-3 md-doc" />
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
// Navigation comes from the documentation built into the site, not GitHub.
const route = useRoute();
const search = ref("");

const { data: manifest } = await useFetch("/api/docs/manifest.json", {
  key: "docs-manifest",
});
const sections = computed(() => manifest.value?.sections ?? []);

const currentSection = computed(() =>
  sections.value.find((s) => s.slug === route.params.section),
);
const currentDoc = computed(() =>
  currentSection.value?.docs.find((d) => d.slug === route.params.doc),
);

const searchResults = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) return [];
  return sections.value.flatMap((section) =>
    section.docs
      .filter((doc) => `${doc.name} ${doc.title}`.toLowerCase().includes(query))
      .map((doc) => ({ ...doc, section: section.name })),
  );
});
</script>

<style lang="scss">
.active {
  font-weight: bold;
}

.not-active {
  font-weight: normal;
}

.gh-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

.search-results {
  box-shadow: 0 4px 10px 0 rgb(220 220 220 / 100%);
}

@media (width <= 767.98px) {
  .search-results {
    right: 15px;
    width: 95%;
  }
}

@media (width >= 767.98px) {
  .search-results {
    margin-top: -33px;
    right: 15px;
  }
}

.md-doc h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.md-doc h2 {
  font-size: 1.5rem;
}

.md-doc h3 {
  font-size: 1.25rem;
}

.md-doc h4 {
  font-size: 1rem;
}

.md-doc h5 {
  font-size: 0.875rem;
}

.md-doc h6 {
  font-size: 0.75rem;
}

.md-doc img {
  max-width: 100%;
}
</style>
