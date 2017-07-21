var express = require('express');
var path = require('path');
var multer  = require('multer');
var countries = require('country-data').countries;
var upload = multer({ dest: 'uploads/' });
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require("passport-local-mongoose");
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
var User = require("./models/user");


// =====================
// Require Routes
// =====================
var routes = require("./routes/index");

var port = process.env.PORT || 4000;


// APP CONFIG
mongoose.connect("mongodb://Middi:youandme123@ds161022.mlab.com:61022/contacts");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

app.use(routes);


// =====================
// Check logged in
// =====================
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


// Start Server
app.listen(port, function () {
    console.log('server started on port 4000');
});
