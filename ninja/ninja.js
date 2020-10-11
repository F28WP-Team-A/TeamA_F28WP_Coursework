// Sprite image downloaded free from: https://www.gameart2d.com/ninja-adventure---free-sprites.html

function loadGame(){ // Initiates the game when the window loads

	function Player() { // Creates a div to contain the sprite image and enables the movement and animation functions

		this.div = null;
		this.pos = {x:50, y:75}; // Sets the initial position of the div containing the sprite
		var dir = {x:1, y:0}; // Sets the initial direction of the sprite (facing right)

		// Objects containing the dimensions of the individual sprite actions. Used to set the image slicer during sprite animation
		this.runningDims = {x:363, y:458};
		this.climbDims = {x:282, y:464};
		this.glidingDims = {x:443, y:454};
		this.attackDims = {x:536, y:495};

		// Creates the div that will contain the sprite
		// Logic based on Create function from Space Invaders game written by Benjamin Kenwright: https://f28wp.github.io/material/games/Game%2001%20-%20Internet%20and%20Web.html
		this.Create = function() {
			this.div = document.createElement("div");
			this.div.id = "ninja";
			// this.div.className = "flashing"; - Class to be added in a later iteration
			this.div.style.position = "absolute";
			this.div.style.left = this.pos.x + "px";
			this.div.style.top 	= this.pos.y + "px";
			this.div.style.height = this.runningDims.y + "px";
			this.div.style.width = this.runningDims.x + "px";
			this.div.style.background = "url(../ninja/sprites/ninjaRunRight.png)";
			this.div.style.padding = "0pt";
			document.body.appendChild( this.div );
		}

		// Function that moves the div around the screen depending on the key that is pressed. Increments the positioning coordinates based on the set speed
		// Logic based on Move function from Space Invaders game written by Benjamin Kenwright: https://f28wp.github.io/material/games/Game%2001%20-%20Internet%20and%20Web.html
		this.movePlayer = function(i) {

			var speed = 20.0;

			if (String.fromCharCode(i.keyCode) == "D") {
				dir.x = 1;
				this.pos.x += dir.x * speed;
			}
			if (String.fromCharCode(i.keyCode) == "A") {
				dir.x = -1;
				this.pos.x += dir.x * speed;
			}
			if (String.fromCharCode(i.keyCode) == "W") {
				dir.y = -1;
				this.pos.y += dir.y * speed;
			}
			if (String.fromCharCode(i.keyCode) == "S") {
				dir.y = 1;
				this.pos.y += dir.y * speed;
			}

			// Ensures the div does not move off the page by setting a limit on its lateral and vertical movement
			var borderX = 10;
			var borderY = 5;
			var height = window.innerHeight; // Sets height variable to be the height of the visible window
			var dx = 0;
			var dy = 0;

			if (this.pos.x < borderX) {
				dx = this.pos.x - borderX;
			}
			if (this.pos.x > (document.body.clientWidth - this.runningDims.x - borderX)) {
				dx = this.pos.x - (document.body.clientWidth - this.runningDims.x - borderX);
			}
			if (this.pos.y < borderY) {
				dy = this.pos.y - borderY;
			}
			if (this.pos.y > (height- this.runningDims.y - borderY)) {
				dy = this.pos.y - (height - this.runningDims.y - borderY);
			}
			this.pos.x -= dx;
			this.pos.y -= dy;
			
			// Sets the new position of the div
			this.div.style.left 	= this.pos.x + "px";
			this.div.style.top      = this.pos.y + "px";
		}

		// Function that animates the sprite within the div by using the backgroundPosition property as an image slicer over the sprite sheet 
		this.animatePlayer = function(i) {

		// If the D key is pressed, sprite animates to be running while facing to the right
		if (String.fromCharCode(i.keyCode) == "D") {

			this.div.style.height = this.runningDims.y + "px";
			this.div.style.width = this.runningDims.x + "px";

			this.div.style.background = "url(../ninja/sprites/ninjaRunRight.png)";
	
			var position = 363;
			const diff = 363;
	
			interval = setInterval(function() {
				
				document.getElementById("ninja").style.backgroundPosition = position + "px 0px";
	
				if (position < 3630) {
					position = position - diff;
				}
				else if (position >= 3630) {
					position = 363;
				}
				else if (count > 100) {
					clearInterval();
				}
			}, 50);
		}

		// If A key is pressed, sprite animates to be running while facing to the left
		if (String.fromCharCode(i.keyCode) == "A") {

			this.div.style.height = this.runningDims.y + "px";
			this.div.style.width = this.runningDims.x + "px";

			this.div.style.background = "url(../ninja/sprites/ninjaRunLeft.png)";
	
			var position = 363;
			const diff = 363;
	
			interval = setInterval(function() {
				
				document.getElementById("ninja").style.backgroundPosition = position + "px 0px";
	
				if (position < 3630) {
					position = position + diff;
				}
				else {
					position = 363;
				}
			}, 50);
		}

		// If the W key is pressed, the sprite animates to be climbing vertically up the page
		if (String.fromCharCode(i.keyCode) == "W") {

			this.div.style.height = this.climbDims.y + "px";
			this.div.style.width = this.climbDims.x + "px";

			this.div.style.background = "url(../ninja/sprites/ninjaClimb.png)";
	
			var position = 282;
			const diff = 282;
	
			interval = setInterval(function() {
	
				console.log("Entered function")
				
				document.getElementById("ninja").style.backgroundPosition = position + "px 0px";
	
				if (position < 2820) {
					position = position + diff;
				}
				else {
					position = 282;
				}
			}, 50);
		}

		// If the S key is pressed, the sprite animates to be gliding, facing the previous direction of travel
		if (String.fromCharCode(i.keyCode) == "S") {

			this.div.style.height = this.glidingDims.y + "px";
			this.div.style.width = this.glidingDims.x + "px";

			if (dir.x == 1) {
				this.div.style.background = "url(../ninja/sprites/glideRight.png)";
			}
			else if (dir.x == -1) {
				this.div.style.background = "url(../ninja/sprites/glideLeft.png)";
			}
	
			var position = 443;
			const diff = 443;
	
			interval = setInterval(function() {
				
				document.getElementById("ninja").style.backgroundPosition = position + "px 0px";
	
				if (position < 4430) {
					position = position + diff;
				}
				else {
					position = 443;
				}
			}, 50);
		}

		// If the space bar is pressed, the sprite animates to be attacking with a sword, facing the previous direction of travel
		if (String.fromCharCode(i.keyCode) == " ") {

			this.div.style.height = this.attackDims.y + "px";
			this.div.style.width = this.attackDims.x + "px";

			if (dir.x == 1) {
				this.div.style.background = "url(../ninja/sprites/ninja.png)";
			}
			else if (dir.x == -1) {
				this.div.style.background = "url(../ninja/sprites/ninjaFlip.png)";
			}
	
			var position = 536;
			const diff = 536;
	
			interval = setInterval(function() {
				
				document.getElementById("ninja").style.backgroundPosition = position + "px 0px";
	
				if (position < 5360) {
					position = position + diff;
				}
				else {
					position = 536;
				}
			}, 25);
		}
	}
 
	}
	var ninja = new Player();
	ninja.Create();
	
	function keyDown(i) {
		ninja.movePlayer(i);
		ninja.animatePlayer(i);
	}

	function keyUp(i) {
		clearInterval(interval);
	}

	document.onkeydown = keyDown;

	document.onkeyup = keyUp;
	
}
	
window.onload = loadGame;
