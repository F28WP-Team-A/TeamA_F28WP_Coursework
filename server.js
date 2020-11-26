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
  database: "dblogin",
});

/* database sql create command */
/*CREATE DATABASE IF NOT EXISTS `dblogin` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
 USE `dblogin`;

 CREATE TABLE IF NOT EXISTS `accounts` (
   `id` int(11) NOT NULL,
   `username` varchar(50) NOT NULL,
   `password` varchar(255) NOT NULL,
   `email` varchar(100) NOT NULL
 ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

 INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES (1, 'test', 'test', 'test@test.com');

 ALTER TABLE `accounts` ADD PRIMARY KEY (`id`);
 ALTER TABLE `accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
 app.use(
   session({
     secret: "sec",
     resave: true,
     saveUninitialized: true,
   })
 ); */

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
