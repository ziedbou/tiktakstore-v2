export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    // 'nuxt-meta-pixel',
  ],
  css: [
    '~/assets/css/main.css'
  ],
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://api.tiktak.space/api/v1/',
      cdnURL: process.env.CDN_URL || 'https://cdn.cloudtiktak.com/',
      // metapixel: {
      //   default: {
      //     id: '',
      //     pageView: '/**',
      //   },
      // },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag),
    },
  },
  routeRules: {
    '/sitemap.xml': { prerender: false },
  },
  devServer: {
    host: '0.0.0.0',
    port: 3001,
  },
});