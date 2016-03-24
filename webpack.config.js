var path = require('path');
var utils = require('./front_src/utils');

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
    }
};
