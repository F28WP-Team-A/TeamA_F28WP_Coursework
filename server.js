var express = require("express");
var app = express();
var http = require("http").createServer(app);

var io = require("socket.io")(http);

/* linking the public folder */
app.use(express.static(__dirname + "/public"));

/* linking the login html page */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

/* linking the game state html page */
app.get("/play", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

/* login page hosted on local host 3000 */
http.listen(3000, () => {
  console.log("listening on *:3000");
});
