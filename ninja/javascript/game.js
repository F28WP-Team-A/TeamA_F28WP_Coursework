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

		var player = new Ninja(bounds);

		var dir = {x:1, y:0}; // Sets the initial direction of the sprite (facing right)

		// Function that moves the div around the screen depending on the key that is pressed. Increments the positioning coordinates based on the set speed
		// Logic based on Move function from Space Invaders game written by Benjamin Kenwright: https://f28wp.github.io/material/games/Game%2001%20-%20Internet%20and%20Web.html
		this.movePlayer = function(i) {

			var speed = 20.0;

			if (String.fromCharCode(i.keyCode) == "D") {
				dir.x = 1;
				var axis = "x";
				playerPos = player.moveNinja(dir, speed, bounds, axis);
				player.animatePlayer(dir, i);
			}
			if (String.fromCharCode(i.keyCode) == "A") {
				dir.x = -1;
				var axis = "x";
				playerPos = player.moveNinja(dir, speed, bounds, axis);
				player.animatePlayer(dir, i);
			}
			if (String.fromCharCode(i.keyCode) == "W") {
				dir.y = -1;
				var axis = "y";
				playerPos = player.moveNinja(dir, speed, bounds, axis);
				player.animatePlayer(dir, i);
			}
			if (String.fromCharCode(i.keyCode) == "S") {
				dir.y = 1;
				var axis = "y";
				playerPos = player.moveNinja(dir, speed, bounds, axis);
				player.animatePlayer(dir, i);
			}

			return playerPos;
		} 
	}

	CreateScoreBoard();

    var playerPos;
    
    var col = false;

	var ninja = new Player();
	var score = 0;
	document.getElementById("scoreBoard").innerHTML = "Score: " + score;

	// Generates a random x and y coordinate for the coin within the boundaries of the current screen size
	function RandomLoc() {
		randPos = {x: Math.floor(Math.random() * document.body.clientWidth), y: Math.floor(Math.random() * window.innerHeight)}
		return randPos;    
	}
	
	// Empty list to store the coin objects that are auto generated
	var coinList = []
	// Count introduced to give each coin a unique ID
	var count = 0;
	
	setInterval(() => {
		count ++;
		var newX = RandomLoc().x;
		var newY = RandomLoc().y;
		coinList.push(new Coin(newX, newY, count));
	}, 5000);

	function Collision(i) {
		var coinId = i.getId();
		if(document.getElementById(coinId)) {
			document.getElementById(coinId).remove();
			score += 10;
			document.getElementById("scoreBoard").innerHTML = "Score: " + score;
		}
    }

	function keyDown(i) {
		playerPos = ninja.movePlayer(i);
		console.log("PlayerPos: " + playerPos);
		coinList.forEach(CollisionCheck);
		return playerPos;
	}

	function CollisionCheck(c) {
		if((playerPos.x + 181.5 > c.getX() && playerPos.x < c.getZ()
			&& c.getY() > playerPos.y && c.getW() < playerPos.y + 235)){
                col = true;
                Collision(c);
        }
	}

	function keyUp(i) {
		clearInterval();
	}

	document.onkeydown = keyDown;

	document.onkeyup = keyUp;
	
}

window.onload = gameMenu;


