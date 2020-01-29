const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const IS_PROD = (process.env.NODE_ENV === 'production');

const config = {
  entries: {
    'bundle.js' : './src/index.js'
  },
  paths: {
    src: 'src',
    dist: 'dist'
  }
}
const wp = {
  entry: config.entries,
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, config.paths.dist)
  },
  resolve: {
    modules: [ 'node_modules', config.paths.src ],
    extensions: [".js", ".jsx", ".scss", ".css", ".html"]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js|.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            comments: false
          }
        }
      },
      {
        test: /\.(svg|png|jpg|gif|ttf|otf|woff|woff2|eot)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        use: [
          'mustache-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': '"production"'}}),
    // new webpack.optimize.minimize({
    //   compress: { warnings: false, screw_ie8: true, drop_console: true},
    //   output: {comments: false},
    //   mangle: {screw_ie8: true},
    //   sourceMap: true
    // }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: [config.paths.dist]
      }
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(IS_PROD)
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  devtool: 'source-map'
};

module.exports = wp;
