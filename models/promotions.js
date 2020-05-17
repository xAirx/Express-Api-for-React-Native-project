const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency;


var promotionsSchema = new Schema({
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
	label: {
		type: String,
		default: ''
	},
	price: {
		type: Currency,
		required: true,
		min: 0
	},
	featured: {
		type: Boolean,
		default: false
	},
});



var Promos = mongoose.model('Promo', promotionsSchema);

module.exports = Promos;