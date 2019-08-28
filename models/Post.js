const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	key: {
		type: String,
		require:true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	totalCount: {
		type: Number,
		require:true
	}
});

module.exports = mongoose.model('Posts',PostSchema);