var vfs = require('vinyl-fs');
var chalk = require('chalk');
var path = require('path');
var manifest = require('./manifest');
var utils = require('./utils');

/**
 * Builds a manifest file containing the public assets' md5 hashes.
 * @return {Promise}
 */
module.exports = function() {
    return new Promise(function(resolve, reject) {
        var manifestPath = utils.rootPath('resources/assets.manifest.json');
        vfs.src(utils.webPath('**/*.{jpg,png,css,js}'))
        .pipe(manifest({
            pubPath: utils.webPath(),
            manifestPath: manifestPath
        })).on('end', function() {
            console.info(chalk.green('Done'), 'Generated the manifest file to:', chalk.green('./' + path.relative(process.cwd(), manifestPath)));
            resolve();
        });
    });
};
