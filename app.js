const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Import Model
const Post = require('./models/Post');

//Post request
app.post('/', async (req,res) =>{

	try{
		//Initializing variables from request body
		var requested = req.body;
		var dts = stringToDate(requested.startDate,"yyyy-mm-dd","-");
		var dte = stringToDate(requested.endDate,"yyyy-mm-dd","-");
		var min = parseInt(requested.minCount, 10);
		var max = parseInt(requested.maxCount, 10);
		
		//Pulling datas from the mongodb database with filtering
		const datas = await Post.find({ $and: [{ "createdAt": {$gte: dts }},{ "createdAt": {$lte: dte }}]});
		var total=0; // total number of the data at the result point
		var obj = {} // empty Object
		var key = 'Results';
		obj[key] = []; // records array

		//These loops are for finding the sum of the 'counts' array
		for (var i = datas.length - 1; i >= 0; i--) {
			var sum = 0;
			for (var j = datas[i].counts.length - 1; j >= 0; j--) {
					sum+=datas[i].counts[j];
			}
			//Looking for the conditions about the totalCount
			if( sum>=min && sum<=max ){
				total+=1;
				
				//Creating a records array with json objects
				var data = {
				    key: datas[i].key,
				    createdAt: datas[i].createdAt,
				    totalCount: sum
				};
				obj[key].push(data);
			}
		}
		// Returning response object
		var returning = {
			code: 0,
			msg: 'Success',
			records: obj[key]
		}
		res.send(returning);
		console.log(total);

	} catch(err) {  //If there is an error, here it catches.

		var returning = {
			code: 1,
			msg: err,
			records: []
		}
		res.send(returning);

	}
	
});

//Function for converting request string to proper date format
function stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}

//Connecting to database
mongoose.connect(
	'mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study',
	{ useNewUrlParser: true },
	() => console.log('Connected to DB!')
);

//Listening the port
app.listen(process.env.PORT || 3000);