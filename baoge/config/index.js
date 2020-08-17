'use strict'

const path = require('path')

module.exports = {
  dev: {

    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
              target: 'http://192.168.152.144:5000/api',
              changeOrigin: true,
              pathRewrite: {
                '^/api': ''
              }
            }
    },

    host: 'localhost',
    port: 8080,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,

    useEslint: true,
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    devtool: 'cheap-module-eval-source-map',

    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    index: path.resolve(__dirname, '../dist/index.html'),

    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    bundleAnalyzerReport: process.env.npm_config_report
  }
}
