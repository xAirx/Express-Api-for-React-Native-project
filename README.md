

## DevBranch  


	
### -----------------------HTTPS SECURE CONNECTION TO API------------------------ WORKS
	
				root/app.js
				
				// Secure traffic only
				app.all('*', (req, res, next) => {
				  if (req.secure) {
				    return next();
				  }
				  else {
				    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
				  }
				});
				
				
				wwww/bin
				
				/**
				 * Create HTTPS server.
				 */

				var options = {
				  key: fs.readFileSync(__dirname + '/private.key'),
				  cert: fs.readFileSync(__dirname + '/certificate.pem')
				};

				var secureServer = https.createServer(options, app);

				/**
				 * Listen on provided port, on all network interfaces.
				 */

				secureServer.listen(app.get('secPort'), () => {
				  console.log('Secure Server listening on port ', app.get('secPort'));
				});
				secureServer.on('error', onError);
				secureServer.on('listening', onListening);

				/**

	
	
### ------------------Mongoose Population------------------------- WORKS
	
			/models/user.js

			- express support for user registration and authentication -implemented



	
### ---------------CORS for express server---------------------------- WORKS.
		
			Check cors.js under routes under Devbranch -implemented


			Whitelisting our HTTPS proxy

			const whitelist = ['http://localhost:3000', 'https://localhost:3443'];


	 
### ----------------PASSPORT JWT, PROTECT ROUTES, ETC--------------------- WORKS
	 
			 -Adding PASSPORT.
			

			root/authenticate.js
				exports.facebookPassport = passport.use(new FacebookTokenStrategy({
					clientID: config.facebook.clientId,
					clientSecret: config.facebook.clientSecret
				}, (accessToken, refreshToken, profile, done) => {
					User.findOne({ facebookId: profile.id }, (err, user) => {
						if (err) {
							return done(err, false);
						}
						if (!err && user !== null) {
							return done(null, user);
						}
						else {
							user = new User({ username: profile.displayName });

			
			-Session and Cookies, and Filestore -implemented 


				 http://localhost:3000/users/  - check UsersRouter under Devbranch

				 root/authenticate.js

					const passport = require('passport');
					// Exports a strategy that we can use for our application.
					const LocalStrategy = require('passport-local').Strategy;
					const User = require('./models/user');
					const JwtStrategy = require('passport-jwt').Strategy;
					const ExtractJwt = require('passport-jwt').ExtractJwt;
					const jwt = require('jsonwebtoken');
					var FacebookTokenStrategy = require('passport-facebook-token');
					const config = require('./config');



### ---Added post functionality for Dishes and Leaders / comments and Feedback---- WORKS
	
			/routes/leaderRouter.js -implemented

			LeaderRouter.route('/')
			    .options(cors.cors, (req, res) => { res.sendStatus(200); })
			    .get(cors.cors, (req, res, next) => {
				Leaders.find({})
				    .then((leaders) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(leaders);
				    }, (err) => next(err))
				    .catch((err) => next(err));
			    })
			    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
				Leaders.create(req.body)
				    .then((leader) => {
					console.log('Leader Created ', leaders);
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(leaders);
				    }, (err) => next(err))
				    .catch((err) => next(err));
			    })
	


	      
###--------------------------Verify Admin and Verify User ---------------------------------- works

		  ####   Authentication based on being an admin or not. -implemented - works

		
		    // Check if user is logged in
		   
		   		exports.verifyUser = passport.authenticate('jwt', { session: false })  - works
		
		    //Check if a verified ordinary user also has Admin privileges.
		    
				exports.verifyAdmin = function (req, res, next) {
	


		Admin based management, being able to see a user list -implemented  - Works


		Admin allowed see and flag dishes as featured or not. -implemented  - Works

		
		Admin can see and flag leaders as featured for the frontpage  -implemented  - Works

		
TODO ------>	Admin allowed / able to upload files, such as images when creating new dishes. -implemented  - NOT TESTED

		
TODO ------>	Admin can  GET all the registered users' information  -implemented - NOT TESTED
 
			
			
			
			#####Example from routes/dishRouter.js

			.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
				...... 
				}
	
	
	
     
### -------------------- Backend for Users Panel    --------------------------------- Needs testing
     
   
		   
TODO ------>	   Favorite functionality for users -implemented  - NOT TESTED

		   
TODO ------>	   Comment and form support for the users to interact with the content. - NOT IMPLEMENTED MIRROR LEADERS ROUTE CODE

		   
TODO ------>	   Support for a user to manage their own comments, delete functionality. -implemented - NOT TESTED

		 
			##### Check routes / favoritesRouter.js

			      favoriteRouter.route('/')
				  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
				  .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
				    Favorites.findOne({ user: req.user._id })
				      .populate('user')
				      .populate('dishes')
				      .then((favorites) => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json(favorites);
				      }, (err) => next(err))
				      .catch((err) => next(err));
				  })


&nbsp;
&nbsp;


### ---------------Fileuploading with multer---------------------------- Needs testing
		 
TODO ------>     http://localhost:3000/upload/ , Check UploadRouter under Devbranch  -implemented - Not tested


&nbsp;
