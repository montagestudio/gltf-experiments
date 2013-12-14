var Component;

Component = require("montage/ui/component").Component;

exports.City = Component.specialize({
  templateDidLoad: {
    value: function(e) {
      return this.templateObjects.viewer.play();
    }
  }
});
