var mongoose = require('mongoose');


// Schema Setup
var contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    number: String,
    country: String,
    avatar: String
});

module.exports = mongoose.model('Contact', contactSchema);