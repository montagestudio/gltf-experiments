/**
 * @module ui/scene-template-explorer.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class SceneTemplateExplorer
 * @extends Component
 */
exports.SceneTemplateExplorer = Component.specialize(/** @lends SceneTemplateExplorer# */ {

    constructor: {
        value: function SceneTemplateExplorer() {
            this.super();
        }
    },

    editingDocument: {
        value: null
    },

    enterDocument: {
        value: function (firstime) {
            if (firstime) {
                this.addRangeAtPathChangeListener("editingDocument.selectedObjects", this, "handleSelectElement");
            }
        }
    },

    templateObjectsController: {
        value: null
    },

    handleSelectElement: {
        value: function (event) {

        }
    }

});
