/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _asset = __webpack_require__(1);

	var _asset2 = _interopRequireDefault(_asset);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_asset2.default.readManifestFromPage();

	console.log(_asset2.default.url('images/empty.jpg'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    /**
	     * An object that has relative asset paths for keys and md5 hashes for values.
	     * @type {Object}
	     */
	    manifest: {},

	    /**
	     * Reads the manifest data from a script tag with a specific ID
	     * @param {string} id The HTMLElement's id, that contains the manifest JSON
	     */
	    readManifestFromPage: function readManifestFromPage(id) {
	        id = id || 'js-manifest-data';
	        var manifestHolder = document.getElementById(id);
	        if (manifestHolder === null) {
	            console.warn('Failed to read manifest data from the page. Searched for an HTMLElement with the following ID: ', id);
	            return;
	        }

	        try {
	            this.manifest = JSON.parse(manifestHolder.innerHTML);
	        } catch (e) {
	            console.warn('The contents of the manifest holder HTMLElement seems to be an invalid JSON object:', e, manifestHolder);
	        }
	    },

	    /**
	     * Returns a relative asset path with versioning added.
	     *
	     * @param  {string} relPath The asset's path, relative to the public directory.
	     * @return {string}
	     */
	    url: function url(relPath) {
	        if (typeof relPath !== 'string') {
	            console.error('Invalid non-string parameter:', relPath);
	            return '';
	        }

	        if (typeof this.manifest[relPath] === 'undefined') {
	            console.warn('Missing asset information from manifest file for path:', relPath);
	        }

	        return this.manifest[relPath] ? relPath + '?v' + this.manifest[relPath] : relPath;
	    }
	};

/***/ }
/******/ ]);