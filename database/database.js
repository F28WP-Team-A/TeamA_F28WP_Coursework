const express = require('express');
const mysql = require('mysql');


//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbase',
    insecureAuth: true
});

const app = express();
let out = "";


//Connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Database connected.')
});



//Create database
app.get('/createdbase', (req, res) => {
    let sql = 'CREATE DATABASE dbase';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created.')
    });
});

//Drop table if it already exists
db.query("drop table user;", function(err, result) {
    console.log(result);
    // fail if table is already created
    out += "drop table:" + err + "\n";
});

//Create user table
var sql = 'CREATE TABLE user (username VARCHAR(250) NOT NULL, password VARCHAR(250) NOT NULL, highscore int, PRIMARY KEY (username))';
db.query(sql, function(err, result) {
    if (err) throw err;
    console.log("User table created.");
});


/*
app.listen('3000', () => {
    console.log('Server started port 3000');
});
*/
