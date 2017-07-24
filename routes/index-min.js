var path = require('path')
var cloudinary = require('cloudinary');
var Datauri = require('datauri');
var countries = require('country-data').countries;
var express = require("express");
var router = express.Router();
var multer = require('multer');
var passport = require("passport");
var User = require("../models/user");
var Contact = require("../models/contacts");
var middleware = require("../middleware");
var _ = require('lodash');

// File Name extension for Multer
var ext = "";
var upload = multer();

// TODO: Create an account and replace these values with yours
// Probably a good idea to store these in an .env file
// Look up the dontenv package on npm for more details
cloudinary.config({
  cloud_name: 'middi',
  api_key: '963882663421214',
  api_secret: 'F4p7vxCEa-ts7SCLx8Y1iCeJEMA'
});



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


// CREATE - Add new contact to database
router.post('/', upload.single('avatar'), function (req, res, next){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var number = req.body.number;
    var country = req.body.country;
    var avatar = req.file

    var dUri = new Datauri();
    dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
    cloudinary.uploader.upload(dUri.content, function(results) {
      var newContact = {
        firstName: firstName,
        lastName: lastName,
        number: number,
        country: country,
        avatar: results.url
      };
      
      Contact.create(newContact, function(err, newlyCreated){
          if(err) {
              console.log(err);
          }
          else {
              res.redirect('/');
          }
      });
    })
});


// Edit Campground

router.get("/:id", function(req, res){
  // Contact.find({}).lean().exec(function(err, allContacts) {
  //   if (err) return res.send({ success: false, msg: 'Error fetching from db' })
  //   var contactUser = _.find(allContacts, function(contact) {
  //     return contact._id === req.params.id
  //   })
  //   res.render('edit', { contactUser: contactUser, contact: allContacts })
  // })
   Contact.find({}, function(err, allContacts){
        Contact.findById(req.params.id, function(err, contactUser){
        if(err){
            res.send('error editing');
        }
        res.render('edit', {
            contactUser: contactUser,
            contact: allContacts
        });
      });
    });
});


// Update Campground
// TODO: must add update object
router.post("/edit/:id", upload.single('avatar'), function(req, res){
  const { firstName, lastName, country, avatar, number } = req.body
    Contact.findByIdAndUpdate(req.params.id, { firstName, lastName, country, avatar, number }, function(err, updatedContact){
    if(err){
            res.send('error updating');
        }
        else {
            res.redirect('/');
        }
    });
});


// Delete Route
router.delete("/:id", function(req, res){
    Contact.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
           res.send('oops error');
       }
       else {
           res.redirect("/");
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


