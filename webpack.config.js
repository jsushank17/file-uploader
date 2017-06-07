var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      'test': /\.(jpe?g|png|ico|gif|svg)$/i,
      'loaders': [
        'url-loader?limit=15000&name=images/[name].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
     /* Extract css files */
    {
        'test': /\.css$/,
        'include': path.join(__dirname, 'src'),
        'loader': ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
    },

    /* Optionally extract less files */
    /* or any other compile-to-css language */
    {
        'test': /\.scss$/,
        'include': path.join(__dirname, 'src'),
        'loader': ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?sourceMap')
    },]
  },
  'sassLoader': {
    'includePaths': [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src/components/')
    ]
  },

  'resolve': {
    'root': [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/components/'),
      path.resolve(__dirname, 'node_modules')
    ],
    'extensions': ['', '.js', '.jsx', '.scss', '.css']
  },
  'plugins': [
    new ExtractTextPlugin("[name]-[hash].css", {
        'allChunks': true
    })
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};

