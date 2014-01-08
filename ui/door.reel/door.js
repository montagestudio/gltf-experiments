var Component;

Component = require("montage/ui/component").Component;

exports.Door = Component.specialize({

  handleDoorAction: {
    value: function(event) {
    	if (!this.templateObjects.door.classList.has("open")) {
	   		this.templateObjects.door.classList.add("open");
    	} else {
	   		this.templateObjects.door.classList.remove("open");
    	}
    }
  }

});
