var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var app = express();
var http = require("http").createServer(app);
var bcrypt = require("bcrypt");
var cookieSession = reequire('cookie-session');
const saltRounds = 10;

var io = require("socket.io")(http);

/* database connection */
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodelogin",
});


app.use(
  session({
    secret: "sec",
    resave: true,
    saveUninitialized: true,
  })
);

/* Cookie - expires after 1 hour
app.use(cookieSession({
    name: 'session',
    secret: 'saddflF28WPakdks',
    maxAge:  3600 * 1000 //
}));
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* linking the public folder */
app.use(express.static(__dirname + "/public"));

/* linking the login html page */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login/login.html");
});

/* post request */
app.post("/auth", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  
 /* for hashing a password
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
        throw err;
    } else {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                throw err;
            } else {
                console.log(hash)
            }
        })
    }
});
*/

  if (email && password) {
    connection.connect();
    
    //bcrypt.hash(password, salt (err, hash) {

    /* query database */
    connection.query(
      //security
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
      };
      //})
    );

    connection.end();
  } else {
    res.send("Enter email and password.");
    res.end();
  }
});

/* promt login success message */
app.get("/play", (req, res) => {
  if (req.session.loggedin) {
    res.send("Welcome " + req.session.email);
  } else {
    /* linking the game state html page */
    app.get("/play", (req, res) => {
      res.sendFile(__dirname + "/client/index.html");
    });
  }
  res.end();
});

/* login page hosted on local host 3000 */
http.listen(3000, () => {
  console.log("listening on *:3000");
});
