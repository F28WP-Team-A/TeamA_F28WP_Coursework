
var express = require("express");
var app = express();
var serv = require("http").Server(app);
var io = require("socket.io")(serv, {});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Client/index.html");
});
app.use("/Client", express.static(__dirname + "/Client"));

serv.listen(8080);
console.log("Server started.");

var SOCKET_LIST = {};
// creats a variable of enitiy
// almost everything can be defined as an entity
// has a position x and y on the canvas
// has a speed x and speed Y
// and has a id which is declared for each other variable
var Entity = function () {
  var self = {
    x: 250,
    y: 250,
    spdX: 0,
    spdY: 0,
    id: ""
  };
  self.update = function () {
    self.updatePosition();
  };
  self.updatePosition = function () {
    self.x += self.spdX;
    self.y += self.spdY;
  };
  self.getDistance = function (pt) {
    return Math.sqrt(Math.pow(self.x - pt.x, 2) + Math.pow(self.y - pt.y, 2));
  };
  return self;
};
// Player 'class' not currently coded as a class
// pressingRight left up down is for movement auto set to false
// pressingAttack is for shooting the bullets
// but using the same code i am also going to add a aditional trigger on pressing a
// that swings a "sword" 
var Player = function (id) {
  var self = Entity();
  self.id = id;
  self.number = "" + Math.floor(10 * Math.random());
  self.pressingRight = false;
  self.pressingLeft = false;
  self.pressingUp = false;
  self.pressingDown = false;
  self.pressingAttack = false;
  self.mouseAngle = 0;
  self.maxSpd = 10;
  self.hp = 10;
  self.maxHp = 10;
  self.score = 10;
// updates the html code
  // with movement and bullet creation on mouseclick
  var super_update = self.update;
  self.update = function () {
    self.updateSpd();
    super_update();
// mouseAngle has a slight issue in that it uses the middle of the canvas as the aiming area will be fixed once 
    // i center the objects
    if (self.pressingAttack) {
      self.shootBullet(self.mouseAngle);
    }
  };
// shoots bullet at the position of the player
  self.shootBullet = function (angle) {
    var b = Bullet(self.id, angle);
    b.x = self.x;
    b.y = self.y;
  };
// modifies the players speed in a direction depending upon button presses
// this also allows for gravity 
  // by placing a + modifier on self.spdyY
  self.updateSpd = function () {
    if (self.pressingRight) self.spdX = self.maxSpd;
    else if (self.pressingLeft) self.spdX = -self.maxSpd;
    else self.spdX = 0;

    if (self.pressingUp) self.spdY = -self.maxSpd;
    else if (self.pressingDown) self.spdY = self.maxSpd;
    else self.spdY = 0;
  };
  Player.list[id] = self;
  return self;
};
// holds a list of Player functions
Player.list = {};
// detects player connection the instantiates a player model
// which then allows for movement and attacks
//
Player.onConnect = function (socket) {
  var player = Player(socket.id);
  socket.on("keyPress", function (data) {
    if (data.inputId === "left") player.pressingLeft = data.state;
    else if (data.inputId === "right") player.pressingRight = data.state;
    else if (data.inputId === "up") player.pressingUp = data.state;
    else if (data.inputId === "down") player.pressingDown = data.state;
    else if (data.inputId === "attack") player.pressingAttack = data.state;
    else if (data.inputId === "mouseAngle") player.mouseAngle = data.state;
  });
};
Player.onDisconnect = function (socket) {
  delete Player.list[socket.id];
};

Player.update = function () {
  var pack = [];
  for (var i in Player.list) {
    var player = Player.list[i];
    player.update();
    pack.push({
      x: player.x,
      y: player.y,
      number: player.number,
      hp: player.hp,
      maxHp: player.maxHp,
      score: player.score
    });
  }
  return pack;
};
// the Bullet enitiy has a parent to prevent from shooting its creator
// id set to random 
// spdX and spdY are there define the spawning area from which the bullets are shot
var Bullet = function (parent, angle) {
  var self = Entity();
  self.id = Math.random();
  self.spdX = Math.cos((angle / 180) * Math.PI) * 10;
  self.spdY = Math.sin((angle / 180) * Math.PI) * 10;

  self.parent = parent;
// this removes bullets from the game
  self.timer = 0;
  self.toRemove = false;
  var super_update = self.update;
  self.update = function () {
    if (self.timer++ > 30) self.toRemove = true;
    super_update();
// player collison shouldnt hard code a distance but it works for now
    // will change when i refactor this for tommorow
    for (var i in Player.list) {
      var p = Player.list[i];
      if (self.getDistance(p) < 32 && self.parent !== p.id) {
        self.toRemove = true;
      }
    }
  };
  Bullet.list[self.id] = self;
  return self;
};
// holds a list of bullets
Bullet.list = {};
// Bullet.update same as Player.update
// 
Bullet.update = function () {
  var pack = [];
  for (var i in Bullet.list) {
    var bullet = Bullet.list[i];
    bullet.update();
    if (bullet.toRemove) delete Bullet.list[i];
    else
      pack.push({
        x: bullet.x,
        y: bullet.y
      });
  }
  return pack;
};
// upon detecting a connection creates a socket_id and gives it a random number
// random number was used in earlier testing and could probably be removed
io.sockets.on("connection", function (socket) {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  Player.onConnect(socket);

  socket.on("disconnect", function () {
    delete SOCKET_LIST[socket.id];
    Player.onDisconnect(socket);
  });
});
// game loop that sends the Player and Bullet packages (pack)
setInterval(function () {
  var pack = {
    player: Player.update(),
    bullet: Bullet.update()
  };

  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit("newPositions", pack);
  }
}, 1000 / 25);
