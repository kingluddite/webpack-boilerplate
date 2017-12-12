const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');

require('dotenv').config();

module.exports = {
  entry: __dirname + '/src/app/index.js', // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // folder to store generated bundle
    filename: 'bundle.js', // name of generated bundle after build
    publicPath: '/',
  },
  module: {
    // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.html/,
        loader: 'raw-loader',
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader', // create style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates to CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
        }),
      },
    ],
  },
  plugins: [
    // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: __dirname + '/src/public/index.html',
      inject: 'body',
    }),
    new ExtractTextPlugin('styles.css'), // extract css to a separate file called styles.css
    new webpack.DefinePlugin({
      // plugin to define global constants
      API_KEY: JSON.stringify(process.env.API_KEY),
    }),
    new DashboardPlugin(),
  ],
  devServer: {
    // configuration for webpack-dev-server
    contentBase: './src/public', // source of static assets
    port: 7700, // port to run dev-server
  },
};
