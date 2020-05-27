const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
var cors = require('../routes/cors');



// Setting storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images');
	},

	filename: (req, file, cb) => {
		cb(null, file.originalname)
	}
});

// Filtering images to what we want uploaded only.
const imageFileFilter = (req, file, cb) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return cb(new Error('You can upload only image files!'), false);
	}
	cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
	/* .options(cors.cors, (req, res) => { res.sendStatus(200); }) */
	.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		res.statusCode = 403;
		res.end('GET operation not supported on /imageUpload');
	})
	.post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, upload.single('picture'), (req, res) => {
		var img = fs.readFileSync(req.file.path);
	 var encode_image = img.toString('base64');
	 // Define a JSONobject for the image attributes for saving to database

	 var finalImg = {
		  contentType: req.file.mimetype,
		  image:  new Buffer(encode_image, 'base64')
	   };
	db.collection('quotes').insertOne(finalImg, (err, result) => {
		console.log(result)

		if (err) return console.log(err)

		console.log('saved to database')
		res.redirect('/')


	  })
	})/* upload.single('imageFile'), (req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(req.file);
	}) */
	.put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		res.statusCode = 403;
		res.end('PUT operation not supported on /imageUpload');
	})
	.delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		res.statusCode = 403;
		res.end('DELETE operation not supported on /imageUpload');
	});

///////// ////////// /////////// ///////////
module.exports = uploadRouter;