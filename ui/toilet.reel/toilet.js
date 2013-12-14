var Component;

Component = require("montage/ui/component").Component;

exports.Toilet = Component.specialize({
  lidOpen: {
    value: false
  },
  handleButtonAction: {
    value: function(event) {
      console.log("Clicked...");
      return this.lidOpen = ~this.lidOpen;
    }
  }
});
