// global variables that are called upon to generate the game
require("./Properties/Player.js");
require("./Properties/Entity.js");
require("./Properties/Bullet.js");
require("./Properties/Shield.js");

// creates a list of players
Player.list = {};
Player.onConnect = function (socket) {
  var player = Player(socket.id);
  socket.on("keyPress", function (data) {
    if (data.inputId === "left") player.pressingLeft = data.state;
    else if (data.inputId === "right") player.pressingRight = data.state;
    else if (data.inputId === "up") player.pressingUp = data.state;
    else if (data.inputId === "down") player.pressingDown = data.state;
    else if (data.inputId === "attack") player.pressingAttack = data.state;
    else if (data.inputId === "mouseAngle") player.mouseAngle = data.state;
    else if (data.inputId === "space") player.pressingShield = data.state;
  });

  socket.emit("init", {
    playerId: socket.id,
    player: Player.getAllInitPack(),
    bullet: Bullet.getAllInitPack(),
    shield: Shield.getAllInitPack()
  });
};
Player.getAllInitPack = function () {
  var players = [];
  for (var i in Player.list) players.push(Player.list[i].getInitPack());
  return players;
};

Player.onDisconnect = function (socket) {
  delete Player.list[socket.id];
  removePack.player.push(socket.id);
};
Player.update = function () {
  var pack = [];
  for (var i in Player.list) {
    var player = Player.list[i];
    player.update();
    pack.push(player.getUpdatePack());
  }
  return pack;
};
initPack = { player: [], bullet: [], shield: [] };
removePack = { player: [], bullet: [], shield: [] };
