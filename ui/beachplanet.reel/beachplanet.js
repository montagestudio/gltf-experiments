var Component;

Component = require("montage/ui/component").Component;

exports.BeachPlanet = Component.specialize({

	playing: { value: false },

	templateDidLoad: {
		value: function () {
			this.templateObjects.viewer.play();

			var music = new Audio("sound/WhiteSands.mp3");
			music.load();
			music.play();
		}
	},

	prepareForPlay: {
		value:function() {
			this.score = 0;
			this.templateObjects.viewer.stop();
			this.templateObjects.viewer.viewPoint = this.templateObjects.cameraRideViewPoint;

			this.playing = true;
		}
	},
    
    handlePlayButtonAction: { 
    	value: function(event) {
    		this.classList.remove("isIntro");
    		this.classList.add("isPlaying");
    		this.prepareForPlay();
    	}
    },
    
    handlePlayAgainButtonAction: { 
    	value: function(event) {
    		this.classList.remove("isWinner");
    		this.classList.add("isPlaying");
    		this.prepareForPlay();
    	}
    },
    
	handleNavItemAction: { 
		value: function(event) {
			this.templateObjects.viewer.stop();
			this.templateObjects.viewer.viewPoint = event.target.viewPoint;
		}
	},

	gameWon: {
		value: function() {
    		//update title		
    		this.classList.add("isWinner");
    		this.classList.remove("isPlaying");

			this.templateObjects.viewer.viewPoint = this.templateObjects.cameraRideViewPoint;
			this.templateObjects.viewer.play();  

	   		this.templateObjects.logoRock.classList.remove(".BeachPlanet-rock-logo-reveal");
	   		this.templateObjects.rock.classList.remove(".BeachPlanet-rock-reveal");
	   		this.templateObjects.door.classList.remove(".BeachPlanet-door-open");
	   		this.templateObjects.star.classList.remove(".BeachPlanet-star-reveal");
	   		this.templateObjects.logoStar.classList.remove(".BeachPlanet-star-logo-reveal");

    	}
	},

	scoreDidChange: {
		value: function() {
			if (this.score === 3) {
				var self = this;
				setTimeout(function() {
					self.gameWon();
				}, 3000)

    		}

			var clickSound = new Audio("sound/getruby.mp3");
			clickSound.load();
			clickSound.play();
		}
	},

	_score: { value: 0 },

	score: {
		get: function() {
			return this._score;
		},
		set: function(value) {
			this._score = value;
			this.scoreDidChange();
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
	   			this.templateObjects.door.classList.add(".BeachPlanet-door-open");
	   			this.score++;
    		} 
    	}
    },

	handleDoorHover: {
		value: function(event) {
        	if (this.playing && !this.templateObjects.door.classList.has(".BeachPlanet-door-open")) {
				this.templateObjects.viewer.element.style.cursor="pointer";   			
	    	}
		}
	},

	/* handle star */

  	handleStarAction: {
    	value: function(event) {
    		if (this.playing && !this.templateObjects.star.classList.has(".BeachPlanet-star-reveal")) {
	   			this.templateObjects.star.classList.add(".BeachPlanet-star-reveal");
	   			this.templateObjects.logoStar.classList.add(".BeachPlanet-star-logo-reveal");
	   			this.score++;
    		} 
    	}
    },

	handleStarHover: {
		value: function(event) {
        	if (this.playing && !this.templateObjects.star.classList.has(".BeachPlanet-star-reveal")) {
				this.templateObjects.viewer.element.style.cursor="pointer";   			
	    	}
		}
	}



});
