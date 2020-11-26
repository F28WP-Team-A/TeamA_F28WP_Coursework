var express = require("express");
var app = express();
var serv = require("http").Server(app);
var io = require("socket.io")(serv, {});

// this is calls on global variables
// fine for small code bases such as this
require("./Server/Game.js");
//
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Client/index.html");
});
app.use("/Client", express.static(__dirname + "/Client"));

serv.listen(8080);
console.log("Server started.");
// creates a list of SOCKET connections
var SOCKET_LIST = {};

io.sockets.on("connection", function (socket) {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  Player.onConnect(socket);

  socket.on("disconnect", function () {
    delete SOCKET_LIST[socket.id];
    Player.onDisconnect(socket);
  });
});
// the game loop
// creates a initial package (init)that is sent to a client when they first connect
// containing all of the games sprites maxHp and other elements that dont realy change
// then each 40 miliseconds sends the update package containing player position current health
// and score the remove function is to disconnect players and delete bullets after they time out
setInterval(function () {
  var pack = {
    player: Player.update(),
    bullet: Bullet.update(),
    shield: Shield.update()
  };

  for (var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit("init", initPack);
    socket.emit("update", pack);
    socket.emit("remove", removePack);
  }
  // this resets the update package to prevent duplication errors
  initPack.player = [];
  initPack.bullet = [];
  initPack.shield = [];
  removePack.player = [];
  removePack.bullet = [];
  removePack.shield = [];
}, 1000 / 25);
