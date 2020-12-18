
export default {
 //  router: {   
 //    mode: 'hash',
 //    base: process.env.NODE_ENV === 'production' ? './' : '/'
	// },   
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  axios: {
    prefix: '/api/',
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'https://127.0.0.1/',
      pathRewrite: {
        '^/api/': ''
      }
    }
  },  
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  
  // mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    // title: process.env.npm_package_name || 'aaa',
    title: "searchTworld",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [      
      { src: 'js/myapp.js' },
      { src: 'js/qrcode.js' },
      { src: 'js/qrcode.min.js' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/css/app.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/vueProto.js', ssr: false },
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
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/],
  },
  telemetry: false,
}
