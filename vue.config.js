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
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeTwo',
        filename: 'remoteEntry.js',
        exposes: {
          //'./MfeTwo': './src/bootstrap.js' // implica wrapper en consumer que use el mount exportado por main
          './MfeTwo': './src/components/MfeTwo-MainComponent.vue'
        },
        // shared: {
        //   vue: {
        //     eager: true,
        //     singleton: true,
        //     requiredVersion: deps.vue
        //   },
        //   'element-plus': {
        //     eager: true
        //   }
        // },
        shared: require('./package.json').dependencies,
      })
    ]
  }
})