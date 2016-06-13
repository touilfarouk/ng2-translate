var webpack             = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var helpers             = require('./config/helpers');

var path                = require('path');

module.exports = {
  entry: {
    'polyfills' : './src/polyfills.ts',
    'vendor'    : './src/vendor.ts',
    'app'       : './src/main.ts'
  },

  resolve: {
    extensions: [
      '', 
      '.js', 
      '.ts'
      ]
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html$/,
        //exclude: /node_modules/,
        loader: 'html'
        
        //loaders: ['html'],
        //include: path.join(__dirname, '.')
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    new ExtractTextPlugin('[name].css')
  ], 
  

  devtool: 'cheap-module-eval-source-map',

  output: {
    path          : helpers.root('dist'),
    publicPath    : 'http://localhost:8080/',
    filename      : '[name].js',
    chunkFilename : '[id].chunk.js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
  
};


