var ctx = document.getElementById("ctx").getContext("2d");
var socket = io();

socket.on("newPositions", function (data) {
  ctx.clearRect(0, 0, 500, 500);
  for (var i = 0; i < data.player.length; i++) {
    ctx.beginPath();
    ctx.arc(data.player[i].x, data.player[i].y, 20, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.fillStyle = "blue";
  for (var i = 0; i < data.bullet.length; i++)
    ctx.fillRect(data.bullet[i].x + 5, data.bullet[i].y, 10, 10);
});
// standard movement listner
document.onkeydown = function (event) {
  if (event.keyCode === 68)
    // d
    socket.emit("keyPress", { inputId: "right", state: true });
  else if (event.keyCode === 83)
    // s
    socket.emit("keyPress", { inputId: "down", state: true });
  else if (event.keyCode === 65)
    // a
    socket.emit("keyPress", { inputId: "left", state: true });
  else if (event.keyCode === 87)
    // w
    socket.emit("keyPress", { inputId: "up", state: true });
};
// should probably use a case switch
document.onkeyup = function (event) {
  if (event.keyCode === 68)
    //d
    socket.emit("keyPress", { inputId: "right", state: false });
  else if (event.keyCode === 83)
    //s
    socket.emit("keyPress", { inputId: "down", state: false });
  else if (event.keyCode === 65)
    // a
    socket.emit("keyPress", { inputId: "left", state: false });
  else if (event.keyCode === 87)
    // w
    socket.emit("keyPress", { inputId: "up", state: false });
};
// listens for the mouse click to launch the bullet attack
document.onmousedown = function (event) {
  socket.emit("keyPress", { inputId: "attack", state: true });
};
// uses mouse positon relative to the center of the page
// THIS WILL CAUSE ISSUES
// will be Psudo fixed by centering the game sapce on character
// but once reaching the side of the map issues with targetting emmerge
document.onmouseup = function (event) {
  socket.emit("keyPress", { inputId: "attack", state: false });
};
document.onmousemove = function (event) {
  var x = -250 + event.clientX - 8;
  var y = -250 + event.clientY - 8;
  var angle = (Math.atan2(y, x) / Math.PI) * 180;
  socket.emit("keyPress", { inputId: "mouseAngle", state: angle });
};
