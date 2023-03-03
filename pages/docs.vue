<template>
  <div>
    <div class="top-row">
    <div>
    <h1>Docs</h1>
    <p>Some docs</p>
    </div>
    
    <div @click="openGithub" v-show="$route.query.doc && $route.query.doc != 'README.md'">
      <b-button variant="outline-dark" class="d-flex justify-content-between">
      <eva-icon name="github-outline" fill="#000"></eva-icon>
      View on GitHub
    </b-button>
    </div>
  </div>

    <b-row>
      <b-col cols="12" md="3" >
        
        <!-- Make this nav collapse when the breakpoint is < md -->
        <div class="d-flex justify-content-start">        
          <b-button
            v-b-toggle.collapse-1
            variant="outline-dark"
            class="d-flex justify-content-between d-md-none mb-2"
          >
            <span class="when-closed"><eva-icon name="menu-outline" fill="#000" class="mr-2"></eva-icon></span>
            <span class="when-open"><eva-icon name="close-outline" fill="#000" class="mr-2"></eva-icon></span>
            
            {{ selectedDoc.name ||'Docs' }}
          </b-button>
        </div>

        <b-collapse id="collapse-1" class="d-md-block" v-if="!loadingNav">
          <b-nav vertical>
            <b-nav-item
              v-for="item in docs"
              :key="item.name"
              :to="{ path: '/docs/' + item._path}"
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

      <b-col md="8" fluid>
        <nuxt-child></nuxt-child>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Docs",
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
      console.log('link', link);

      window.open(link.html_url,'_blank')
    },
  },

  async created() {
    let docs = await this.$axios
      .get("/repos/Public-Health-Scotland/technical-docs/contents/", {
        baseURL: "https://api.github.com",
      })
      .then((r) => r.data);

    docs = docs.filter((d) => !d.name.startsWith("."));
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

.top-row{
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