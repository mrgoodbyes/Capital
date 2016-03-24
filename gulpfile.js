'use strict';

var gulp = require('gulp');
var path = require('path');
var chalk = require('chalk');
var manifest = require('./front_src/manifest');
var utils = require('./front_src/utils');

gulp.task('manifest', function() {
    var manifestPath = utils.rootPath('resources/assets.manifest.json');

    gulp.src(utils.webPath('**/*.{js,css}'))
        .pipe(manifest({
            pubPath: utils.webPath(),
            manifestPath: manifestPath
        })).on('end', function() {
            console.info(chalk.green('Done'), 'Generated the manifest file to:', chalk.green('./' + path.relative(__dirname, manifestPath)));
        });
});
