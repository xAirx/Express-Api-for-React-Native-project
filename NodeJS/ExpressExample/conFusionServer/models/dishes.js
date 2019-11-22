const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


var commentSchema = new Schema({
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
	/* turn the comment field from a string into
	mongoose schema types object ID.
	So, this way, sorry, wrong field.
	I meant to turn the author field into
	mongoose schema types object ID.
	So, the author field now instead of storing a string,
	will have a reference to the user document.
	So, when I turn the author field into this type,
	then the second property that I defined here will be a reference,
	which would be a reference to the user model.
	So, this way, we are now going to be
	connecting this author field and this author field will
	simply store a reference to the ID of the user document,
	instead of storing the details about the author in the form of a name.
	Now when we do that,
	we can use mongoose populate to populate
	this information into our dishes document whenever required. */

	author: {
		type: mongoose.Schema.Types.ObjectId,
		// a refernece to the user model
		ref: 'User'
	}
}, {
		timestamps: true
	});

const dishSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	label: {
		type: String,
		default: ''
	},
	price: {
		type: Currency,
		required: false
	},
	featured: {
		type: Boolean,
		default: false
	},
	comments: [commentSchema]
}, {
		timestamps: true
	});


var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;