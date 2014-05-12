/**
 * @module ui/style-comparator.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    Configuration = require("ui/style-comparator.reel/core/conf").Configuration;

/**
 * @class StyleComparator
 * @extends Component
 */
exports.StyleComparator = Component.specialize(/** @lends StyleComparator# */ {

    constructor: {
        value: function StyleComparator() {
            this.super();
        }
    },

    _loadInitialState: {
        value: function () {
            var self = this;

            require.async(Configuration.templates.html).then(function (template) {
                self.templateObjects.htmlCodeMirror.value = template.content;

                return require.async(Configuration.templates.sceneHtml).then(function (templateScene) {
                    self.templateObjects.htmlSceneCodeMirror.value = templateScene.content.replace("$SCENE_PATH$", '../../../../../' + Configuration.models.penguin);

                    return require.async(Configuration.templates.css).then(function (templateCss) {
                        self.templateObjects.cssCodeMirror.value = templateCss.content;
                        self.scenePath = Configuration.models.penguin;

                        return require.async(Configuration.templates.javascript).then(function (templateJS) {
                            self.javascript = templateJS.content;
                        });
                    });
                });
            }).done();
        }
    },

    css: {
        get: function () {
            return this.templateObjects.cssCodeMirror.value;
        }
    },

    html: {
        get: function () {
            return this.templateObjects.htmlCodeMirror.value;
        }
    },

    javascript: {
        value: null
    },

    htmlScene: {
        get: function () {
            return this.templateObjects.htmlSceneCodeMirror.value;
        }
    },

    scenePath: {
        value: null
    },

    enterDocument: {
        value: function (firstime) {
            if (firstime) {
                this.templateObjects.htmlCodeMirror._element.addEventListener('keyup', this);
                this.templateObjects.htmlSceneCodeMirror._element.addEventListener('keyup', this);
                this.templateObjects.cssCodeMirror._element.addEventListener('keyup', this);
            }
        }
    },

    handleKeyup: {
        value: function (event) {
            event.stopImmediatePropagation();

            this.templateObjects.htmlPreview.scheduleUpdate();
            this.templateObjects.scenePreview.scheduleUpdate();
        }
    },

    templateDidLoad: {
        value: function() {
            this._loadInitialState();
        }
    }

});
