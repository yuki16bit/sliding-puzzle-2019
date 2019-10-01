require('dotenv').config();
const webpack = require('webpack');

const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', `${src}/app.jsx`],
  output: {
    path: dist,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_UNSPLASH_API_KEY': JSON.stringify(
        `${process.env.REACT_APP_UNSPLASH_API_KEY}`,
      ),
      'process.env.REACT_APP_FIRESTORE_API_KEY': JSON.stringify(
        `${process.env.REACT_APP_FIRESTORE_API_KEY}`,
      ),
    }),
    new HtmlWebPackPlugin({
      template: `${src}/index.html`,
      filename: 'index.html',
      favicon: `${src}/imgs/favicon.ico`,
    }),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
  },
};
