var path = require('path');

module.exports = {
    entry: './front_src/scripts/main.js',
    output: {
        path: __dirname + '/parent/Capital-WEB/src/main/webapp/js',
        filename: 'main.js'
    },
    module: {
        loaders: [
            {
                // test: path.join(__dirname, 'es6'),
                test: /.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
