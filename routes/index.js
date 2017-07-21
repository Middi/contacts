var cloudinary = require('cloudinary');
var countries = require('country-data').countries;
var express = require("express");
var router = express.Router();
var multer = require('multer');
var passport = require("passport");
var User = require("../models/user");
var Contact = require("../models/contacts");
var middleware = require("../middleware");

// File Name extension for Multer
var ext = "";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname)
  }
})
 
var upload = multer({ storage: storage })


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
    ext = req.file.mimetype.replace("image/", ".");
    var avatar = req.file.path;
    var newContact = {firstName: firstName, lastName: lastName, number: number, country: country, avatar: avatar};

    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        Contact.create(newContact, function(err, newlyCreated){
            if(err) {
                console.log(err);
            }
            else {
                res.redirect('/');
            }
        });
    }
    else {
        res.send('File type not supported, use .jpg or .png. Click back to try again');
    }
});


// Edit Campground

router.get("/:id", function(req, res){
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
router.put("/:id", function(req, res){
    Contact.findByIdAndUpdate(req.params.id, function(err, updatedContact){
    if(err){
            res.show('error updating');
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