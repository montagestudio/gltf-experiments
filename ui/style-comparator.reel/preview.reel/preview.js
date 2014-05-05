/**
 * @module ./preview.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component,
    Configuration = require("ui/style-comparator.reel/core/conf").Configuration,

    TIME_OUT_UPDATE = 1000;

/**
 * @class Preview
 * @extends Component
 */
exports.Preview = Component.specialize(/** @lends Preview# */ {

    constructor: {
        value: function Preview() {
            this.super();
        }
    },

    css: {
        get: function () {
            return this.controller.css;
        }
    },

    html: {
        get: function () {
            if (this.controller) {
                return this.controller[this.contentProperty];
            }

            return void 0;
        }
    },

    contentProperty: {
        value: null
    },

    controller: {
        value: null
    },

    _timeoutID: {
        value: null
    },

    enterDocument: {
        value: function (firstime) {
            if (firstime) {
                this.scheduleUpdate();
            }
        }
    },

    scheduleUpdate: {
        value: function () {
            if (this._timeoutID) {
                clearTimeout(this._timeoutID)
            }

            var self = this;

            this._timeoutID = window.setTimeout(function () {
                self._update();
                self._timeoutID = null;

            }, TIME_OUT_UPDATE);
        }
    },

    _update: {
        value: function() {
            if (this.templateObjects && this.html) {
                var doc = document.implementation.createHTMLDocument("");

                doc.documentElement.innerHTML = this.html;

                if (doc) {
                   var elements = doc.getElementsByTagName("body");

                   if (elements && elements.length > 0) {
                       var body = elements[0].innerHTML,
                           selector = "script[type='" + Configuration.serializationScript + "']",
                           serialization = doc.querySelector(selector);

                       if (serialization) {
                           serialization = serialization.textContent;
                       }

                       this.templateObjects.montageFrame.load(this.css, serialization, body, this.controller.javascript);
                   }
                }
            }
        }
    }

});
