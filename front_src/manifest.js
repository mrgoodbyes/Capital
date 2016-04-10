var through = require('through2');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');

function getHash(contents) {
    return crypto
        .createHash('md5')
        .update(contents, 'binary')
        .digest('hex');
}

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

            manifest[path.relative(opts.pubPath, file.path)] = getHash(file.contents);

            callback(null, file);
        },
        function end() {
            var newManifestContent = JSON.stringify(manifest, null, 4);

            // Only write file if the content actually changed, so that we don't
            // trigger watch tasks unnecessarily.
            fs.exists(opts.manifestPath, function(exists) {
                var doWrite = !exists
                    ? true
                    : getHash(fs.readFileSync(opts.manifestPath)) !== getHash(newManifestContent);

                if (doWrite) {
                    fs.writeFile(opts.manifestPath, newManifestContent);
                }

                this.emit('end');
            }.bind(this));
        }
    );
};
