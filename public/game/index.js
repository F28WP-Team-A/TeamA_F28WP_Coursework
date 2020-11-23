// const { appendFile } = require("fs");
var app = require("express")();
var http = require("http").createServer(app);

var io = require("socket.io")(http);

var players = [];
var coins = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

let x = 0;

function newPlayer(id) {
  players.push({ id: id, score: 0, pos: { x: x, y: 1 } });
  x = x + 5;
}

function removePlayer(id) {
  players = players.filter((p) => p.id == id);
}

// // if (id.despawnCounter > 0) {
// //   /* show all coins in the area around the player */
// //   for (
// //     let gridx = id.x - XPERIPHERAL - 1;
// //     gridx < id.x + X_PERIPHERAL + 2;
// //     gridx++
// //   ) {
// //     for (
// //       let gridY = id.y - Y_PERIPHERAL - 1;
// //       gridY < id.y + Y_PERIPHERAL + 2;
// //       gridY++
// //     ) {
// //       let cell = _arena.atTile(gridX, gridY);

// //       if (cell != null) {
// //         if (typeOfCell(cell) == "coins") {
// //           // cell is coin
// //           _cell = new coins(cell); // cast to coin
// //           _cell.display(); // display coin
// //         } else if (cell == -2) {
// //           drawRect(
// //             getPlotX(gridX) + currentOffset.x,
// //             getPlotY(gridY) + currentOffset.y,
// //             1,
// //             1,
// //             BLACK
// //           ); // draw grid box
// //         }
// //       }
// //     }
// //   }
// // }

// // /* displays all players*/
// // players.display();

// // for (const ninja of ninjas) {
// //   ninja = new Ninja(id);
// //   ninja.display();
// // }

// // io.nickname = window.location.search;

io.on("connection", (socket) => {
  newPlayer(socket.id);
  //   // appendLi(socket);
  socket.emit("gameState", { players: players, coins: coins });

  socket.on("ninja moved", (msg) => {
    console.log(players);
  });

  socket.on("player moved", (playerId) => {
    console.log(playerId);
  });

  socket.on("disconnect", () => {
    removePlayer(socket.id);
  });

  http.listen(3000, () => {
    console.log("listening on *:3000");
  });

  //   // player =
  //   //   ninjas.find(function (ninja) {
  //   //     return ninja.id == socket.id;
  //   //   }) || player;

  //   // if (player.despawnCounter == 0) {
  //   //   alterPlayer();
  //   //   return;
  //   // }
});
