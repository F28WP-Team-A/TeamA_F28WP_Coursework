const express = require('express');
const db = require('database.js'); //fix route
const router = express.Router;

const bcrypt = require('bcrypt');
const saltRounds = 10

const app = express();


//register
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //hashed password 
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }

        db.query(
            'INSERT INTO user (username, password) VALUES (?, ?)', [username, password],
            (err, result) => {
                console.log(err);
            }
        );
    });
});

//login
app.post('\login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        'SELECT * FROM user WHERE username = ?;',
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                //first element of result
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        res.send(result)
                    } else {
                        res.send({ message: 'Incorrect username and password.' });
                    }
                });
            } else {
                res.send({ message: 'User does not exist.' });
            }
        }
    );
});
