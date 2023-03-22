export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  ssr: false,
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  // target: 'static',
  router: {
    base: '/knowledge-base/'
  },
  generate:{
    fallback: true,
    dir:"docs"
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: "PHS Data Science - Knowledge Base",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    "@/plugins/eva-icons",
    "@/plugins/google-analytics"
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  }
  // build: {
  //   extend(config) {
  //     const vueLoader = config.module.rules.find(rule => rule.loader === 'vue-loader')
  //     vueLoader.options.transformAssetUrls = {
  //       video: ['src', 'poster'],
  //       source: 'src',
  //       img: 'src',
  //       image: 'xlink:href',
  //       'b-avatar': 'src',
  //       'b-img': 'src',
  //       'b-img-lazy': ['src', 'blank-src'],
  //       'b-card': 'img-src',
  //       'b-card-img': 'src',
  //       'b-card-img-lazy': ['src', 'blank-src'],
  //       'b-carousel-slide': 'img-src',
  //       'b-embed': 'src'
  //     }
  //   }
  // }
}
