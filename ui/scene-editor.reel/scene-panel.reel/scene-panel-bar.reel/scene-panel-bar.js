/**
 * @module ui/scene-panel-bar.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class ScenePanelBar
 * @extends Component
 */
exports.ScenePanelBar = Component.specialize(/** @lends ScenePanelBar# */ {

    constructor: {
        value: function ScenePanelBar() {
            this.super();
        }
    },

    items: {
        value: null
    }

});
