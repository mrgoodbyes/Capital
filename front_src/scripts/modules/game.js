import asset from './asset';

require('../../styles/canvas.css');
require('../../styles/canvas-wrapper.css');

export default {
    canvas: null,
    canvasWrapper: null,

    load: function() {
        asset.readManifestFromPage();
        this.setupCanvas();
    },

    setupCanvas: function() {
        this.canvasWrapper = document.createElement('div');
        this.canvasWrapper.classList.add('canvas-wrapper');

        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('canvas');

        this.canvasWrapper.appendChild(this.canvas);
        document.getElementsByTagName('body')[0].appendChild(this.canvasWrapper);
    },

    reRender: function() {

    }
};
