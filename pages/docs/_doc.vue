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
        let path = this.$route.params.doc //+ '/' + this.$route.query.doc

        let doc = await this.$axios.get('/repos/Public-Health-Scotland/technical-docs/contents/' + path,{
            baseURL: 'https://api.github.com',
            headers: {
            }
        }).then(r => r.data).catch(e => ({}))

        doc = doc.find(d => d.name == this.$route.query.doc)

        if(doc.type == 'file'){
            this.source = await this.$axios.get(doc.git_url)
            .then(r => Buffer.from(r.data.content, 'base64').toString('ascii'))
            .catch(e => '')
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

    