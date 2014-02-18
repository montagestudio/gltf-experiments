/**
 * @module ui/scene-panel-content.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class ScenePanelContent
 * @extends Component
 */
exports.ScenePanelContent = Component.specialize(/** @lends ScenePanelContent# */ {

    constructor: {
        value: function ScenePanelContent() {
            this.super();
        }
    },

    selectedTab: {
        value: null
    },

    glTFElement: {
        value: null
    }

});
