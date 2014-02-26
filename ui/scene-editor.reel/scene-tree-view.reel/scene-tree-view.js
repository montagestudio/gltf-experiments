/**
 * @module ui/scene-tree-view.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    NodeTemplate = require("ui/scene-editor.reel/core/node.html").content,
    MIME_TYPES = require("ui/scene-editor.reel/core/mime-types");

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
    },

    _nodeTemplateHtmlDocument: {
        value: null
    },

    enterDocument: {
        value: function (firstTime) {
            if (firstTime) {
                this._element.addEventListener("dragstart", this);
            }
        }
    },

    _createNodeTemplate: {
        value: function (nodeElementID) {
            var htmlDocument = document.implementation.createHTMLDocument("");
            htmlDocument.documentElement.innerHTML = NodeTemplate;

            if (nodeElementID) {
                var selector = "script[type='" + MIME_TYPES.SERIALIZATON_SCRIPT_TYPE + "']",
                    scriptSerialization = htmlDocument.querySelector(selector);

                if (scriptSerialization) {
                    var serialization = JSON.parse(scriptSerialization.textContent);

                    if (serialization && serialization.node) {
                        var node = serialization.node;

                        node.properties = node.properties ? node.properties : {};
                        node.properties.id = nodeElementID;
                        //todo set scene property

                        scriptSerialization.textContent = JSON.stringify(serialization);
                    }
                }
            }

            return htmlDocument.documentElement.outerHTML;
        }
    },

    handleDragstart: {
        value: function (event) {
            var dataTransfer = event.dataTransfer;

            if (dataTransfer) {
                var nodeElementID = dataTransfer.getData(MIME_TYPES.TEXT_PLAIN);
                dataTransfer.effectAllowed = 'copy';

                if (nodeElementID) {
                    var nodeTemplate = this._createNodeTemplate(nodeElementID);
                    dataTransfer.setData(MIME_TYPES.TEMPLATE, nodeTemplate);
                }
            }
        }
    }

});
