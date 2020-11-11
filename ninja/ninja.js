// Sprite image downloaded free from: https://www.gameart2d.com/ninja-adventure---free-sprites.html

// Load Game menu when page laods (simple div with play button)
function gameMenu() {
	var menu = document.createElement("div");
	menu.id = "gameMenu";
	menu.style.position = "relative";
	menu.style.margin = "auto";
	menu.style.top = "250px";
	menu.style.height = "200px";
	menu.style.width = "25%";
	menu.style.backgroundColor = "blue";

    // Creates play button for center of menu
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

// When play button is pressed loadGame() is called
function loadGame(){

    // Get height and width of window
	var width = window.innerWidth ;
	var height = window.innerHeight;

    // Set bounds variable to be height and width of window
	var bounds = {x:width, y:height};

    // Creates a score board in the top left to keep track of a players score
	function CreateScoreBoard() {

		var scoreBoard = document.createElement("div");
		scoreBoard.id = "scoreBoard";
		scoreBoard.style.position = "absolute";
		scoreBoard.style.margin = "auto";
		scoreBoard.style.top = "0px";
		scoreBoard.style.height = "20px";
		scoreBoard.style.width = "60px";
		scoreBoard.innerHTML = "Score: ";
		document.body.appendChild(scoreBoard)
		
	}


	function Player() { // Creates a div to contain the sprite image and enables the movement and animation functions

		// Objects containing the dimensions of the individual sprite actions. Used to set the image slicer during sprite animation
		this.runningDims = {x:181.5, y:229};
		this.climbDims = {x:141, y:232};
		this.glidingDims = {x:221.5, y:227};
		this.attackDims = {x:268, y:247.5};

        // Sets the various sprite images as varibles
		var runRight = "url(../ninja/sprites/ninjaRunRight.png)";
		var runLeft = "url(../ninja/sprites/ninjaRunLeft.png)";
		var climb = "url(../ninja/sprites/ninjaClimb.png)";
		var glideLeft =  "url(../ninja/sprites/glideLeft.png)";
		var glideRight = "url(../ninja/sprites/glideRight.png)";
		var attackLeft = "url(../ninja/sprites/ninjaFlip.png)";
		var attackRight = "url(../ninja/sprites/ninja.png)";

		var runSlice = 363;
		var climbSlice = 282;
		var glideSlice = 443;
		var attackSlice = 537;

		this.pos = {x:50, y:75, a:(bounds.x - this.runningDims.x -50), b:(bounds.y - this.runningDims.y -75)}; // Sets the initial position of the div containing the sprite
		var dir = {x:1, y:0}; // Sets the initial direction of the sprite (facing right)



		// Creates the div that will contain the sprite
		// Logic based on Create function from Space Invaders game written by Benjamin Kenwright: https://f28wp.github.io/material/games/Game%2001%20-%20Internet%20and%20Web.html
		this.Create = function() {
			this.div = document.createElement("div");
			this.div.id = "ninja";
			 //- Class to be added in a later iteration
			this.div.style.position = "absolute";
			this.div.style.left = this.pos.x + "px";
			this.div.style.top 	= this.pos.y + "px";
			this.div.style.height = this.runningDims.y + "px";
			this.div.style.width = this.runningDims.x + "px";
            this.div.style.background = runRight;
			this.div.style.backgroundSize = "cover";
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
			
			return this.pos;
		}

		// Function that animates the sprite within the div by using the backgroundPosition property as an image slicer over the sprite sheet 
		this.animatePlayer = function(i) {
				var diff = 0;
			if (String.fromCharCode(i.keyCode) == "D") {                            // Identifies the key that has been pressed
				diff = runSlice;                                                    // Sets the size of the image slicer that will be passed into the animation function
				this.div.style.background = runRight;                               // Sets the image to be the appropriate action, in this case the character is running right
                this.div.style.height = this.runningDims.y + "px";                  // Sets the height of the sprite
				this.div.style.width = this.runningDims.x + "px";                   // Sets the width of the sprite
				document.getElementById("ninja").style.backgroundSize = "cover";    // Makes the sprite image fit the div
				runRightSlicerPos = animate(runRightSlicerPos);                     // Calls the animate function and stores the latest slicer position in the runRightClicerPos variable
			}
			else if (String.fromCharCode(i.keyCode) == "A") {
				diff = runSlice;
				this.div.style.background = runLeft;
				this.div.style.height = this.runningDims.y + "px";
				this.div.style.width = this.runningDims.x + "px";
				document.getElementById("ninja").style.backgroundSize = "cover";
				runLeftSlicerPos = animate(runLeftSlicerPos);
			}
			else if (String.fromCharCode(i.keyCode) == "W") {
				diff = climbSlice;
				this.div.style.background = climb;
				this.div.style.height = this.climbDims.y + "px";
				this.div.style.width = this.climbDims.x + "px";
				document.getElementById("ninja").style.backgroundSize = "cover";
				climbSlicerPos = animate(climbSlicerPos);
			}
			else if (String.fromCharCode(i.keyCode) == "S") {
				diff = glideSlice;
				if (dir.x == 1) {
					this.div.style.background = glideRight;
					this.div.style.height = this.glidingDims.y + "px";
					this.div.style.width = this.glidingDims.x + "px";
					document.getElementById("ninja").style.backgroundSize = "cover";
					glideRightSlicerPos = animate(glideRightSlicerPos);
				}
				else if (dir.x == -1) {
					this.div.style.background = glideLeft;
					this.div.style.height = this.glidingDims.y + "px";
					this.div.style.width = this.glidingDims.x + "px";
					document.getElementById("ninja").style.backgroundSize = "cover";
					glideLeftSlicerPos = animate(glideLeftSlicerPos);
				}

			}
			else if (String.fromCharCode(i.keyCode) == " ") {
				this.div.style.height = this.attackDims.y + "px";
				this.div.style.width = this.attackDims.x + "px";
	
				if (dir.x == 1) {
					this.div.style.background = attackRight;
				}
				else if (dir.x == -1) {
					this.div.style.background = attackLeft;
				}
				document.getElementById("ninja").style.backgroundSize = "cover";
				
				var position = 1074;
				const diff = 537;
			
				setTimeout(function() {   // If the space bar is pressed, the animation is done through set time out that moves the sword from high to low instead of the animation function
					var count = 0;
					while(count < 10) {
						position = position + diff;
						document.getElementById("ninja").style.backgroundPosition = position + "px 0px";
						count++;
					}					
				}, 100);
			}

			function animate(slicerPos) {  // Animates the sprite by moving the background position of the image within the div by one image width each time a certain key is pressed
				if (slicerPos == 0) {
					slicerPos += diff
					document.getElementById("ninja").style.backgroundPosition = slicerPos + "px 0px";
				}
				else if (slicerPos < diff*10) {
					slicerPos += diff;
					document.getElementById("ninja").style.backgroundPosition = slicerPos + "px 0px";
				}
				else if (slicerPos >= diff*10) {
					slicerPos = 0;
					document.getElementById("ninja").style.backgroundPosition = slicerPos + "px 0px";
				}
				return slicerPos;
			}
	}
 
	}

    // Creates the enemy on the screen and starts a continuous animation loop using a setInterval
	function Enemy() {

		var size = {x:215.4, y:259.5};
		var position = {x:950, y:75, a:(bounds.x - size.x - 950) , b:(bounds.y - size.y -80) };
		var zombie = "url(../ninja/sprites/zombieWalkLeft.png)";

		this.CreateEnemy = function() {
			this.enemy 				    = document.createElement("div");
			this.enemy.id 			    = "enemy";
			this.enemy.style.position   = "absolute";
			this.enemy.style.height     = size.y + "px";
			this.enemy.style.width      = size.x + "px";
			this.enemy.style.top        = position.y + "px";
			this.enemy.style.left      = position.x + "px";
			this.enemy.style.background = zombie;
			this.enemy.style.backgroundSize   = "cover";
			document.getElementById("gameSpace").appendChild(this.enemy);
			return position;
		}

		this.animateEnemy = function () {
	
			this.enemy.style.backgroundSize = "cover";

			var position = 215.4;
			var diff = 215.4;
			zombieInterval = setInterval(function() {			
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

    // Creates a coin image and starts a continuous animation loop using setInterval
	function Coin() {

		var size = {x:50, y:150};
		var position = {x:500, y:75, a:(bounds.x - size.x - 950) , b:(bounds.y - size.y -80) };

		this.CreateCoin = function() {
			this.coin 				    = document.createElement("div");
			this.coin.id 			    = "coin";
			this.coin.style.position   = "absolute";
			this.coin.style.height     = size.y + "px";
			this.coin.style.width      = size.x + "px";
			this.coin.style.top        = position.y + "px";
			this.coin.style.left      = position.x + "px";
			this.coin.style.background = "url(../ninja/sprites/coin-clipart-sprite-5-original.png)";
			this.coin.style.backgroundSize   = "cover";
			document.getElementById("gameSpace").appendChild(this.coin);
			return position;
		}

		this.animateCoin = function () {
	
			this.coin.style.backgroundSize = "cover";

			var position = 50;
			var diff = 50;
	
			coinInterval = setInterval(function() {			
				document.getElementById("coin").style.backgroundPosition = position + "px 0px";
	
				if (position < 500) {
					position = position - diff;
				}
				else {
					position = 50;
				}
			}, 50);
		}
	}

	CreateScoreBoard();

	var playerPos;
	var enemyPos;
	var coinPos;

	var ninja = new Player();
	ninja.Create();
	var score = 0;
	document.getElementById("scoreBoard").innerHTML = "Score: " + score;

	var enemy = new Enemy();
	enemyPos = enemy.CreateEnemy();
	enemy.animateEnemy();

	var coin = new Coin();
	coinPos = coin.CreateCoin();
	coin.animateCoin();


	function Collision(i) {
		document.getElementById(i).className = "hide";
    }

    // Initiates the position of the image slicer for each sprite to be 0
    var runRightSlicerPos = 0;
    var runLeftSlicerPos = 0;
    var climbSlicerPos = 0;
	var glideRightSlicerPos = 0;
	var glideLeftSlicerPos = 0;

	function keyDown(i) {
		playerPos = ninja.movePlayer(i);
		if((playerPos.x +185.5) > enemyPos.x && playerPos.y <= (enemyPos.y + 20)
				&& playerPos.b >= (enemyPos.b - 50) && String.fromCharCode(i.keyCode) == " "){ // Detects a collision with the enemy, enemy dissapears if collision and space bar down is true
			Collision("enemy");
		}
		if((playerPos.x + 181.5 > coinPos.x && playerPos.y <= coinPos.y
				&& playerPos.b >= coinPos.b)){                                                 // Detects collision with the coin and increments score by 10 if true
			Collision("coin");
			score += 10;
			document.getElementById("scoreBoard").innerHTML = "Score: " + score;
			document.getElementById("coin").remove();
        }
		ninja.animatePlayer(i);
		return playerPos;
	}

	function keyUp(i) {
		clearInterval();
	}

	document.onkeydown = keyDown;

	document.onkeyup = keyUp;
	
}

window.onload = gameMenu;


