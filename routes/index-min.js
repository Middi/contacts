var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Contact = require("../models/contacts");
var middleware = require("../middleware");


// INDEX ROUTE Show all contacts
router.get('/', function(req, res){
    //get contacts from DB
    Contact.find({}, function(err, allContacts){
        if(err){
            console.log(err);
        }
        else {
            res.render('index', {
                contact: allContacts
            });
        }
    });
});


// CREATE - Add new campground to database
router.post('/', function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var number = req.body.number;
    var avatar = req.body.avatar;
    var newContact = {firstName: firstName, lastName: lastName, number: number, avatar: avatar};

    Contact.create(newContact, function(err, newlyCreated){
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
    
});


// ======================
// AUTH ROUTES
// ======================

// show register form
// router.get('/register', function(req, res){
//    res.render('register'); 
// });


// router.post('/register', function(req, res){
//     User.register(new User({username: req.body.username}), req.body.password, function(err, user){
//         if(err){
//         //   req.flash("error", err.message);
//           return res.redirect("register");
//         }
//         passport.authenticate("local")(req, res, function(){
//             // req.flash("success", "You are now Signed up " + user.username);
//             res.redirect("/");
//         });
//     });
// });


// // Show login form

// router.get("/login", function(req, res){
//     res.render("login");
// });

// router.post("/login", passport.authenticate("local",
//     {
//         successRedirect: "/",
//         failureRedirect: "/login"
//     }), function(req, res){
        
// });


// // Log Out Logic
// router.get("/logout", function(req, res){
//    req.logout();
// //    req.flash("success", "logged you out");
//    res.redirect('/');
// });


module.exports = router;

