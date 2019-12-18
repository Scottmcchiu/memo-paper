const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'https://kit.fontawesome.com/c3f36ccac8.js',
    filename: './js/bundle.min.js'
  },
  devtool: false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/bundle.min.css'
    }),
    new webpack.SourceMapDevToolPlugin(),
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      filename: './index.html',
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        sortAttributes: true,
        useShortDoctype: true
      },
      inject: false
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:3000/'
    }, {
      reload: false
    })
  ],
  module: {
    rules: [{
        test: /\.js$/,
        use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          'source-map-loader'
        ],
        enforce: 'pre'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer'),
                  require('cssnano')({presets: ['default', {discardComments: {removeAll: true}}]})
                ];
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
};
