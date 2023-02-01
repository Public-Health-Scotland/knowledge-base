<template>
<div>
    <hr>
    <vue-markdown :source="source"></vue-markdown>
</div>   
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default{
    components: { VueMarkdown },
    data(){
        return {
            source: ''
        }
    },
    watch:{
        '$route.params.doc': function(doc)  {
            this.getMarkdownFile(doc)
        }
    },
    methods:{
    async getMarkdownFile(doc){
        if(!doc) return

        let path = doc.split('-')[0]

        let subDocs = await this.$axios.get('/repos/Public-Health-Scotland/technical-docs/contents/' + path,{
            baseURL: 'https://api.github.com'
        }).then(r => r.data)
        doc = subDocs.find(d => 
            d.path.replace(/\//g, '-').replace(/\s/g, '_').split('.')[0] == doc
        )

        console.log('download_url', doc.download_url);

        if(doc.type == 'file'){
            this.source = await this.$axios.get(doc.download_url).then(r => r.data)
        }
      
    }
  },
  created(){
    this.getMarkdownFile(this.$route.params.doc)
  }

}
</script>

    