var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var routePlugin = require('./src/config/routeconfig');
module.exports = {
  context:path.resolve(__dirname),
  entry: routePlugin.jsPlugin,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module:{
    loaders:[
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
        query: {
          partialDirs: [path.resolve(__dirname, 'src', 'components')].concat(glob.sync('**/', { cwd: path.resolve(__dirname, 'src', 'components'), realpath: true }))
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css!sass'
        )
      },
      {
        test: /\.css$/,
        loader:'style-loader!css-loader' 
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|jpg|gif|svg|webp)$/,
        loader: 'url?limit=8192&name=imgs/[name].[ext]'
      },
      {
        test:/\.svg$/,
        loader:"svg-url-loader"
      }
    ]
  },
  sassLoader: {
    includePaths: [
      './src/styles',
      './src/views/**/*.scss',
      './src/components/**/*.scss'
    ]
  },
  plugins:[
    new ExtractTextPlugin('lei/css/[name].css'),
    new CopyWebpackPlugin([{ from: './src/static' }]),
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'home/index.html',
      template: './src/views/home/home.handlebars',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      title: 'About',
      filename: 'about/index.html',
      template: './src/views/about/about.handlebars',
      chunks: ['about']
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ].concat(routePlugin.htmlPlugin)
}