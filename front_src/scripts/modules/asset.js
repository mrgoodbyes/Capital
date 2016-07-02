export default {
  /**
   * An object that has relative asset paths for keys and md5 hashes for values.
   * @type {Object}
   */
  manifest: {},

  /**
   * Reads the manifest data from a script tag with a specific ID
   * @param {string} id The HTMLElement's id, that contains the manifest JSON
   */
  readManifestFromPage: function (id) {
    id = id || 'js-manifest-data'
    var manifestHolder = document.getElementById(id)
    if (manifestHolder === null) {
      console.warn('Failed to read manifest data from the page. Searched for an HTMLElement with the following ID: ', id)
      return
    }

    try {
      this.manifest = JSON.parse(manifestHolder.innerHTML)
    } catch (e) {
      console.warn('The contents of the manifest holder HTMLElement seems to be an invalid JSON object:', e, manifestHolder)
    }
  },

  /**
   * Returns a relative asset path with versioning added.
   *
   * @param  {string} relPath The asset's path, relative to the public directory.
   * @return {string}
   */
  url: function (relPath) {
    if (typeof relPath !== 'string') {
      console.error('Invalid non-string parameter:', relPath)
      return ''
    }

    if (typeof this.manifest[relPath] === 'undefined') {
      console.warn('Missing asset information from manifest file for path:', relPath)
    }

    return this.manifest[relPath] ? relPath + '?v' + this.manifest[relPath] : relPath
  }
}
