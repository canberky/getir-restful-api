const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

router.get('/', async (req,res) =>{
	try{
		const posts = await Post.find({totalCount: {$gte: 0}});
		res.json(posts);
	}catch(err){
		res.json({ message: err });
	}
});

router.get('/:postid', async (req,res) =>{
	try{
		const posts = await Post.findById(req.body.postid);
		res.json(posts);
	}catch(err){
		res.json({ message: err });
	}
});


router.post('/', async (req,res) => {
	const post = new Post({
		key: req.body.key,
		totalCount: req.body.totalCount
	});
	try {
		const savedPost = await post.save();
		res.json(savedPost);
	}catch(err){
		res.json({
			message: err
		});
	}
});

module.exports = router;
