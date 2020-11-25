//logs requests
var morgan = require('morgan');

var session = require('express-session');
var express = require('express');

const app = session();

app.use(session({
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


var regRouter = require('./path');
app.use('/', regRouter);

var logRouter = require('./logs');
app.use('/', logRouter);
