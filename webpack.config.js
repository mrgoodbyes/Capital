var utils = require('./etc/webpack/utils')

module.exports = {
  entry: {
    main: './front_src/scripts/entries/main.js'
  },
  output: {
    path: utils.webPath('js'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  plugins: [require('./etc/webpack/manifest_plugin')],
  postcss: [require('postcss-cssnext')]
}
