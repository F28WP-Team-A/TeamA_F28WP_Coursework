const express = require('express');
const mysql = require('mysql');

//Create connection
const dbase = mysql.createConnection({
    host: 'sql2.freesqldatabase.com',
    user: 'sql2377223',
    password: 'nL5%wM4!',
    database: 'sql2377223'
});

let out = "";

//Connect to database
dbase.connect(function(err) {
    if (err) throw err;
    console.log('Connected.');
});

dbase.query("drop table user;", function(err, result) {
    console.log(result);
    // fail if table is already created
    out += "drop table:" + err + "\n";
});

//Create table
var sql = 'CREATE TABLE user (username VARCHAR(250) NOT NULL, password VARCHAR(250) NOT NULL, highscore int, PRIMARY KEY (username))';
dbase.query(sql, function(err, result) {
    if (err) throw err;
    console.log("User table created.");
});


const app = express();

app.listen('3000', () => {
    console.log('Server started port 3000');
});