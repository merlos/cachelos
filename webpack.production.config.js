const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devtool: 'source-maps',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'cachelos',
    libraryTarget: 'umd',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
}
