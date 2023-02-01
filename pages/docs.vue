<template>
  <div>
    <h1>Docs</h1>
    <p>Some docs</p>
    <!-- <pre>{{ login }}</pre> -->

    <!-- <pre>{{selectedDoc}}</pre> -->
    
      <div v-if="!loadingNav">
        <b-nav vertical class="w-25">
          <b-nav-item v-for="item in docs" :key="item.name" :to="'/docs/'+item._path" :active="item._path.startsWith(selectedDoc._path)" @click="selectedDoc = item">
            {{ item.name }}
            <eva-icon v-if="item.type == 'dir'" name="chevron-down-outline" fill="#bd27b9"></eva-icon>
            <b-nav-item  v-if="item._path.startsWith(selectedDoc._path)" v-for="child in item.children" :key="child.name" :to="'/docs/'+child._path" :active="child._path === selectedDoc._path"  @click="selectedDoc = child">
              {{ child.name }}
            </b-nav-item>
          </b-nav-item>
        </b-nav>
      </div>

      <div v-else>
        Loading...
      </div>

      <nuxt-child></nuxt-child>

      <!-- <pre>{{ docs }}</pre> -->

  </div>
</template>

<script>


export default {
  name: 'Docs',
  data(){
    return {
      login: null,
      docs: [],
      selectedDoc: {},
      mdContent : "Boo",
      loadingNav: true
    }
  },

  async created(){
    let docs = await this.$axios.get('/repos/Public-Health-Scotland/technical-docs/contents/',{
      baseURL: 'https://api.github.com'
    }).then(r => r.data)

     docs = docs.filter(d => !d.name.startsWith('.'))
     docs = docs.filter(d => !d.name.startsWith('README'))

     let getSubDocs = async (docs) => {
      for(let doc of docs){
        doc._path = doc.path.replace(/\//g, '-').replace(/\s/g, '_').split('.')[0]
        if(doc.type == 'dir'){
          
          let subDocs = await this.$axios.get('/repos/Public-Health-Scotland/technical-docs/contents/' + doc.path,{
            baseURL: 'https://api.github.com'
          }).then(r => r.data)

          subDocs = subDocs.filter(d => !d.name.startsWith('.'))
          subDocs = subDocs.filter(d => !d.name.startsWith('README'))
          doc.children = subDocs
          getSubDocs(subDocs)
        }
      }
      return docs
    }
    this.docs = await getSubDocs(docs)

    // If $route.params.doc is set,  we need to set the selectedDoc
    if(this.$route.params.doc){
      // update the param to the correct format
      this.$route.params.doc = this.$route.params.doc.replace(/-/g, '/').replace(/_/g, ' ').split('.')[0]

      let doc = this.docs.find(d => d._path == this.$route.params.doc)
      
      // If its not found look in the children
      if(!doc){
        for(let i = 0; i < this.docs.length; i++){
          let d = this.docs[i]
          if(d.children){
            doc = d.children.find(c => c.name == this.$route.params.doc)
            if(doc){
              break
            }
          }
        }
      }
      
      if(doc) this.selectedDoc = doc
      
    }

    this.loadingNav = false
  }
}
</script>
