const webpack = require('webpack')
const dotenv = require('dotenv').config()
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = {

  /**
   * Nuxt extensions
   * @type {Array}
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  /**
   * Axios config
   * @type {Object}
   */
  axios: {
    retry: {
      retries: 3
    },
    proxyHeaders: false,
    rejectUnauthorized: false
  },

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#1E88E5',
    failedColor: '#ba1414',
    height: '5px'
  },

  css: [
    '@/assets/sass/bootstrap.scss'
  ],

  /**
   * Custom plugins
   * @type {Array}
   */
  plugins: [
    '~/plugins/lazy',
    '~/plugins/algolia'
  ],

  /**
   * Render configuration
   */
  render: {
    bundleRenderer: {
      gzip: {
        threshold: 5
      },
      http2: {
        push: true
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extractCSS: true,
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.devtool = "source-map"
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue'),
            ]),
            whitelist: ["html", "body", "nuxt-loading"]
          })
        )
      }
    },
    /**
     * Vendor Webpack (Makes it load globally)
     * @type Array
     */
    vendor: ['bootstrap', 'popper.js', 'jquery', '~/plugins/global'],
  }
}
