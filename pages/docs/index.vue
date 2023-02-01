<template>
  <div>
    <h1>Docs</h1>
    <p>Some docs</p>
    <pre>{{ login }}</pre>
    
      <div>
        <b-nav vertical class="w-25">
          <b-nav-item v-for="item in docs" :key="item.name" :to="item.path">
            {{ item.name }}
            <eva-icon v-if="item.type == 'dir'" name="chevron-down-outline" fill="#bd27b9"></eva-icon>
            <b-nav-item v-for="child in item.children" :key="child.name" @click="getMarkdownFile(child)">
              {{ child.name }}
            </b-nav-item>
          </b-nav-item>
        </b-nav>
      </div>

      <div>
        <vue-markdown :source="mdContent"></vue-markdown>
      </div>
    <pre>{{ docs }}</pre>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Docs',
  components: { VueMarkdown },
  data(){
    return {
      login: null,
      docs: [],
      mdContent : "Boo"
    }
  },

  methods:{
    async getMarkdownFile(doc){
      this.mdContent = await this.$axios.get(doc.download_url).then(r => r.data)
    }
  },

  async created(){
    let docs = await this.$axios.get('/repos/Public-Health-Scotland/technical-docs/contents/',{
      baseURL: 'https://api.github.com'
    }).then(r => r.data)

     docs = docs.filter(d => !d.name.startsWith('.'))
     docs = docs.filter(d => !d.name.startsWith('README'))

     let getSubDocs = async (docs) => {
      for(let i = 0; i < docs.length; i++){
        let doc = docs[i]
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
  }
}
</script>
