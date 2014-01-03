var Component;

Component = require("montage/ui/component").Component;

exports.BeachPlanet = Component.specialize({

	playing: { value: false },

	score: { value: 0 },

	templateDidLoad: {
		value: function () {
			this.templateObjects.viewer.play();
		}
	},

	handleNavItemAction: { 
		value: function(event) {
			this.playing = true;
			this.templateObjects.viewer.stop();
			this.templateObjects.viewer.viewPoint = event.target.viewPoint;
		}
	},

	handleRockHover: {
		value: function(event) {
	    	if (this.playing && !this.templateObjects.rock.classList.has(".BeachPlanet-rock-reveal")) {
	   			this.templateObjects.rock.classList.add(".BeachPlanet-rock-reveal");
	   			this.templateObjects.logoRock.classList.add(".BeachPlanet-rock-logo-reveal");
	   			this.score++;
			}
		}
	}

});
