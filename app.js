const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");
const bodyParser = require('body-parser');

var port = process.env.PORT || 3000;


// APP CONFIG
mongoose.connect("mongodb://Middi:youandme123@ds161022.mlab.com:61022/contacts");
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Table Plate",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// =====================
// Check logged in
// =====================
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

