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
const { Octokit } = require("@octokit/rest");
// PAT is a personal access token with public read only scope
const octokit = new Octokit({ auth: `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` });

export default {
  name: 'Docs',
  data(){
    return {
      login: null,
      docs: []
    }
  },
  async created(){
    this.login = await octokit.rest.users.getAuthenticated()
    this.login = this.login.data
    console.log(this.login);

    let docs = await octokit.rest.repos.getContent({
      owner: 'Public-Health-Scotland',
      repo: 'R-Resources',
      path: '.'
    }).then(r => r.data)

    docs = docs.filter(d => !d.name.startsWith('.'))

    this.docs = docs
  }
}

</script>
