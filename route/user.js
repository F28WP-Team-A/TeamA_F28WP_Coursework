const express = require('express');
const db = require('database.js'); //fix route
const router = express.Router;
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(
    session({
        key: "userId",
        secret: "asdfghjklF28WPlkjhgfdsa",
        resave: false,
        saveUninitialized: false,
        cookie: {
            //cookie expires 24 hours after it's created -- logs user out
            expires: 60 * 60 * 24,
        },
    })
);



//register
app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //hashed password 
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }

        db.query(
            'INSERT INTO user (email, password) VALUES (?, ?)', [email, password],
            (err, result) => {
                console.log(err);
            }
        );
    });
});

//login
app.post('\login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        'SELECT * FROM user WHERE email = ?;',
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                //first element of result
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        //console.log(req.session.user);
                        res.send(result)
                    } else {
                        res.send({ message: 'Incorrect email and password.' });
                    }
                });
            } else {
                res.send({ message: 'User does not exist.' });
            }
        }
    );
});

//starter code
/*
//highscore
app.post('/highscore', isLoggedIn, (req, res) => {


    var currentHighscore = user.Highscore;
    if (currentHighscore < highscore) {
        user.update({ highscore }, {
            where: { username }
        })
    }
})
*/


