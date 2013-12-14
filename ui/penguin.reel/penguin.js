var Component;

Component = require("montage/ui/component").Component;

exports.Penguin = Component.specialize({
  handleHatAction: {
    value: function(event) {
      return this.templateObjects.text.value = "Do you like my fancy hat?";
    }
  }
});
