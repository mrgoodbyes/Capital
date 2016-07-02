var path = require('path');

module.exports = {
    webPath: function(relPath) {
        return path.join(__dirname + '/../../parent/Capital-WEB/src/main/webapp', relPath || '');
    },

    rootPath: function(relPath) {
        return path.join(__dirname + '/../../parent/Capital-EJB/src/main', relPath || '');
    }
};
