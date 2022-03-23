const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'http://localhost:9998/',
  devServer: { port: 9998 },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    // chainWebpack: config => {
    //   config.module
    //     .rule('vue')
    //     .use('vue-loader')
    //     .tap(options => ({
    //       ...options,
    //       compilerOptions: {
    //         // treat any tag that starts with ion- as custom elements
    //         isCustomElement: tag => tag.startsWith('Prime-')
    //       }
    //     }))
    // },
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeTwo',
        filename: 'remoteEntry.js',
        remotes: {
          ModuleAuth: 'ModuleAuth@http://localhost:9898/remoteEntry.js'
        },
        exposes: {
          './MfeTwo': './src/bootstrap.js' // implica wrapper en consumer que use el mount exportado por main
          //'./MfeTwo': './src/components/MfeTwo-MainComponent.vue'
        },
        shared: {
          vue: {
            eager: true,
            singleton: true,
            requiredVersion: deps.vue
          },
          ...require('./package.json').dependencies
        },
        //shared: require('./package.json').dependencies,
      })
    ]
  }
})