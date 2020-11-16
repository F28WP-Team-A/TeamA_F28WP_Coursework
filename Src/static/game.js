var socket = io();

// creates a variable to hold movement commands in
var movement = {
  up: false,
  down: false,
  left: false,
  right: false
};
// listens for movement commands as a switch function
// i.e if a is pressed return true
// if a and w are both pressed return true
document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener("keyup", function (event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});
// the actual movement function is in server.js 
// to maintain security and prevent a player from cheating

// shows each player to each other 
// checks every second
socket.emit("new player");
setInterval(function () {
  socket.emit("movement", movement);
}, 1000 / 60);

// this is using canvas which is not allowed but i used becuase it was easier to set up this example
var canvas = document.getElementById("canvas");
canvas.width = 800;
canvas.height = 600;

var context = canvas.getContext("2d");
socket.on("state", function (players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = "green";
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});
