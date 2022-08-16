'use strict';
var http = require('http');
const express = require('express');
const mongoose = require('mongoose');
var controller = require('./controllers/home');
var login = require('./controllers/login');
var loginpost = require('./controllers/auth');
const session = require('express-session');
var port = process.env.PORT || 1337;
var app = express();
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4', {
    useNewUrlParser: true, useUnifiedTopology: true,
})
    .then(() => {
        console.log('DB is connected')
    })
    .catch(err => {
        console.log(err)
    })
app.get('/', controller.homePage);
app.get('/login', login.login);
app.post('/auth', loginpost.login)
app.get('/register', login.register);
app.post('/regauth', loginpost.register)
app.get('/logout', login.logout)
app.listen(port);
