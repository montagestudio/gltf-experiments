var Component = require("montage/ui/component").Component;

exports.Beachplanet = Component.specialize({

	MAX_SCORE: { value: 4},

	audios: { value: null },

	backgroundMusicEnabled: { value: true },

	dolphinLogoFound: { value: false },
	
	rockRevealed: { value: false },

	doorOpened: { value: false },

	starRevealed: { value: false },

	_score: { value: 0 },

	score: {
		get: function() {
			return this._score;
		},
		set: function(value) {
			if (this.score !== value) {
				this._score = value;
				this.scoreDidChange();
			}
		}
	},

	playSound: {
		value: function(url, loops) {
			if (this.audios == null) this.audios = {};


			var music = this.audios[url];
			if (music == null) {
				music = new Audio(url);
	          	music.preload = "auto";
			}

          	if (loops === true) {
	         	music.loop = "loop";
	       	}
            music.addEventListener('canplay', function () {
				music.play();
            }, false);
		}
	},

	animateDolphins: {
		value: function() {
	   		this.templateObjects.logoDolphin.classList.remove("BeachPlanet-dolphin-logo-jump");
	   		this.templateObjects.dolphin.classList.remove("BeachPlanet-dolphin-jump");
	   		this.templateObjects.dolphin2.classList.remove("BeachPlanet-dolphin-jump");

			if (this.dolphinLogoFound === false)
		   		this.templateObjects.logoDolphin.classList.add("BeachPlanet-dolphin-logo-jump");
	   		this.templateObjects.dolphin.classList.add("BeachPlanet-dolphin-jump");
	   		this.templateObjects.dolphin2.classList.add("BeachPlanet-dolphin-jump");
			
			var self = this;
			setTimeout(function() {
				self.animateDolphins();
			}, 4000);
		}
	},

	templateDidLoad: {
		value: function () {
			this.templateObjects.viewer.play();
			if (this.backgroundMusicEnabled) {
				this.playSound("sound/WhiteSands.mp3", true);
			}
			this.animateDolphins();
		}
	},

	prepareForPlay: {
		value:function() {
	   		this.dolphinLogoFound = false;
			this.score = 0;
			this.templateObjects.viewer.stop();
			this.templateObjects.viewer.viewPoint = this.templateObjects.planetVP;
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
    		this.playSound("sound/getruby.mp3");
    		//update title		
    		this.classList.add("isWinner");
    		this.classList.remove("isPlaying");

			this.templateObjects.viewer.viewPoint = this.templateObjects.cameraRideViewPoint;
			this.templateObjects.viewer.play();  

			this.starRevealed = this.doorOpened = this.rockRevealed  = this.playing = false;    		
    	}
	},

	scoreDidChange: {
		value: function() {
			if (this.score === this.MAX_SCORE) {
				var self = this;
				setTimeout(function() {
					self.gameWon();
				}, 3000)

    		}

    		this.playSound("sound/getruby.mp3");
	   		this.returnExploringPlanet();
		}
	},

	returnExploringPlanet: {
		value: function() {
			if (this.score < this.MAX_SCORE) {
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
			if (this.rockRevealed === false) {
				this.templateObjects.viewer.viewPoint = this.templateObjects.rockLogoVP;
				this.rockRevealed = true;
	   			this.score++;
			}
		}
	},

	/* handle door */

  	handleDoorAction: {
    	value: function(event) {
    		if (this.doorOpened === false) {
	   			this.templateObjects.viewer.viewPoint = this.templateObjects.cabinLogoVP;
	   			this.doorOpened = true;
	   			this.score++;
    		}
    	}
    },

	/* handle star */

  	handleStarAction: {
    	value: function(event) {
    		if (this.starRevealed === false) {
	   			this.templateObjects.viewer.viewPoint = this.templateObjects.starLogoVP;
	   			this.starRevealed = true;
	   			this.score++;
    		}
    	}
    },

	/* handle star */

  	handleLogoDolphinAction: {
    	value: function(event) {
    		if (this.dolphinLogoFound === false) {
		   		this.templateObjects.viewer.viewPoint = this.templateObjects.dolphinsVP;
	   			this.dolphinLogoFound = true;
		   		this.score++;
    		}
    	} 
	}
    
});
