const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.VUE_APP_REMOTES === 'local' ?
    // DEVELOPMENT
    'http://localhost:9998/' :
    // PRODUCTION
    'https://module-federation-mfe-two.herokuapp.com/',
  devServer: { port: 9998 },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      uniqueName: 'mfetwo',
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'MfeTwo',
        filename: 'remoteEntry.js',
        remotes: process.env.VUE_APP_REMOTES === 'local' ?
          // DEVELOPMENT
          {
            ModuleAuth: 'ModuleAuth@http://localhost:9898/remoteEntry.js',
            MfeOne: 'MfeOne@http://localhost:9999/remoteEntry.js',
            Shell: 'Shell@http://localhost:8080/remoteEntry.js'
          } :
          // PRODUCTION
          {
            ModuleAuth: 'ModuleAuth@https://module-federation-module-auth.herokuapp.com/remoteEntry.js',
            MfeOne: 'MfeOne@https://module-federation-mfe-one.herokuapp.com/remoteEntry.js',
            Shell: 'Shell@https://module-federation-mfe-consumer.herokuapp.com/remoteEntry.js'
          },
        exposes: {
          './MfeTwo': './src/bootstrap.js'
        },
        shared: {
          vue: {
            singleton: true,
            requiredVersion: deps.vue
          },
          'vue-router': {
            singleton: true,
          },
          ...require('./package.json').dependencies
        },
      })
    ]
  }
})