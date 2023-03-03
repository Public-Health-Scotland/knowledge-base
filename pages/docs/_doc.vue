<template>
<div>
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
        '$route': function()  {
            this.getMarkdownFile()
        }
    },
    methods:{
    async getMarkdownFile(){
        this.$route.query.doc = this.$route.query.doc || 'README.md'
        let path = this.$route.params.doc + '/' + this.$route.query.doc

        let doc = await this.$axios.get('/repos/Public-Health-Scotland/technical-docs/contents/' + path,{
            baseURL: 'https://api.github.com'
        }).then(r => r.data).catch(e => ({}))
        
        console.log('download_url', doc.download_url);

        if(doc.type == 'file'){
            this.source = await this.$axios.get(doc.download_url).then(r => r.data).catch(e => '')
        }else{
            this.source = ''
        }
      
    }
  },
  created(){
    this.getMarkdownFile()
  }

}
</script>

    