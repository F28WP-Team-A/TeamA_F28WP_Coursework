var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var mysql = require("mysql");
const { response } = require("express");

// var erw = require("../public/login.html");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodelogin",
});

var app = express();

app.use(
  session({
    secret: "sec",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.sendFile("../public/login/login.html");
});

app.post("/auth", function (req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  if (email && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (result.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          response.redirect("/gamepage");
        } else {
          response.send("Incorrect email or password.");
        }
        response.end();
      }
    );
  } else {
    response.send("Enter email and password.");
    response.end();
  }
});

app.get("/gamepage", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome " + request.session.username);
  } else {
    response.send("Please login");
  }
  response.end();
});

app.listen(3000);
