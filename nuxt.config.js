import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'server',
  ssr:true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'auth',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    link: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600&display=swap" }],
  },
  css: [
    '~assets/CSS/main.css'
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //{ src: "@/plugins/aos.js", ssr: false },
    //{ src: "@/plugins/slic.js", ssr: false },
    //{ src: "@/plugins/font-awesome.js", ssr: false },
    { src: "@/plugins/bootstrip.js", ssr: false },
    //{src: 'plugins/owl.js', ssr: false},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  


buildModules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify'
  ],


styleResources: {
    scss: [
      '~assets/SCSS/mixins.scss',
      '~assets/SCSS/variables.scss'
    ]
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt' , {
      path: '/',
      maxAge: 60 * 60 * 24 * 7
}],

  ],
  vuetify: {
    customVariables: ['~/assets/SCSS/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://backend.zahaaksa.com/api/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
