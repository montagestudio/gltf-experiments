/**
 * @module ui/scene-panel-bar-item.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class ScenePanelBarItem
 * @extends Component
 */
exports.ScenePanelBarItem = Component.specialize(/** @lends ScenePanelBarItem# */ {

    constructor: {
        value: function ScenePanelBarItem() {
            this.super();
        }
    },

    label: {
        value: null
    }

});
