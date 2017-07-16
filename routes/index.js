var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


// Root route
router.get('/', function(req, res){
   res.render("index"); 
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