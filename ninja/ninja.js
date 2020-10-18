// Sprite image downloaded free from: https://www.gameart2d.com/ninja-adventure---free-sprites.html

//TODO turn image paths into variables so they only need to be declared once

function gameMenu() {
	var menu = document.createElement("div");
	menu.id = "gameMenu";
	menu.style.position = "relative";
	menu.style.margin = "auto";
	menu.style.top = "250px";
	menu.style.height = "200px";
	menu.style.width = "25%";
	menu.style.backgroundColor = "blue";

	var menuButton = document.createElement("button");
	menuButton.id = "button";
	menu.appendChild(menuButton);
	menuButton.style.position = "absolute";
	menuButton.innerHTML = "Play!";
	menuButton.style.top = "45%";
	menuButton.style.marginLeft = "45%";
	menu.appendChild(menuButton);
	document.body.appendChild(menu)

	menuButton.onclick = function() {
		menu.className = "fadeOut";
		loadGame();
		menuButton.onclick = "";
	}
}


function loadGame(){

	var width = window.innerWidth ;
	var height = window.innerHeight -84;

	var bounds = {x:width, y:height};

	console.log(height);

	console.log(window.innerHeight);

	function CreateGameSpace() {

		this.container = document.createElement("div");
		this.container.id = "gameSpace";
		this.container.style.position = "relative";
		this.container.style.left = "15%";
		this.container.style.marginLeft = "auto";
		this.container.style.marginTop = "-200px";
		this.container.style.height = bounds.y + "px";
		this.container.style.width = bounds.x + "px";
		document.body.appendChild(this.container);
	}

	console.log("div: " + document.getElementById("gameSpace"));


	function Player() { // Creates a div to contain the sprite image and enables the movement and animation functions

		// Objects containing the dimensions of the individual sprite actions. Used to set the image slicer during sprite animation
		this.runningDims = {x:181.5, y:229};
		this.climbDims = {x:141, y:232};
		this.glidingDims = {x:221.5, y:227};
		this.attackDims = {x:268, y:247.5};

		this.div = null;
		this.pos = {x:50, y:75, a:(bounds.x - this.runningDims.x -50), b:(bounds.y - this.runningDims.y -75)}; // Sets the initial position of the div containing the sprite
		var dir = {x:1, y:0}; // Sets the initial direction of the sprite (facing right)



		// Creates the div that will contain the sprite
		// Logic based on Create function from Space Invaders game written by Benjamin Kenwright: https://f28wp.github.io/material/games/Game%2001%20-%20Internet%20and%20Web.html
		this.Create = function() {
			this.div = document.createElement("div");
			this.div.id = "ninja";
			 //- Class to be added in a later iteration
			this.div.style.position = "relative";
			this.div.style.left = this.pos.x + "px";
			this.div.style.top 	= this.pos.y + "px";
			this.div.style.height = this.runningDims.y + "px";
			this.div.style.width = this.runningDims.x + "px";
            this.div.style.background = "url(../ninja/sprites/ninjaRunRight.png)";
			this.div.style.backgroundSize = "cover";
			// this.div.style.border = "2px solid black"
			this.div.style.padding = "0pt";
            // gameSpace.appendChild( this.div );
            document.getElementById("gameSpace").appendChild(this.div);
		}

		// Function that moves the div around the screen depending on the key that is pressed. Increments the positioning coordinates based on the set speed
		// Logic based on Move function from Space Invaders game written by Benjamin Kenwright: https://f28wp.github.io/material/games/Game%2001%20-%20Internet%20and%20Web.html
		this.movePlayer = function(i) {

			var speed = 20.0;

			if (String.fromCharCode(i.keyCode) == "D") {
				dir.x = 1;
				this.pos.x += dir.x * speed;
				this.pos.a -= dir.x * speed;
			}
			if (String.fromCharCode(i.keyCode) == "A") {
				dir.x = -1;
				this.pos.x += dir.x * speed;
				this.pos.a -= dir.x * speed;
			}
			if (String.fromCharCode(i.keyCode) == "W") {
				dir.y = -1;
				this.pos.y += dir.y * speed;
				this.pos.b -= dir.y * speed;
			}
			if (String.fromCharCode(i.keyCode) == "S") {
				dir.y = 1;
				this.pos.y += dir.y * speed;
				this.pos.b -= dir.y * speed;
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
			if (this.pos.x > (bounds.x - this.runningDims.x - borderX)) {
				dx = this.pos.x - (bounds.x - this.runningDims.x - borderX);
			}
			if (this.pos.y < borderY) {
				dy = this.pos.y - borderY;
			}
			if (this.pos.y > (bounds.y- this.runningDims.y - borderY)) {
				dy = this.pos.y - (bounds.y - this.runningDims.y - borderY);
			}
			this.pos.x -= dx;
			this.pos.y -= dy;
			
			// Sets the new position of the div
			this.div.style.left 	= this.pos.x + "px";
			this.div.style.top      = this.pos.y + "px";
			console.log(this.div.style.right);
			return this.pos;
		}

		// Function that animates the sprite within the div by using the backgroundPosition property as an image slicer over the sprite sheet 
		this.animatePlayer = function(i) {

		// If the D key is pressed, sprite animates to be running while facing to the right
		if (String.fromCharCode(i.keyCode) == "D") {

            this.div.style.background = "url(../ninja/sprites/ninjaRunRight.png)";

			this.div.style.height = this.runningDims.y + "px";
            this.div.style.width = this.runningDims.x + "px";
            document.getElementById("ninja").style.backgroundSize = "cover";

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

            this.div.style.background = "url(../ninja/sprites/ninjaRunLeft.png)";

			this.div.style.height = this.runningDims.y + "px";
			this.div.style.width = this.runningDims.x + "px";

            document.getElementById("ninja").style.backgroundSize = "cover";
	
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

            this.div.style.background = "url(../ninja/sprites/ninjaClimb.png)";

			this.div.style.height = this.climbDims.y + "px";
			this.div.style.width = this.climbDims.x + "px";
           
            document.getElementById("ninja").style.backgroundSize = "cover";
	
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
            document.getElementById("ninja").style.backgroundSize = "cover";
	
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
            document.getElementById("ninja").style.backgroundSize = "cover";
            
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

	function Enemy() {

		var size = {x:215.4, y:259.5};
		var position = {x:950, y:75, a:(bounds.x - size.x - 950) , b:(bounds.y - size.y -80) };

		this.CreateEnemy = function() {
			this.enemy 				    = document.createElement("div");
			this.enemy.id 			    = "enemy";
			this.enemy.style.position   = "absolute";
			this.enemy.style.height     = size.y + "px";
			this.enemy.style.width      = size.x + "px";
			this.enemy.style.top        = position.y + "px";
			this.enemy.style.left      = position.x + "px";
			this.enemy.style.background = "url(../ninja/sprites/zombieWalkLeft.png)";
			this.enemy.style.backgroundSize   = "cover";
			// this.enemy.style.border = "2px solid black"
			document.getElementById("gameSpace").appendChild(this.enemy);
			return position;
		}

		this.animateEnemy = function () {
	
			this.enemy.style.backgroundSize = "cover";

			var position = 215.4;
			var diff = 215.4;
	
			interval = setInterval(function() {			
				document.getElementById("enemy").style.backgroundPosition = position + "px 0px";
	
				if (position < 2154) {
					position = position - diff;
				}
				else {
					position = 215.4;
				}
			}, 50);
		}
	}

	CreateGameSpace();

	var playerPos;
	var enemyPos;

	var ninja = new Player();
	ninja.Create();

	var enemy = new Enemy();
	enemyPos = enemy.CreateEnemy();
	enemy.animateEnemy();

	function Collision() {
		document.getElementById("enemy").className = "fadeOutEnemy";
	}

	function keyDown(i) {
		playerPos = ninja.movePlayer(i);
		console.log("Player position x: " + playerPos.x);
		console.log("Enemy position x: " + enemyPos.x);
		console.log("Player position a: " + playerPos.a);
		console.log("Enemy position a: " + enemyPos.a);
		console.log("Player position y: " + playerPos.y);
		console.log("Enemy position y: " + enemyPos.y);
		console.log("Player position b: " + playerPos.b);
		console.log("Enemy position b: " + enemyPos.b);
		if((playerPos.x +185.5) > enemyPos.x && playerPos.y <= (enemyPos.y + 20)
				&& playerPos.b >= (enemyPos.b - 50) && String.fromCharCode(i.keyCode) == " "){
			Collision();
		}
		ninja.animatePlayer(i);
		return playerPos;
	}

	function keyUp(i) {
		clearInterval(interval);
	}

	document.onkeydown = keyDown;

	document.onkeyup = keyUp;
	
}
	
window.onload = gameMenu;


