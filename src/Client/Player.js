var ctx = document.getElementById("ctx").getContext("2d");
var socket = io();
ctx.font = "30px Arial";
var Images = {};
var Width = 500;
var Height = 500;
// ship image from https://opengameart.org/content/space-ship-construction-kit
// is open source
Images.player = new Image();
Images.player.src = "/Client/Images/Ship.png";
// missile image is from https://opengameart.org/content/2d-space-ships-pack-war-antuz-race
// is open source
Images.missile = new Image();
Images.missile.src = "/Client/Images/bonus-04.png";
// map image is from https://opengameart.org/content/4-large-planets
// is open source
Images.map = new Image();
Images.map.src = "Client/Images/double_planet.png";
// shield image is from https://opengameart.org/content/2d-space-ships-pack-war-antuz-race
// is open source
Images.shield = new Image();
Images.shield.src = "Client/Images/Shield-a-11.png";

// calls for several variables from the player object on the server
// and creates an initial Player object for the client
// has a id to determine the individual players score
// and hp shows the hp bars

// code comes from https://www.youtube.com/watch?v=mpwkD9-rDnc&list=PLcIaPHraYF7k4FbeGIDY-1mZZdjTu9QyL&index=10
var Player = function (initPack) {
  var self = {};
  self.id = initPack.id;
  self.number = initPack.number;
  self.x = initPack.x;
  self.y = initPack.y;
  self.hp = initPack.hp;
  self.hpMax = initPack.hpMax;
  self.score = initPack.score;
  // a draw function for each Player
  self.draw = function () {
    var hpWidth = (30 * self.hp) / self.hpMax;
    // changes the canvas by keeping the player in the center
    // by making it so that the x and y variables change to keep the ship
    // in the midle of the screen
    var x = self.x - Player.list[playerId].x + Width / 2;
    var y = self.y - Player.list[playerId].y + Height / 2;
    // shrinks the ship image as it was to large
    var width = Images.player.width / 3;
    var height = Images.player.height / 3;
    // uses the canvas drawImage https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(
      Images.player,
      0,
      0,
      Images.player.width,
      Images.player.height,
      x - width / 2,
      y - height / 2,
      width,
      height
    );
    ctx.fillStyle = "green";
    ctx.fillRect(x - hpWidth / 2, y - 40, hpWidth, 4);
  };

  Player.list[self.id] = self;

  return self;
};
// creates a list of players
Player.list = {};
// does the same thing for the Bullets as for the players
var Bullet = function (initPack) {
  var self = {};
  self.id = initPack.id;
  self.x = initPack.x;
  self.y = initPack.y;

  self.draw = function () {
    var width = Images.missile.width / 2;
    var height = Images.missile.height / 2;

    var x = self.x - Player.list[playerId].x + Width / 2;
    var y = self.y - Player.list[playerId].y + Height / 2;

    ctx.drawImage(
      Images.missile,
      0,
      0,
      Images.missile.width,
      Images.missile.height,
      x - width / 2,
      y - height / 2,
      width,
      height
    );
  };

  Bullet.list[self.id] = self;
  return self;
};
Bullet.list = {};

var playerId = null;
// list of player Id's to generate the score
// and max score
Player.list[playerId];
// listens for the init package and creates a new bullet and player
// object
socket.on("init", function (data) {
  if (data.playerId) playerId = data.playerId;
  for (var i = 0; i < data.bullet.length; i++) {
    new Bullet(data.bullet[i]);
  }
  for (var i = 0; i < data.player.length; i++) {
    new Player(data.player[i]);
  }
});
// listens for the update package
socket.on("update", function (data) {
  for (var i = 0; i < data.player.length; i++) {
    var pack = data.player[i];
    var p = Player.list[pack.id];
    // checks if the player hasnt disconnected
    // and then updates they're health and position
    if (p) {
      if (pack.x !== undefined) p.x = pack.x;
      if (pack.y !== undefined) p.y = pack.y;
      if (pack.hp !== undefined) p.hp = pack.hp;
      if (pack.score !== undefined) p.score = pack.score;
    }
  }
  // checks if the bullet still exists and then updates it's health and position

  for (var i = 0; i < data.bullet.length; i++) {
    var pack = data.bullet[i];
    var b = Bullet.list[data.bullet[i].id];
    if (b) {
      if (pack.x !== undefined) b.x = pack.x;
      if (pack.y !== undefined) b.y = pack.y;
    }
  }
});
// works to remove the Players when they disconnect
// and the bullets
socket.on("remove", function (data) {
  for (var i = 0; i < data.player.length; i++) {
    delete Player.list[data.player[i]];
  }
  for (var i = 0; i < data.bullet.length; i++) {
    delete Bullet.list[data.bullet[i]];
  }
});
// shows the player there score
var playerScore = function () {
  ctx.fillText(Player.list[playerId].score, 0, 70);
};
// creates the map background
var map = function () {
  var x = Width / 2 - Player.list[playerId].x;
  var y = Height / 2 - Player.list[playerId].y;
  ctx.drawImage(Images.map, x, y);
};
// uses the drawing functions made earlyer
setInterval(function () {
  ctx.clearRect(0, 0, 500, 500);
  map();
  playerScore();
  for (var i in Player.list) Player.list[i].draw();
  for (var i in Bullet.list) Bullet.list[i].draw();
}, 40);
document.onkeydown = function (event) {
  switch (event.Keycode) {
    case 68:
      socket.emit("keyPress", { inputId: "right", state: true });
      break;
    case 83:
      socket.emit("keyPress", { inputId: "down", state: true });
      break;
    case 65:
      socket.emit("keyPress", { inputId: "left", state: true });
      break;
    case 87:
      socket.emit("keyPress", { inputId: "up", state: true });
      break;
  }
};
// movement logic comes from https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b
document.onkeyup = function (event) {
  switch (event.Keycode) {
    case 68:
      socket.emit("keyPress", { inputId: "right", state: false });
      break;
    case 83:
      socket.emit("keyPress", { inputId: "down", state: false });
      break;
    case 65:
      socket.emit("keyPress", { inputId: "left", state: false });
      break;
    case 87:
      socket.emit("keyPress", { inputId: "up", state: false });
      break;
  }
};
/* document.onkeydown = function (event) {
  if (event.keyCode === 68)
    //d
    socket.emit("keyPress", { inputId: "right", state: true });
  else if (event.keyCode === 83)
    //s
    socket.emit("keyPress", { inputId: "down", state: true });
  else if (event.keyCode === 65)
    //a
    socket.emit("keyPress", { inputId: "left", state: true });
  else if (event.keyCode === 87)
    // w
    socket.emit("keyPress", { inputId: "up", state: true });
};

document.onkeyup = function (event) {
  if (event.keyCode === 68)
    //d
    socket.emit("keyPress", { inputId: "right", state: false });
  else if (event.keyCode === 83)
    //s
    socket.emit("keyPress", { inputId: "down", state: false });
  else if (event.keyCode === 65)
    //a
    socket.emit("keyPress", { inputId: "left", state: false });
  else if (event.keyCode === 87)
    // w
    socket.emit("keyPress", { inputId: "up", state: false });
};
*/
document.onmousedown = function (event) {
  socket.emit("keyPress", { inputId: "attack", state: true });
};
document.onmouseup = function (event) {
  socket.emit("keyPress", { inputId: "attack", state: false });
};
document.onmousemove = function (event) {
  var x = -250 + event.clientX - 8;
  var y = -250 + event.clientY - 8;
  var angle = (Math.atan2(y, x) / Math.PI) * 180;
  socket.emit("keyPress", { inputId: "mouseAngle", state: angle });
};
