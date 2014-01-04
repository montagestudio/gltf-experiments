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
    
    handlePlayButtonAction: { 
    	value: function(event) {
    		this.classList.remove("isIntro");
    		this.classList.add("isPlaying");
    	}
    },
    
	handleNavItemAction: { 
		value: function(event) {
			this.playing = true;
			this.templateObjects.viewer.stop();
			this.templateObjects.viewer.viewPoint = event.target.viewPoint;
		}
	},

	/* handle rock */

	handleRockAction: {
		value: function(event) {
	    	if (this.playing && !this.templateObjects.rock.classList.has(".BeachPlanet-rock-reveal")) {
	   			this.templateObjects.rock.classList.add(".BeachPlanet-rock-reveal");
	   			this.templateObjects.logoRock.classList.add(".BeachPlanet-rock-logo-reveal");
	   			this.score++;
			}
		}
	},

	handleRockHover: {
		value: function(event) {
        	if (this.playing && !this.templateObjects.rock.classList.has(".BeachPlanet-rock-reveal")) {
				this.templateObjects.viewer.element.style.cursor="pointer";   			
	    	}
		}
	},

	/* handle door */

  	handleDoorAction: {
    	value: function(event) {
    		if (this.playing && !this.templateObjects.door.classList.has(".BeachPlanet-door-open")) {
	   			this.templateObjects.viewer.viewPoint = this.templateObjects.cabinVP;
	   			console.log("handleDoorAction");
	   			this.templateObjects.door.classList.add(".BeachPlanet-door-open");
	   			this.score++;
    		} 
    	}
    },

	handleDoorHover: {
		value: function(event) {
        	if (this.playing && !this.templateObjects.rock.classList.has(".BeachPlanet-door-open")) {
				this.templateObjects.viewer.element.style.cursor="pointer";   			
	    	}
		}
	}


});
