var path = require('path');
var fs = require('fs');

module.exports = {
    entry: {
        main: './front_src/scripts/entries/main.js',
        other: './front_src/scripts/entries/other.js',
    },
    output: {
        path: path.join(__dirname, 'parent/Capital-WEB/src/main/webapp/js'),
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
            this.plugin('done', function(stats) {
                // todo: improve this method to handle multiple files with possibly multiple chunks
                var hash = stats.toJson().chunks[0].hash;
                fs.writeFileSync(
                    path.join(__dirname, 'parent/Capital-EJB/src/main/resources/assets.manifest.json'),
                    JSON.stringify(stats.toJson(), null, 4)
                    // JSON.stringify({
                    //     'main.js': hash
                    // }, null, 4)
                );
            });
        }
    ]
};
