const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../', 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader', 'eslint-loader'] },
      { test: /\.(css|s[ac]ss)$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(gif|png|jpe?g|svg)$/i, use: 'file-loader' },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@App': path.resolve(__dirname, '../', 'src/'),
      '@Components': path.resolve(__dirname, '../', 'src/components/'),
      '@Views': path.resolve(__dirname, '../', 'src/views/'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
    }),
  ],
};
