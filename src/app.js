var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/Player/Index.html");
});

app.use("/Player", express.static(__dirname + "/Player"));

server.listen(8080);
console.log("server started");
var Players = {};

io.on("connection", function (socket) {
  socket.on("new player", function () {
    Players[socket.id] = {
      x: 300,
      y: 300
    };
  });
});

setInterval(function () {
  io.sockets.emit("state", Players);
}, 1000 / 60);
