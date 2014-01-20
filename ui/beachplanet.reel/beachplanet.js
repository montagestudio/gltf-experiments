// Copyright (c) 2013, Fabrice Robinet.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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
	         	this.audios[url] = music;
	          	if (loops === true) {
		         	music.loop = "loop";
	    	   	}
	            music.addEventListener('canplay', function () {
					music.play();
       		   	}, false);
			} else {
				music.currentTime = 0;
				music.play();
			}
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
    		this.playSound("sound/getruby.mp3");
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

	_exploringTimeout: { value: null },

	returnExploringPlanet: {
		value: function() {
			if (this.score < this.MAX_SCORE) {
				var self = this;
				if (this._exploringTimeout != null) {
					clearTimeout(this._exploringTimeout);
					self._exploringTimeout = null;
				}
				this._exploringTimeout = setTimeout(function() {
					self._exploringTimeout = null;
					self.templateObjects.viewer.viewPoint = self.templateObjects.planetVP;
					self.templateObjects.viewer.allowsViewPointControl = true;
				}, 4000);
			}
		}
	},

	checkAndApplyGameActionIfNeeded: {
		value: function(actionName, viewPoint) {
			if (this[actionName] === false) {
				this.templateObjects.viewer.viewPoint = viewPoint;
				this[actionName] = true;
	   			this.score++;
			}
		}
	},

	/* handle rock */
	handleRockAction: {
		value: function(event) {
			this.checkAndApplyGameActionIfNeeded("rockRevealed", this.templateObjects.rockLogoVP);
		}
	},

	/* handle door */
  	handleDoorAction: {
    	value: function(event) {
			this.checkAndApplyGameActionIfNeeded("doorOpened", this.templateObjects.cabinLogoVP);
    	}
    },

	/* handle star */
  	handleStarAction: {
    	value: function(event) {
			this.checkAndApplyGameActionIfNeeded("starRevealed", this.templateObjects.starLogoVP);
    	}
    },

	/* handle star */
  	handleLogoDolphinAction: {
    	value: function(event) {
			this.checkAndApplyGameActionIfNeeded("dolphinLogoFound", this.templateObjects.dolphinsVP);
    	} 
	},

	//This will go away once infinite transitions are supported
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

});
