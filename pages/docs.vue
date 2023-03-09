<template>
  <div>
    <div class="top-row">
      <div class="title-container">
        <b-card no-body class="overflow-hidden head-card">
          <b-row no-gutters align-v="center">

            <b-col md="7">
              <b-card-body>
                <h3>Docs</h3>
                <b-card-text>
                  <p>for information related to Data Science in PHS</p>
                </b-card-text>
              </b-card-body>
            </b-col>

            <b-col md="1">
            </b-col>

            <b-col md="4">
                <b-form-input class="search mb-2 d-none d-md-block" type="search" v-model="search" placeholder="Search"/>
            </b-col>

          </b-row>
        </b-card>
      </div>
    </div>

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
            <span class="when-closed"><eva-icon name="menu-outline" fill="#000" class="mr-2"></eva-icon></span>
            <span class="when-open"><eva-icon name="close-outline" fill="#000" class="mr-2"></eva-icon></span>
            {{ selectedDoc.name ||'Docs' }}
          </b-button>
        </div>
        <div>
          <b-button-toolbar v-b-toggle.collapse-1 v-show="$route.query.doc && $route.query.doc != 'README.md'" class="d-md-none">

            <b-button-group class="mx-1">
              <b-button variant="outline-dark" class="" @click="openGithub" id="gh-button">
                <eva-icon name="github-outline"></eva-icon>
              </b-button>
            </b-button-group>

          </b-button-toolbar>
        </div>
        </div>
      </b-row>

        <b-collapse id="collapse-1" class="d-md-block" v-if="!loadingNav">
          <b-nav vertical class="mt-3">
            <b-form-input class="search mb-2 d-md-none" type="search" v-model="search" placeholder="Search"/>
            <b-nav-item
              v-for="item in docs"
              :key="item.name"
              :to="{ path: '/docs/' + item.path}"
              :active="$route.params.doc ? $route.params.doc == item._path : false"
              @click="selectedDoc = item"
            >
              {{ item.name.split(".")[0] }}
            
              <eva-icon
                v-if="item.type == 'dir'"
                name="chevron-down-outline"
                fill="#bd27b9"
              ></eva-icon>
              <b-nav-item
                v-if="item._path.startsWith(selectedDoc._path)"
                v-for="child in item.children"
                :key="child.name"
                :to="{
                  path: '/docs/' + item.path,
                  query: { doc: child.name },
                }"
                :active="$route.query.doc ? $route.query.doc == child.name : false"
                :class="[$route.query.doc && $route.query.doc == child.name ? 'active' : 'not-active']"
                @click="selectedDoc = child"
              >
                {{ child.name.split(".")[0] }}
              </b-nav-item>
            </b-nav-item>
          </b-nav>
        </b-collapse>

        <div v-else class="d-flex justify-content-center mt-3">
          <b-spinner variant="primary" label="Loading..."></b-spinner>
        </div>
      </b-col>

      <b-col md="8" lg="9" fluid v-if="!loadingNav">
        <div id="collapse-1" class="d-md-block d-none d-md-block">
          <b-button-toolbar v-show="$route.query.doc && $route.query.doc != 'README.md'" class="justify-content-end">

            <b-button-group class="gh-button mx-1">
              <b-button variant="outline-dark" class="d-flex align-self-end" @click="openGithub" id="gh-button-2">
                <eva-icon name="github-outline"></eva-icon>
              </b-button>
            </b-button-group>

          </b-button-toolbar>
        </div> 
        <nuxt-child class="mt-3"></nuxt-child>
      </b-col>
    </b-row>

    <b-tooltip target="gh-button" title="View on GitHub"></b-tooltip>
    <b-tooltip target="gh-button-2" title="View on GitHub"></b-tooltip>
  </div>
</template>

<script>
export default {
  name: "Docs",
  watch: {
    $route() {
      this.selectedDoc = {};
    },
  },

  data() {
    return {
      login: null,
      docs: [],
      selectedDoc: {},
      mdContent: "Boo",
      loadingNav: true,
    };
  },

  methods: {
    openGithub() {

      let link = this.selectedDoc.children.find((d) => d.name == this.$route.query.doc);

      window.open(link.html_url,'_blank')
    },
  },

  async created() {
    let docs = await this.$axios
      .get("/repos/Public-Health-Scotland/technical-docs/contents/", {
        baseURL: "https://api.github.com",
        headers: {
        }
      })
      .then((r) => r.data);

    docs = docs.filter((d) => !d.name.startsWith("."));
    docs = docs.filter((d) => !d.name.startsWith("CONTRIBUTING"));
    docs = docs.filter((d) => !d.name.startsWith("README"));

    let getSubDocs = async (docs) => {
      for (let doc of docs) {
        doc._path = doc.path
          .replace(/\//g, "-")
          .replace(/\s/g, "_")
          .split(".")[0];
        if (doc.type == "dir") {
          let subDocs = await this.$axios
            .get(
              "/repos/Public-Health-Scotland/technical-docs/contents/" +
                doc.path,
              {
                baseURL: "https://api.github.com",
                headers: {

                }
              }
            )
            .then((r) => r.data);

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

    // If $route.params.doc is set,  we need to set the selectedDoc
    if (this.$route.params.doc) {
      // update the param to the correct format
      this.$route.params.doc = this.$route.params.doc
        .replace(/-/g, "/")
        .replace(/_/g, " ")
        .split(".")[0];

      let doc = this.docs.find((d) => d._path == this.$route.params.doc);

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
  
};
</script>

<style>
.active{
  font-weight: bold ;
}

.not-active{
  font-weight: normal ;
}

.gh-button{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a li{
  font-weight: 400;
}

.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>