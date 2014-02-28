/**
 * @module ui/scene-view.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class SceneView
 * @extends Component
 */
exports.Stage3D = Component.specialize(/** @lends SceneView# */ {

    constructor: {
        value: function Stage3D() {
            this.super();
        }
    },

    scene: {
    	value: null
    }

});