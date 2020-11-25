var express = require('express');
var router = express.Router();
var db = require('./database');

//display registration 
router.get('/register', function(req, res, next) {
    res.render('modal-body');
});

//register
router.post('/register', function(req, res) {
    inputData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        //check email
    var sql = 'SELECT * FROM user WHERE email address = ?';
    db.query(sql, [inputData.email], function(err, data, fields) {
        if (err) throw err;
        if (data.length > 1) {
            var msg = inputData.email + "already exists";
        } else {
            //save user into database
            var sql = 'INSERT INTO user SET ?';
            db.query(sql, inputData, function(err, data) {
                if (err) throw err;
            });
            var msg = "Registration successful."
        }
        res.render('modal-body', { alertMsg: msg });
    })
});

module.exports = router;
