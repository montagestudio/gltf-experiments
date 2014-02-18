/**
 * @module ui/scene-panel-details.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class ScenePanelDetails
 * @extends Component
 */
exports.ScenePanelDetails = Component.specialize(/** @lends ScenePanelDetails# */ {

    constructor: {
        value: function ScenePanelDetails() {
            this.super();
        }
    },

    glTFElement: {
        value: null
    }

});
