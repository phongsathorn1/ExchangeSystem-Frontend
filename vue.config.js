const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
//   css: {
//     loaderOptions: {
//       less: {
//         modifyVars: {
//           'font-family': '\'Avenir\', Helvetica, Arial, sans-serif'
//         },
//         javascriptEnabled: true
//       }
//     }
//   },
  configureWebpack: {
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
              return `npm.${packageName.replace('@', '')}`
            }
          }
        }
      }
    }
  },
  chainWebpack (config) {
    config.plugins.delete('prefetch')
    config.plugin('CompressionPlugin').use(CompressionPlugin)
  },
  pluginOptions: {
    s3Deploy: {
      bucket: 'exchange.com',
      staticHosting: true,
      cacheControl: 'max-age=86400',
      gzip: true,
      registry: undefined,
      awsProfile: 'default',
      overrideEndpoint: false,
      region: 'us-east-1',
      createBucket: false,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      pluginVersion: '4.0.0-rc3',
      uploadConcurrency: 5
    }
  }
}
