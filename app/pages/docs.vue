<template>
  <div>
    <div class="top-row">
      <div class="title-container">
        <b-card no-body class="overflow-hidden head-card">
          <b-row no-gutters align-v="center">
            <b-col md="7">
              <b-card-body>
                <h3 style="cursor: pointer" @click="$router.push('/docs')">
                  Documentation
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
            v-for="r in searchResults"
            :key="r.name"
            :to="{
              path: '/docs/' + r.path.split('/')[0],
              query: { doc: r.name },
            }"
            @click="search = ''"
          >
            <div class="d-flex flex-row">
              <i class="mx-2">{{ r.path.split("/")[0] }}: </i>
              <NuxtLink
                :to="{
                  path: '/docs/' + r.path.split('/')[0],
                  query: { doc: r.name },
                }"
                class="mx-2 align-middle"
                @click="search = ''"
              >
                <div>{{ r.name.split(".")[0] }}</div>
              </NuxtLink>
            </div>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" md="4" lg="3">
        <!-- Make this nav collapse when the breakpoint is < md -->
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
                {{ selectedDoc.name || "Docs" }}
              </b-button>
            </div>
            <div>
              <b-button-toolbar
                v-show="$route.query.doc && $route.query.doc != 'README.md'"
                v-b-toggle.collapse-1
                class="d-md-none"
              >
                <b-button-group class="mx-1">
                  <b-button
                    v-b-tooltip.hover
                    title="View on GitHub"
                    variant="outline-dark"
                    class=""
                    @click="openGithub"
                  >
                    <Icon name="eva:github-outline" size="24" />
                  </b-button>
                </b-button-group>
              </b-button-toolbar>
            </div>
          </div>
        </b-row>

        <b-collapse v-if="!loadingNav" id="collapse-1" class="d-md-block">
          <b-nav vertical>
            <b-nav-item
              v-for="item in docs"
              :key="item.name"
              :to="{ path: '/docs/' + item.path }"
              :active="
                $route.params.doc ? $route.params.doc == item._path : false
              "
              @click="selectedDoc = item"
            >
              {{ item.name.split(".")[0] }}

              <Icon
                v-if="item.type == 'dir' && item.name != 'Glossary'"
                name="eva:chevron-down-outline"
                size="24"
                class="icon-accent"
              />
              <template v-if="item._path.startsWith(selectedDoc._path)">
                <b-nav-item
                  v-for="child in item.children"
                  :key="child.name"
                  :to="{
                    path: '/docs/' + item.path,
                    query: { doc: child.name },
                  }"
                  :active="
                    $route.query.doc ? $route.query.doc == child.name : false
                  "
                  :class="[
                    $route.query.doc && $route.query.doc == child.name
                      ? 'active'
                      : 'not-active',
                  ]"
                  @click="selectedDoc = child"
                >
                  {{ child.name.split(".")[0] }}
                </b-nav-item>
              </template>
            </b-nav-item>
          </b-nav>
        </b-collapse>

        <div v-else>
          <b-placeholder :width="65" class="ms-2 mt-4" />
          <b-placeholder :width="35" class="ms-2 mt-4" />
          <b-placeholder :width="20" class="ms-2 mt-4" />
          <b-placeholder :width="70" class="ms-2 mt-4" />
        </div>
      </b-col>

      <b-col v-if="!loadingNav" md="8" lg="9" fluid>
        <div id="collapse-1" class="d-md-block d-none d-md-block">
          <b-button-toolbar
            v-show="$route.query.doc && $route.query.doc != 'README.md'"
            class="justify-content-end"
          >
            <b-button-group class="gh-button mx-1">
              <b-button
                v-b-tooltip.hover
                title="View on GitHub"
                variant="outline-dark"
                class="d-flex align-self-end"
                @click="openGithub"
              >
                <Icon name="eva:github-outline" size="24" />
              </b-button>
            </b-button-group>
          </b-button-toolbar>
        </div>
        <NuxtPage class="mt-3 md-doc" />
      </b-col>

      <b-col v-else>
        <b-placeholder :width="65" height="20%" class="mt-4" />
        <b-placeholder :width="95" class="mt-4" />
        <b-placeholder :width="90" />
        <b-placeholder :width="70" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
const GITHUB_CONTENTS =
  "https://api.github.com/repos/Public-Health-Scotland/technical-docs/contents/";

export default {
  name: "Docs",

  data() {
    return {
      login: null,
      docs: [],
      selectedDoc: {},
      mdContent: "Boo",
      loadingNav: true,
      search: "",
    };
  },

  computed: {
    searchResults() {
      if (!this.search) return [];

      let subdocs = this.docs.map((d) => d.children).flat();

      let results = subdocs.filter((d) =>
        d.name.toLowerCase().includes(this.search.toLowerCase()),
      );

      return results;
    },
  },
  watch: {
    $route() {},
  },

  // Loaded in the browser only, so pre-rendering doesn't call the GitHub API.
  async mounted() {
    let docs = await $fetch(GITHUB_CONTENTS);

    docs = docs.filter((d) => !d.name.startsWith("."));
    docs = docs.filter((d) => !d.name.startsWith("CONTRIBUTING"));
    docs = docs.filter((d) => !d.name.startsWith("CODE_OF_CONDUCT"));
    docs = docs.filter((d) => !d.name.startsWith("README"));

    let getSubDocs = async (docs) => {
      for (let doc of docs) {
        doc._path = doc.path
          .replace(/\//g, "-")
          .replace(/\s/g, "_")
          .split(".")[0];
        if (doc.type == "dir") {
          let subDocs = await $fetch(GITHUB_CONTENTS + doc.path);

          subDocs = subDocs.filter((d) => !d.name.startsWith("."));
          subDocs = subDocs.filter((d) => !d.name.startsWith("README"));
          subDocs = subDocs.filter((d) => d.name.endsWith(".md"));
          doc.children = subDocs;
          getSubDocs(subDocs);
        }
      }
      return docs;
    };
    this.docs = await getSubDocs(docs);

    // Sort glossary to the end
    this.docs.sort((a, b) => {
      if (a.name == "Glossary") return 1;
      if (b.name == "Glossary") return -1;
      return 0;
    });

    // If $route.params.doc is set,  we need to set the selectedDoc
    if (this.$route.params.doc) {
      let doc = this.docs.find((d) => d.path == this.$route.params.doc);

      // If its not found look in the children
      if (!doc) {
        for (let i = 0; i < this.docs.length; i++) {
          let d = this.docs[i];
          if (d.children) {
            doc = d.children.find((c) => c.name == this.$route.params.doc);
            if (doc) {
              break;
            }
          }
        }
      }

      if (doc) this.selectedDoc = doc;
    }

    this.loadingNav = false;
  },

  methods: {
    openGithub() {
      let link = this.selectedDoc.children.find(
        (d) => d.name == this.$route.query.doc,
      );

      window.open(link.html_url, "_blank");
    },
  },
};
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

a li {
  font-weight: 400;
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
