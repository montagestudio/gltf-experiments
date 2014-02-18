/**
 * @module ui/scene-tree-view.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class SceneTreeView
 * @extends Component
 */
exports.SceneTreeView = Component.specialize(/** @lends SceneTreeView# */ {

    constructor: {
        value: function SceneTreeView() {
            this.super();
        }
    },

    _scene: {
        value: null
    },

    fileName: {
        value: null
    },

    scene: {
        set: function (scene) {
            if (scene && scene.path) {
                var pathData = /([^\/]+)\.[^\.]+$|(?:[^\/]+)$/.exec(scene.path);

                if (pathData && Array.isArray(pathData) && pathData.length === 2) {
                    this.fileName = pathData[1];
                    this._scene = scene;
                }
            }
        },
        get: function () {
            return this._scene;
        }
    }

});
