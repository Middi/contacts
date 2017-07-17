var mongoose = require('mongoose');

// Schema Setup
var contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    number: String,
});


module.exports = mongoose.model('Contact', contactSchema);