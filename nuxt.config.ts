// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'My Code Blog',
      meta: [
        { name: 'description', content: 'Learning resources on Javascript, Python, Android, Kotlin.' }
      ]
    }
  },
  modules: [
    '@nuxt/content'
  ],
  content: {
    // https://content.nuxtjs.org/api/configuration
    markdown: {
      anchorLinks: {
        depth: 2, // only h2 
        exclude: [1]
      }
    },
    highlight: {
      theme: 'github-light',
      preload: ['python', 'kotlin', 'java', 'javascript', 'bash', 'json', 'html', 'css', 'md']
      // theme: 'github-light'
    }
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  }
})
