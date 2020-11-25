const db = require('./database.js');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var mysql = require('mysql');
const { response } = require('express');

var erw = require('./public/log.html');

var app = express();

app.use(session({
    secret: 'sec',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/log.html'));
});

app.post('/auth', function(req, res) {
    //var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], function(err, result, fields) {
            if (result.length > 0) {
                req.session.loggedin = true;
                req.session.email = email;
                //response.redirect('/...')
            } else {
                response.send('Incorrect email or password.');
            }
            response.end();
        });
    } else {
        response.send('Enter email and password.');
        response.end();
    }
});


app.listen(3000);
