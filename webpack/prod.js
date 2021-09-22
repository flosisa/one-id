'use strict'

const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const baseConfig = require('./base')

module.exports = merge(baseConfig, {
  mode: 'production',

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {},
          ecma: 6,
          mangle: true,
          //warnings: true,
          output: {
            comments: false
          }
        },
        extractComments: false
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  performance: {
    hints: "warning"
  },

  plugins: [
    new FilterWarningsPlugin({
      exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
    })
  ]
})