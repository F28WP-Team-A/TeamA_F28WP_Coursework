var express = require("express");
var app = express();
var http = require("http").createServer(app);

var io = require("socket.io")(http);

var players = [];
var coins = [];
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

/* change the file path to the correspoding game play one */
app.get("/play", (req, res) => {
  res.sendFile(__dirname + "/public/game/index.html");
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
