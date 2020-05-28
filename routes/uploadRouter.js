const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
var cors = require('../routes/cors');
var path = require('path');
// Setting storage
const storage = multer.diskStorage({
	destination: (req, file, res, cb) => {
		cb(null, path.join(__dirname, '../public/images'));
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

/** Permissible loading a single file,
	the value of the attribute "name" in the form of "imagee". **/
	// image is what we are passing from postman in our POST.
var type = upload.single('image');


const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
	/* .options(cors.cors, (req, res) => { res.sendStatus(200); }) */
	.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
		res.statusCode = 403;
		res.end('GET operation not supported on /imageUpload');
	})
	.post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin,  type, (req,res) => {

		// chevk if there is a file

		const file = req.file.path;
		console.log("This is the req file path", req.file.path);
		if (!file) {
		  const error = new Error('Please upload a file')
		  error.httpStatusCode = 400
		  return next(error)
		}else{
			// We are encoding a file here.
			var encode_image = file.toString('base64');
			// Define a JSONobject for the image attributes for saving to databasex
			var finalImg = {
				 contentType: req.file.mimetype,
				 image:  new Buffer(encode_image, 'base64')
			  };

			  console.log("this is finalimg", finalImg);
			  res.json({status: "File Uploaded"});
		}
	  })





		/* upload.single('myFile'), (req, res, next) => {
		const file = req.file
		if (!file) {
		  const error = new Error('Please upload a file')
		  error.httpStatusCode = 400
		  return next(error)
		}
		  res.send(file)

	  }) */

		/* upload.single('picture'), (req, res) => {
		var img = fs.readFileSync(req.file.path);

	}) */


	/* upload.single('imageFile'), (req, res) => {
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