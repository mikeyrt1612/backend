const nodeExternals = require('webpack-node-externals')
const startServerPlugin = require('start-server-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = {
  ...common,
  mode: 'production',
  externals: [nodeExternals()]
}
