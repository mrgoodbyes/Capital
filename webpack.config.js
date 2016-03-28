var path = require('path');
var utils = require('./front_src/utils');
var vfs = require('vinyl-fs');
var chalk = require('chalk');
var utils = require('./front_src/utils');
var manifestBuild = require('./front_src/manifestBuild');
var cssnext = require('postcss-cssnext');

module.exports = {
    entry: {
        main: './front_src/scripts/entries/main.js',
    },
    output: {
        path: utils.webPath('js'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    plugins: [
        function() {
            this.plugin('done', manifestBuild.bind(this))
        }
    ],
    postcss: function () {
        return [cssnext];
    }
};
