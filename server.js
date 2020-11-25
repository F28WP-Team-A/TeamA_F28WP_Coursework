var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var app = express();
var http = require("http").createServer(app);

var io = require("socket.io")(http);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Melstar1",
  database: "nodelogin",
});

app.use(
  session({
    secret: "sec",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* linking the public folder */
app.use(express.static(__dirname + "/public"));

/* linking the login html page */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

app.post("/auth", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email && password) {
    connection.connect();

    connection.query(
      "SELECT * FROM accounts WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        console.log(results);
        if (results && results.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          res.redirect("/play");
        } else {
          res.send("Incorrect email or password.");
        }
        res.end();
      }
    );

    connection.end();
  } else {
    res.send("Enter email and password.");
    res.end();
  }
});

// /* linking the game state html page */
// app.get("/play", (req, res) => {
//   res.sendFile(__dirname + "/client/index.html");
// });

app.get("/play", (req, res) => {
  if (req.session.loggedin) {
    res.send("Welcome " + req.session.email);
  } else {
    res.send("Please login");
  }
  res.end();
});

/* login page hosted on local host 3000 */
http.listen(3000, () => {
  console.log("listening on *:3000");
});
