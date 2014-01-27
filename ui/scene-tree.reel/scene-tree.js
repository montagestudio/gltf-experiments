/**
 * @module ui/scene-tree.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class SceneTree
 * @extends Component
 */
exports.SceneTree = Component.specialize(/** @lends SceneTree# */ {
    constructor: {
        value: function SceneTree() {
            this.super();
        }
    }
});
