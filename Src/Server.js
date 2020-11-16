// dependencies
// i should use const to declaire these as constants
var express = require("express");
var http = require("http");
var path = require("path");
var socketio = require("socket.io");

var app = express();
var server = http.Server(app);
var io = socketio(server);

// 
app.set("port", 8080);
app.use("/static", express.static(__dirname + "/static"));

// routing
app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "index.html"));
});

// starts the server
server.listen(8080, function () {
  console.log("starting server on port 8080");
});
// creates a variable for players 
var players = {};
// server listens for a new connection to instantiate a new player by using the id of they're conection
// this is fine for people without accounts will need to do something different if you have an account

io.on("connection", function (socket) {
  socket.on("new player", function () {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  // once a player object has been instatuated the server then listens for key presses that come from the 
  // socket.id it then perfoms those key presses
  socket.on("movement", function (data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
  });
});
// this allows all players to see eachother
setInterval(function () {
  io.sockets.emit("state", players);
}, 1000 / 60);
// this is to disconect a player once they are finished and close the window
io.on("connection", function (socket) {
  socket.on("disconnect", function () {
    delete players[socket.id];
  });
});
