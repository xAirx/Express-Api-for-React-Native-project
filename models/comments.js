const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);


var commentSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	dishes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Dish'
	}],
	Dishid: {type:Number},
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
	},
}, {
		timestamps: true
	});

var Comments = mongoose.model('comments', commentSchema);

module.exports = Dishes;