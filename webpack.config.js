const HtmlWebpackPlugin = require('html-webpack-plugin');
const GoogleFontsWebpackPlugin = require('google-fonts-webpack-plugin');

const fonts = require('./config/fonts');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  "plugins": [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new GoogleFontsWebpackPlugin({
      fonts: [
        ...fonts
      ],
      local: false
    })
  ]
};
