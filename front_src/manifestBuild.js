var vfs = require('vinyl-fs');
var chalk = require('chalk');
var path = require('path');
var manifest = require('./manifest');
var utils = require('./utils');

var manifestPath = utils.rootPath('resources/assets.manifest.json');

/**
 * Builds a manifest file containing the public assets' md5 hashes.
 */
module.exports = function() {
    vfs.src(utils.webPath('**/*.{js,css}'))
        .pipe(manifest({
            pubPath: utils.webPath(),
            manifestPath: manifestPath
        })).on('end', function() {
            console.info(chalk.green('Done'), 'Generated the manifest file to:', chalk.green('./' + path.relative(__dirname, manifestPath)));
        });
};
