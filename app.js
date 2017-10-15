var express = require('express');
var path = require('path');
var multer  = require('multer');
var countries = require('country-data').countries;
const dotenv = require('dotenv');
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


/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

var port = process.env.PORT || 4000;


// APP CONFIG
// TODO: put this is a .env file
mongoose.connect(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json('*/*'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));


// PASSPORT CONFIGURATION
// TODO: put session secret in .env file
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
    console.log('server started on port', port);
});
