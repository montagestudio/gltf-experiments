var Component;

Component = require("montage/ui/component").Component;

exports.BeachPlanet = Component.specialize({

	templateDidLoad: {
		value: function () {
			this.templateObjects.viewer.play();
		}
	},

	handleNavItemAction: { 
		value: function(event) {
			this.templateObjects.viewer.stop();
			this.templateObjects.viewer.viewPoint = event.target.viewPoint;
		}
	}

});
