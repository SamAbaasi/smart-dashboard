export default defineNuxtConfig({
  modules: ['@pinia/nuxt','@nuxt/test-utils/module'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css'
        }
      ]
    }
  },
  components: [
    { path: '~/components/common' },
    { path: '~/components/devices' },
    { path: '~/components/rooms' },
    '~/components'
  ],
  css: [
    '~/assets/scss/main.scss',
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "sass:color";
            @import "@/assets/scss/_variables.scss";
          `
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api'
    }
  },
  nitro: {
    prerender: {
      routes: ['/']
    }
  },
})