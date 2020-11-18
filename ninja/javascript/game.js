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
		scoreBoard.style.top = "5%";
		scoreBoard.style.height = "20px";
		scoreBoard.style.width = "100px";
		scoreBoard.innerHTML = "Score: ";
		document.body.appendChild(scoreBoard)
		
	}
	

	/* 
	Function that moves the div containing the player around the screen depending on the key that is pressed.
	Increments the coordinates of the playerPos object based on the set speed, direction and axis.
	bounds is also passed into the Ninja method in order to keep the player within the boundaries
	of the screen.
	Returns the updated playerPos object of the Ninja object.
	*/
	function movePlayer(i, player) {

		var speed = 20.0;

		if (String.fromCharCode(i.keyCode) == "D") {
			dir.x = 1;
			axis = "x";
			playerPos = player.moveNinja(dir, speed, bounds, axis);
			player.animatePlayer(dir, i);
		}
		if (String.fromCharCode(i.keyCode) == "A") {
			dir.x = -1;
			axis = "x";
			playerPos = player.moveNinja(dir, speed, bounds, axis);
			player.animatePlayer(dir, i);
		}
		if (String.fromCharCode(i.keyCode) == "W") {
			dir.y = -1;
			axis = "y";
			playerPos = player.moveNinja(dir, speed, bounds, axis);
			player.animatePlayer(dir, i);
		}
		if (String.fromCharCode(i.keyCode) == "S") {
			dir.y = 1;
			axis = "y";
			playerPos = player.moveNinja(dir, speed, bounds, axis);
			player.animatePlayer(dir, i);
		}
		if (String.fromCharCode(i.keyCode) == " ") {
			player.animatePlayer(dir, i);
		}

		return playerPos;
	}

	// TEMPORARY PLACEHOLDER FOR PLAYER INTERACTION
	function Enemy() {

		// UPDATE SIZE TO STOP SLICER DRIFT
		// UPDATE POSITION TO SPAWN VARIABLES
		var size = {x:215.4, y:259.5};
		var position = {x:950, y:75, z: 950 + 215.4 , w: 75+259.5 };
		var zombie = "url(../sprites/zombieWalkLeft.png)";

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
			// this.enemy.style.border = "2px solid black"
			document.getElementById("gameSpace").appendChild(this.enemy);
			return position;
		}

		this.animateEnemy = function () {
	
			this.enemy.style.backgroundSize = "cover";

			var position = 215.4;
			var diff = 215.4;
			// UPDATES TO SETTIMEOUT
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
	
	/*
	Creates an empty list that will contain the ninja objects of all the players currently
	in the game. Is used to keep track of the positions of all the players and to determine
	whether there has been a collision between two players.
	*/
	var playerList = [];

	/*
	Creates a score board for the player, initially sets the value as 0 and adds the score
	variable as text next to the score board in html.
	*/
	CreateScoreBoard();
	var score = 0;
	document.getElementById("scoreBoard").innerHTML = "Score: " + score;

	/* 
	Creates an empty variable that will hold the playerPos object each time it 
	is incremented in order to keep tracke of the player position outside of the Ninja
	class, and also so collision can be detected with coins, walls and other players.
	*/
	var playerPos;

	// Sets the initial direction of the sprite (facing right)
	var dir = {x:1, y:0};

	/* 
	Creates an empty variable that will keep track of the axis the player is currently
	moving along. This is used in determining which side of a wall a player is colliding with
	and which direction to move the div when certain keys are pressed.
	*/
	var axis;
	
	// POTENTIALLY DELETE
	var col = false;
	
	/*
	Creates an instance of a Ninja object when a new player opens the game.
	The new Ninja object is then added to the list of players currently in the
	game.

	USERNAME TO TAKE PLACE OF ninja VARIABLE NAME
	*/ 
	var ninja = new Ninja(bounds);
	playerList.push(ninja);

	// PLACEHOLDER ENEMY TO TEST PLAYER INTERACTION
	var enemy = new Enemy();
	enemyPos = enemy.CreateEnemy();
	enemy.animateEnemy();

	/*
	The value of the scrollHeight is set to be the current height of the body element.
	Is used to set the limit of the random y coordinated that is generated by RandomLoc().
	*/
	var scrollHeight = document.querySelector("body").scrollHeight



	/*
	Returns an object containing a randomly generated x and y coordinate within the
	boundaries of the screen. Is used to generate a random position for each new coin.
	*/
	function RandomLoc() {
		randPos = {x: Math.floor(Math.random() * document.body.clientWidth), y: Math.floor(Math.random() * scrollHeight)}
		return randPos;    
	}

	/*
	Creates an object for each wall obstacle in the game space. Each object has an
	x, y, z, and w coordinate. z coordinate is the x coordinate plus the width of
	the wall and w coordinate is the y coordinate plus the height of the object.
	This gives four points defining the position of the wall, allowing for collision
	between the player and the wall to be detected.
	*/
	var wallOne = {	id: "wallOne",
					class: "xWall",
					x: document.getElementById("wall1").getBoundingClientRect().x - document.getElementById("wall1").clientWidth,
					y: document.getElementById("wall1").getBoundingClientRect().y,
					z: document.getElementById("wall1").getBoundingClientRect().x + document.getElementById("wall1").clientWidth,
					w: document.getElementById("wall1").getBoundingClientRect().y + document.getElementById("wall1").clientHeight};
	var wallTwo = {	id: "wallTwo",
					class: "yWall",
					x: document.getElementById("wall2").getBoundingClientRect().x - document.getElementById("wall2").clientHeight,
					y: document.getElementById("wall2").getBoundingClientRect().y - document.getElementById("wall2").clientHeight,
					z: document.getElementById("wall2").getBoundingClientRect().x + document.getElementById("wall2").clientWidth,
					w: document.getElementById("wall2").getBoundingClientRect().y + document.getElementById("wall2").clientHeight};
	var wallThree = {	id: "wallThree",
					class: "yWall",
					x: document.getElementById("wall3").getBoundingClientRect().x - document.getElementById("wall3").clientHeight,
					y: document.getElementById("wall3").getBoundingClientRect().y - document.getElementById("wall3").clientHeight,
					z: document.getElementById("wall3").getBoundingClientRect().x + document.getElementById("wall3").clientWidth,
					w: document.getElementById("wall3").getBoundingClientRect().y + document.getElementById("wall3").clientHeight};
	var wallFour = {	id: "wallFour",
					class: "xWall",
					x: document.getElementById("wall4").getBoundingClientRect().x - document.getElementById("wall4").clientWidth,
					y: document.getElementById("wall4").getBoundingClientRect().y,
					z: document.getElementById("wall4").getBoundingClientRect().x + document.getElementById("wall4").clientWidth,
					w: document.getElementById("wall4").getBoundingClientRect().y + document.getElementById("wall4").clientHeight};

	// Empty list to store the coin objects that are auto generated
	var coinList = []
	var walls = [wallOne, wallTwo, wallThree, wallFour];
	// Count introduced to give each coin a unique ID
	var count = 0;
	
	setInterval(() => {
		count ++;
		var newX = RandomLoc().x;
		var newY = RandomLoc().y;
		console.log("newX: " + newX);
		console.log("newY: " + newY);
		if(newX < wallOne.x || newX > wallOne.x + 25 || newY < wallOne.y
			&& newY > wallTwo.y || newY < wallTwo.w || newX < wallTwo.x
			&& newX < wallFour.x || newX > wallFour.x + 25 || newY < wallFour.y
			&& newY > wallThree.y || newY < wallThree.w || newX < wallThree.x) {
			console.log("In coin loop")
			coinList.push(new Coin(newX, newY, count));
		}
	}, 4000);

	// use typeOf to identify what player collided with
	function CoinCollision(i) {
		var coinId = i.getId();
		if(document.getElementById(coinId)) {
			document.getElementById(coinId).remove();
			score += 10;
			document.getElementById("scoreBoard").innerHTML = "Score: " + score;
		}
    }

	function keyDown(i) {
		playerPos = movePlayer(i, ninja);
		coinList.forEach(CollisionCheck);
		walls.forEach(wallCollision);
		playerCollision(i);

		
		return playerPos;
		
	}

	function CollisionCheck(c) {
		if((playerPos.x + 90.75> c.getX() && playerPos.x < c.getZ()
			&& c.getY() > playerPos.y && c.getW() < playerPos.y + 114.5)){
                col = true;
                CoinCollision(c);
		}
	}

	function wallCollision(w) {
		if(w.class === "xWall" && axis === "x" && dir.x === 1 && playerPos.x + 90.75 > w.x && playerPos.x < w.z && playerPos.y + 114.5 > w.y && playerPos.y < w.w) {
			console.log("First condition triggered")
			col = true;
			var dx = (playerPos.x + 90.75) - w.x;
			ninja.setX(dx);
		}
		if(w.class === "xWall" && axis === "x" && dir.x === -1 && playerPos.x < w.z && playerPos.x > w.x && playerPos.y + 114.5 > w.y && playerPos.y < w.w) {
			console.log("Second condition triggered")
			var dx = 1 - (w.z - playerPos.x);
			ninja.setX(dx);
		}
		if(w.class === "yWall" && axis === "y" && dir.y === 1 && playerPos.x + 90.75 > w.x && playerPos.x < w.z && playerPos.y + 114.5 > w.y && playerPos.y < w.w) {
			console.log("Third condition triggered")
			var dy = (playerPos.y + 114.5) - w.y;
			ninja.setY(dy);
		}
		if(w.class === "yWall" && axis === "y" && dir.y === -1 && playerPos.x + 90.75 > w.x && playerPos.x < w.z && playerPos.y < w.w && playerPos.y > w.y) {
			console.log("Fourth condition triggered")
			var dy = playerPos.y - w.w ;
			ninja.setY(dy);
		}
		if(w.class === "xWall" && axis === "y" && dir.y === -1 && playerPos.x + 90.75 > w.z && playerPos.x < w.x && playerPos.y < w.w && playerPos.y > w.y) {
			console.log("Fifth condition triggered")
			console.log("PlayerPosX: " + (playerPos.x + 90.75));
			console.log("PlayerPosY: " + playerPos.y);
			console.log("WallID: " + w.id);
			console.log("WallX: " + w.x)
			console.log("WallY: " + w.y)
			console.log("WallZ: " + w.z)
			console.log("WallW: " + w.w)
			var dy = playerPos.y - w.w ;
			ninja.setY(dy);
		}
		if(w.class === "yWall" && axis === "x" && dir.x === 1 && playerPos.x + 90.75 > w.x && playerPos.y < w.y && playerPos.y + 114.5 > w.w) {
			console.log("Sixth condition triggered")
			var dx = (playerPos.x + 90.75) - w.x;
			ninja.setX(dx);
		}
	}

	function playerCollision(i) {
		if((playerPos.x +90.75) > enemyPos.x && playerPos.y >= enemyPos.y
		&& playerPos.y + 114.5 <= (enemyPos.w - 50) && String.fromCharCode(i.keyCode) == " "){
			console.log("Collision enemy")
			Collision("enemy");
	}

	function Collision(i) {
		document.getElementById(i).className = "hide";
    }
		
}

	function keyUp(i) {
		clearInterval();
	}

	document.onkeydown = keyDown;

	document.onkeyup = keyUp;
}


window.onload = gameMenu;


