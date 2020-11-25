var express = require('express');
var router = express.Router();
var db = require('./database');

//get user listing
router.get('/login', function(req, res, next) {
    res.render('login-modal');
});

router.post('/login', function(req, res) {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    var sql = 'SELECT * FROM user WHERE email = ? AND username = ? AND password = ?';
    db.query(sql, [email, username, password], function(err, data, fields) {
        if (err) throw err
        if (data.length > 0) {
            req.session.loggedInUser = true;
            req.session.email = email;
            req.session.username = username;
            res.redirect('/login');
        } else {
            res.render('login-modal', { alertMsg: "Incorrect email address or password." });
        }
    })
});

module.exports = router;
