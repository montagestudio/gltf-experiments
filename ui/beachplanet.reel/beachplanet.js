var Component;

Component = require("montage/ui/component").Component;

exports.BeachPlanet = Component.specialize({

	templateDidLoad: {
		value: function () {
			this.templateObjects.viewer.play();
		}
	}

});
