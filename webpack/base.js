"use strict"

const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const Dotenv = require('dotenv-webpack')

const dev = process.env.NODE_ENV.trim() === 'development'

const scssLoader = global => (
  {
    test: global ? path.resolve(__dirname, '../src/assets/style/style.scss') : /index.scss$/,
    exclude: /node_modules/,
    use: [
      {
        loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          modules: {
            compileType: 'module',
            mode: global || 'local',
            exportGlobals: true,
            localIdentName: global ? '[local]' : `${dev ? '[local]-' : 'one-id_'}[sha512:hash:base52:9]`,
            exportLocalsConvention: 'camelCaseOnly',
          },
          url: false,
          sourceMap: false,
          importLoaders: 2,
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: false,
          plugins: () => [postcssPresetEnv({ stage: 0 })]
        }
      },
      {
        loader: 'sass-loader'
      },
    ],
  }
)

module.exports = {
  entry: {
    index: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')],
  },

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'assets/js/[name].[hash:4].js',
    chunkFilename: '[name].[hash:4].chunk.js',
    publicPath: '/'
  },

  resolve: {
    alias: {
      Index: path.resolve(__dirname, '../src/components/index.js'),
      Components: path.resolve(__dirname, '../src/components'),
      Constants: path.resolve(__dirname, '../src/constants'),
      Redux: path.resolve(__dirname, '../src/redux'),
      Assets: path.resolve(__dirname, '../src/assets'),
      Util: path.resolve(__dirname, '../src/util'),
      Locales: path.resolve(__dirname, '../src/locales'),
      Api: path.resolve(__dirname, '../src/api'),
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-export-namespace-from',
              "@babel/plugin-transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: dev ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
        ]
      },
      scssLoader('global'),
      scssLoader(),
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:4].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new Dotenv(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      // favicon: './public/favicon.ico',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyURLs: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/style/[name].[hash:4].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/fonts', to: 'assets/fonts' },
        { from: 'src/assets/svg', to: 'assets/svg' },
        { from: 'src/assets/img', to: 'assets/img' }
      ],
    })
  ]
}