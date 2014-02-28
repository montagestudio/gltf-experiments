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
    },

    sceneDidDraw: {
    	value: function() {
    		if (this.sceneView.selectedNode) {
    			if (this.sceneView.selectedNode.glTFElement) {
					this.sceneView._displayBBOX(this.sceneView.selectedNode.glTFElement);
    			}
    		}
    	}
    },

    sceneView: {
    	get: function() {
    		return this.templateObjects.sceneView;
    	}
    },

    templateDidLoad: {
        value: function() {
        	this.sceneView.delegate = this;
        }
    }

});
