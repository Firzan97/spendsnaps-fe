// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'SpendSnaps',
    }
  },
  srcDir: 'src/',
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'vue-clerk/nuxt',
    '@nuxt/eslint'
  ],
  clerk: {
    appearance: {},
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  build: {
    transpile: ['vue-sonner']
  },
  eslint: {
    // options here
  }
})