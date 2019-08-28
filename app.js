const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
require('dotenv/config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



//Import Routes
const postsRoute = require('./routes/posts');


app.use('/posts', postsRoute);
//app.use('/user', userRoute);

app.get('/',(req,res) =>{
	res.send('We are on home');
});


//Connect DB
/*
var url = 'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study';
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db){
	console.log("Connected");

});
*/
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true },
	() => console.log('Connected to DB!')
);
//Listening
app.listen(3000);