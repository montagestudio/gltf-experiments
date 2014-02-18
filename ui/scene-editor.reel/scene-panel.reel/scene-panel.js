/**
 * @module ui/scene-panel.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    application = require("montage/core/application").application,

    CONFIGURATION = {
        ITEMS: [
            {
                label: "details",
                index: 0
            },
            {
                label: "view",
                index: 1
            }
        ]
    };

/**
 * @class ScenePanel
 * @extends Component
 */
exports.ScenePanel = Component.specialize(/** @lends ScenePanel# */ {

    constructor: {
        value: function ScenePanel() {
            this.super();
        }
    },

    items: {
        get: function () {
            return CONFIGURATION.ITEMS;
        }
    },

    _glTFElement: {
        value: null
    },

    glTFElement: {
        set: function (element) {
            if (element !== this._glTFElement) {
                this._glTFElement = {
                    name: element.name
                };
            }
        },
        get: function () {
            return this._glTFElement;
        }
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                application.addEventListener("sceneNodeSelected", this);

                if (this.items.length > 0) {
                    this.templateObjects.scenePanelBar.barController.select(this.items[0]);
                }
            }
        }
    },

    handleSceneNodeSelected: {
        value: function (event) {
            var glTFElement = event.detail;

            if (glTFElement) {
                this.glTFElement = glTFElement;
            }
        }
    }

});
