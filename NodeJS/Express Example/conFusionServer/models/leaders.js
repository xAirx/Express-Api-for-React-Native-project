const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;

var feedbackSchema = new Schema({
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}
}, {
		timestamps: true
	});

var leadersSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	image: {
		type: String,
		required: true
	},
	designation: {
		type: String,
		required: true
	},
	abbr: {
		type: String,
		required: true
	},
	featured: {
		type: Boolean,
		default: false
	},
	description: {
		type: String,
		required: true
	},
	feedback: [feedbackSchema]
}, {
		timestamps: true
	});




var Leaders = mongoose.model('Leader', leadersSchema);

module.exports = Leaders;