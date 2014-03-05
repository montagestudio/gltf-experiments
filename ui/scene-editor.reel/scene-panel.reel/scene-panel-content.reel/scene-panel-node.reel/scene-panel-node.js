/**
 * @module ui/scene-panel-node.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class ScenePanelNode
 * @extends Component
 */
exports.ScenePanelNode = Component.specialize(/** @lends ScenePanelNode# */ {

    constructor: {
        value: function ScenePanelNode() {
            this.super();
        }
    },

    glTFElement: {
        value: null
    }

});
