const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const startServerPlugin = require('start-server-webpack-plugin')
const cleanPlugin = require('clean-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: './src/server.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        loader: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new cleanPlugin(['dist/*.*']),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
}
