<template>
  <div>
    <div class="top-row">
      <div class="title-container">
        <b-card no-body class="overflow-hidden head-card">
          <b-row no-gutters align-v="center">

            <b-col md="7">
              <b-card-body>
                <h3 @click="$router.push('/docs')" style="cursor: pointer;">Docs</h3>
                <b-card-text>
                  <p>Data Science information and guidance</p>
                </b-card-text>
              </b-card-body>
            </b-col>

            <b-col md="1">
            </b-col>

            <b-col md="4">
                <b-form-input class="search mt-2" type="search" v-model="search" placeholder="Search"/>
            </b-col>

          </b-row>
        </b-card>
      </div>
    </div>

    <b-row class="d-flex" align-h="end">
      <b-col cols="12" md="7" lg="6" xl="5" >
         <b-list-group v-if="searchResults.length" class="search-results flex-fill" style="position: absolute; background-color: white; z-index: 500;">
          <b-list-group-item v-for="r in searchResults" :to="{path: '/docs/' + r.path.split('/')[0], query: { doc: r.name }}" @click="search=''">
            <div class="d-flex flex-row">
              <i class="mx-2">{{ r.path.split('/')[0] }}:  </i>
              <NuxtLink :to="{path: '/docs/' + r.path.split('/')[0], query: { doc: r.name }}" @click="search = ''" class="mx-2 align-middle">
                <div>{{ r.name.split('.')[0] }}</div>
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
            <span class="when-closed"><eva-icon name="menu-outline" fill="#000" class="mr-2"></eva-icon></span>
            <span class="when-open"><eva-icon name="close-outline" fill="#000" class="mr-2"></eva-icon></span>
            {{ selectedDoc.name ||'Docs' }}
          </b-button>
        </div>
        <div>
          <b-button-toolbar v-b-toggle.collapse-1 v-show="$route.query.doc && $route.query.doc != 'README.md'" class="d-md-none">

            <b-button-group class="mx-1">
              <b-button v-b-tooltip.hover title="View on GitHub" variant="outline-dark" class="" @click="openGithub">
                <eva-icon name="github-outline"></eva-icon>
              </b-button>
            </b-button-group>

          </b-button-toolbar>
        </div>
        </div>
      </b-row>

        <b-collapse id="collapse-1" class="d-md-block" v-if="!loadingNav">
          <b-nav vertical>
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

        <div v-else>
          <b-skeleton width="65%" class="ml-2 mt-4"></b-skeleton>
          <b-skeleton width="35%" class="ml-2 mt-4"></b-skeleton>
          <b-skeleton width="20%" class="ml-2 mt-4"></b-skeleton>
          <b-skeleton width="70%" class="ml-2 mt-4"></b-skeleton>
        </div>
      </b-col>

      <b-col md="8" lg="9" fluid v-if="!loadingNav">
        <div id="collapse-1" class="d-md-block d-none d-md-block">
          <b-button-toolbar v-show="$route.query.doc && $route.query.doc != 'README.md'" class="justify-content-end">

            <b-button-group class="gh-button mx-1">
              <b-button v-b-tooltip.hover title="View on GitHub" variant="outline-dark" class="d-flex align-self-end" @click="openGithub">
                <eva-icon name="github-outline"></eva-icon>
              </b-button>
            </b-button-group>

          </b-button-toolbar>
        </div> 
        <nuxt-child class="mt-3 md-doc"></nuxt-child>
      </b-col>

      <b-col v-else>
        <b-skeleton width="65%" height="20%" class="mt-4"></b-skeleton>
        <b-skeleton width="95%" class="mt-4"></b-skeleton>
        <b-skeleton width="90%"></b-skeleton>
        <b-skeleton width="70%"></b-skeleton>
      </b-col>
    </b-row>
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
      search: ''
    };
  },

  computed: {
    searchResults() {
      if(!this.search) return []

      let subdocs = this.docs.map(d => d.children).flat()
      
      let results = subdocs.filter(d => d.name.toLowerCase().includes(this.search.toLowerCase()))
      
      return results
    }
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

<style lang="scss">
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

.search-results{
  box-shadow: 0px 4px 10px 0px rgba(220,220,220,1);
}
@media (max-width:  767.98px)  {
  .search-results{
    right: 15px;
    width: 95%;
  }
 }

@media (min-width:  767.98px)  {
  .search-results{
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