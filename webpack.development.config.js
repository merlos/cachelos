const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js',
    example: './examples/example.js',
  },
  mode: 'development',
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
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    library: 'cachelos',
  },
  devServer: {
    contentBase: path.join(__dirname, 'examples/'),
    port: 3000,
    publicPath: 'http://localhost:3000/build/',
    hotOnly: true,
  },
  plugins: [new CleanWebpackPlugin()],
}
