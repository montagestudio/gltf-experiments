/**
 * @module ui/scene-editor.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    ReelDocument = require("./core/reel-document").ReelDocument;

/**
 * @class SceneEditor
 * @extends Component
 */
exports.SceneEditor = Component.specialize(/** @lends SceneEditor# */ {

    constructor: {
        value: function SceneEditor () {
            this.super();
        }
    },

    enterDocument: {
        value: function (firstime) {
            if (firstime) {
                var self = this;

                ReelDocument.load(require.location + "ui/scene-editor.reel/core/ui/sample.reel", require.location).then(function (doc) {
                    self.editingDocument = doc;
                });
            }
        }
    },

    editingDocument: {
        value: null
    }

});
