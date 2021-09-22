'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./base')

const HOST = process.env.DEV_WEB_SERVER_HOST || '127.0.0.1'
const PORT = process.env.DEV_WEB_SERVER_PORT || 10000
const API_HOST = process.env.DEV_API_SERVER_HOST || '195.158.16.25'
const API_PORT = process.env.DEV_API_SERVER_PORT || 8998
const DEF_BROWSER = process.env.DEF_BROWSER || 'chrome'

module.exports = merge(baseConfig, {
  mode: 'development',

  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    inline: true,
    compress: true,
    host: HOST,
    port: PORT,
    open: DEF_BROWSER,
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    },
    proxy: {
      '/api': {
        target: `http://${API_HOST}:${API_PORT}`
      },
    }
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})
