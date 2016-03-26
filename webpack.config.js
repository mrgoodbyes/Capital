var path = require('path');
var utils = require('./front_src/utils');
var vfs = require('vinyl-fs');
var chalk = require('chalk');
var utils = require('./front_src/utils');
var manifestBuild = require('./front_src/manifestBuild');

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
                test: /.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        function() {
            this.plugin('done', manifestBuild.bind(this))
        }
    ]
};
