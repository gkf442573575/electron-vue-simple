'use strict'
const path = require('path')

// const webpack = require('webpack')

const setting = require('./src/setting')
const electronBuildOptions = require('./electronbuild.options')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 9527 // dev port
const name = setting.name || 'electron-vue-simple'

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src')
        // jquery: 'jquery',
        // 'jquery-ui': 'jquery-ui'
      }
    },
    plugins: [
      // 如果使用jQuery
      // new webpack.ProvidePlugin({
      //   $: 'jquery',
      //   jQuery: 'jquery',
      //   'windows.jQuery': 'jquery'
      // })
    ]
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: electronBuildOptions
    }
  },
  chainWebpack(config) {
    config.set('name', name)

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          elementUI: {
            name: 'chunk-elementUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
