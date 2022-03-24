const { defineConfig } = require('@vue/cli-service');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const deps = require("./package.json");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: 'https://module-federation-mfe-two.herokuapp.com/',
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
        remotes: {
          ModuleAuth: 'ModuleAuth@https://module-federation-module-auth.herokuapp.com/remoteEntry.js',
          // MfeOne: 'MfeOne@http://localhost:9999/remoteEntry.js',
          MfeOne: 'MfeOne@https://module-federation-mfe-one.herokuapp.com/remoteEntry.js',
        },
        exposes: {
          './MfeTwo': './src/bootstrap.js' // implica wrapper en consumer que use el mount exportado por main
          //'./MfeTwo': './src/components/MfeTwo-MainComponent.vue'
        },
        shared: {
          vue: {
            // eager: true,
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