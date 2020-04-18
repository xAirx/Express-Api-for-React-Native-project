const express = require('express');
const cors = require('cors');

const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443'];


/* corsOptionsDelegate here, we will check to see if the incoming
request belongs to one of the whitelisted origins.
If it is, then you reply back with access control
allowOrigin with the origin of the request set in there.
Otherwise it'll not include that access control allowOrigin when it replies.
Now, from this function, we will export cors as cors here.
Now, if you configure the cors Module by simply saying cors
without any options, then that means this will reply
back with access control allowOrigin with the wild cards toll.
There are certain rules on which this is acceptable to do,
especially whenever we perform get operations.
It's okay to accept that.
Otherwise, we'll say, corsWithOptions = cors, and
then we'll supply the )corsOptionsDelegate)
function that we have just defined earlier.
So that way, if you need to apply A cors
with specific options to a particular route, we will use this function.
Otherwise, we'll simply use the standard cors */

var corsOptionsDelegate = (req, callback) => {

	var corsOptions;
	console.log(req.header('Origin'));

	/* 	here we are specifying in the code here,
		we are saying req.header.
		So if the incoming request header contains an origin feed,
		then we are going to check this whitelist.
		Looking for that particular origin, is it present in this whitelist?
		So that's why we are saying whitelist.indexOf.
		So this is an array operation being done here.
		And we will say in origin is not equal to -1.
		As you know the index of operation will return the index greater than or
		equal to zero if this is present in this array.
		It'll return -1 if this is not present in this array.
		So a very quick way of checking to see if the incoming
		requests origin in the whitelist.
		 */


	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		/* 		here we are specifying in the code here,
		we are saying req.header.
		So if the incoming request header contains an origin feed,
		then we are going to check this whitelist.
		Looking for that particular origin, is it present in this whitelist?
		So that's why we are saying whitelist.indexOf.
		So this is an array operation being done here.
		And we will say in origin is not equal to -1.
		As you know the index of operation will return the index greater than or
		equal to zero if this is present in this array.
		It'll return -1 if this is not present in this array.
		So a very quick way of checking to see if the incoming
		requests origin in the whitelist.
		 */
		corsOptions = { origin: true };
	}

	else {
		corsOptions = { origin: false };
	}

	callback(null, corsOptions);
};

exports.cors = cors();

exports.corsWithOptions = cors(corsOptionsDelegate);