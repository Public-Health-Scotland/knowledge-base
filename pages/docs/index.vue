<template>
  <div>
    <h1>Docs</h1>
    <p>Some docs</p>
    <pre>{{ login }}</pre>
    


      <div>
        <b-nav vertical class="w-25">
          <b-nav-item v-for="item in docs" :key="item.name" :to="item.path">
            {{ item.name }}
          </b-nav-item>
        </b-nav>
        
      </div>
    <pre>{{ docs }}</pre>
  </div>
</template>

<script>
export default {
  name: 'Docs',
  data(){
    return {
      login: null,
      docs: []
    }
  },
  async created(){
    let docs = await this.$axios.get('/repos/Public-Health-Scotland/R-Resources/contents/',{
      baseURL: 'https://api.github.com'
    }).then(r => r.data)

     docs = docs.filter(d => !d.name.startsWith('.'))

    this.docs = docs
  }
}

</script>
