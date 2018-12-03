const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const startServerPlugin = require('start-server-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = {
  ...common,
  mode: 'development',
  entry: [
    'webpack/hot/poll?1000',
    './src/server.ts',
  ],
  watch: true,
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000'],
  })],
  plugins: [
    new startServerPlugin('server.bundle.js'),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
