const mongoose = require('mongoose');

const records = mongoose.Schema({
	key: {
		type: String
	},
	value: {
		type: String
	},
	createdAt: {
		type: Date
	},
	counts: {
		type: Array
	}
});

module.exports = mongoose.model('records',records);