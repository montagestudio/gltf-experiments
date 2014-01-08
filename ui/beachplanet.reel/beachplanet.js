var Component;

Component = require("montage/ui/component").Component;

exports.BeachPlanet = Component.specialize({

	backgroundMusicEnabled: { value: true },

	playing: { value: false },

	classes: {
		value: {
			"REVEAL_ROCK" : "BeachPlanet-rock-reveal",
			"REVEAL_ROCK_LOGO" : "BeachPlanet-rock-logo-reveal",
			"OPEN_DOOR" : "BeachPlanet-door-open",
			"REVEAL_STAR" : "BeachPlanet-star-reveal",
			"REVEAL_STAR_LOGO" : "BeachPlanet-star-logo-reveal"
		}
	},

	playSound: {
		value: function(url, loops) {
			var music = new Audio(url);

          	music.preload = "auto";
          	if (loops === true) {
	         	music.loop = "loop";
	       	}
            music.addEventListener('canplaythrough', function () {
				music.play();
            }, false);
		}
	},

	templateDidLoad: {
		value: function () {
			this.templateObjects.viewer.play();
			if (this.backgroundMusicEnabled) {
				this.playSound("sound/WhiteSands.mp3", true);
			}
		}
	},

	prepareForPlay: {
		value:function() {
			this.score = 0;
			this.templateObjects.viewer.stop();
			this.templateObjects.viewer.viewPoint = this.templateObjects.planetVP;

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
			this.templateObjects.viewer.allowsViewPointControl = event.target.viewPoint === this.templateObjects.planetVP;
		}
	},

	gameWon: {
		value: function() {
			this.playSound("sound/completed.wav");
    		//update title		
    		this.classList.add("isWinner");
    		this.classList.remove("isPlaying");

			this.templateObjects.viewer.viewPoint = this.templateObjects.cameraRideViewPoint;
			this.templateObjects.viewer.play();  

	   		this.templateObjects.logoRock.classList.remove(this.classes.REVEAL_ROCK_LOGO);
	   		this.templateObjects.rock.classList.remove(this.classes.REVEAL_ROCK);
	   		this.templateObjects.door.classList.remove(this.classes.OPEN_DOOR);
	   		this.templateObjects.star.classList.remove(this.classes.REVEAL_STAR);
	   		this.templateObjects.logoStar.classList.remove(this.classes.REVEAL_STAR_LOGO);

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

    		this.playSound("sound/getruby.mp3");
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

	returnExploringPlanet: {
		value: function() {
			if (this.score < 3) {
				var self = this;
				setTimeout(function() {
					self.templateObjects.viewer.viewPoint = self.templateObjects.planetVP;
					self.templateObjects.viewer.allowsViewPointControl = true;
				}, 2000);
			}
		}
	},

	/* handle rock */

	handleRockAction: {
		value: function(event) {
	    	if (this.playing && !this.templateObjects.rock.classList.has("BeachPlanet-rock-reveal")) {
	   			this.templateObjects.rock.classList.add("BeachPlanet-rock-reveal");
	   			this.templateObjects.viewer.viewPoint = this.templateObjects.rockLogoVP;
	   			this.templateObjects.logoRock.classList.add("BeachPlanet-rock-logo-reveal");
	   			this.score++;
	   			this.returnExploringPlanet();
			}
		}
	},

	handleRockHover: {
		value: function(event) {
        	if (this.playing && !this.templateObjects.rock.classList.has("BeachPlanet-rock-reveal")) {
				this.templateObjects.viewer.element.style.cursor="pointer";   			
	    	}
		}
	},

	/* handle door */

  	handleDoorAction: {
    	value: function(event) {
    		if (this.playing && !this.templateObjects.door.classList.has("BeachPlanet-door-open")) {
	   			this.templateObjects.viewer.viewPoint = this.templateObjects.cabinLogoVP;
	   			this.templateObjects.door.classList.add("BeachPlanet-door-open");
	   			this.score++;
	   			this.returnExploringPlanet();
    		} 
    	}
    },

	handleDoorHover: {
		value: function(event) {
        	if (this.playing && !this.templateObjects.door.classList.has("BeachPlanet-door-open")) {
				this.templateObjects.viewer.element.style.cursor="pointer";   			
	    	}
		}
	},

	/* handle star */

  	handleStarAction: {
    	value: function(event) {
    		if (this.playing && !this.templateObjects.star.classList.has("BeachPlanet-star-reveal")) {
	   			this.templateObjects.viewer.viewPoint = this.templateObjects.starLogoVP;
	   			this.templateObjects.star.classList.add("BeachPlanet-star-reveal");
	   			this.templateObjects.logoStar.classList.add("BeachPlanet-star-logo-reveal");
	   			this.score++;
	   			this.returnExploringPlanet();
    		} 
    	}
    },

	handleStarHover: {
		value: function(event) {
        	if (this.playing && !this.templateObjects.star.classList.has("BeachPlanet-star-reveal")) {
				this.templateObjects.viewer.element.style.cursor="pointer";   			
	    	}
		}
	}



});
