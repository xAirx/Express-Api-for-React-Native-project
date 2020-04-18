const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// hash and salt is automatically added by passportLocalMongooose.
var passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	admin: {
		type: Boolean,
		default: false
	},
	facebookId: String
});

// Using schema and model with passport localmongoose.
// Adding hash storage of password hash and salt.
// additional methods for passport authentication.

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);