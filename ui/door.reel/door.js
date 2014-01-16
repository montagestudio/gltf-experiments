var Component;

Component = require("montage/ui/component").Component;

exports.Door = Component.specialize({

  doorOpen: {
    value: false
  },

  handleDoorAction: {
    value: function(event) {
      this.doorOpen = ~this.doorOpen;
    }
  }

});
