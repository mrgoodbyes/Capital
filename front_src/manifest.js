var through = require('through2');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');

/**
 * A node module to extract md5 hashes from the incoming file stream.
 */
module.exports = function(opts) {
    var manifest = {};

    return through.obj(
        function process(file, encoding, callback) {
            if (fs.lstatSync(file.path).isDirectory()) {
                callback(null, file);
                return;
            }

            manifest[path.relative(opts.pubPath, file.path)] =
                crypto
                    .createHash('md5')
                    .update(file.contents, 'binary')
                    .digest('hex');

            callback(null, file);
        },
        function end() {
            fs.writeFile(opts.manifestPath, JSON.stringify(manifest, null, 4));
            this.emit('end');
        }
    );
};
