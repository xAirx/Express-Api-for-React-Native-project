var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
/* var config = require('./config.js');
 */
require('dotenv').config()


/* passport use and say
new LocalStrategy and then this is where
the functions that are supported by the passport-local-mongoose comes to our help.
So the local strategy will need to be supplied with the verify function.
Inside this function we will verify the user.
This verify function will be called with the username and password that
passport will extract from our incoming request.
Now in the incoming request for the LocalStrategy the username and password
should be supplied in the body of the message in the form of a Json string.
Again because we are doing body-parser so that'll be
added into the body of the message and then from there passport
we'll retrieve that and then use that and supply the username and password
as parameters to the verify function that we will supply to the LocalStrategy.
 */

// Our user authentication from passport is better than writing a custom one. as we did before.


exports.local = passport.use(new LocalStrategy(User.authenticate()));

/* Now recall that the passport authenticate will mount the req.user or the user property to
the request message and so
that user information will be serialized and deserialized realized by using
this saying serialize user and passport deserialize user.
Also we'll say user deserialize user.
These two functions they serialize user and deserialize user are provided on
the user schema and model by the use of the passport-local-mongoose plugin here. */

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {

	/* 	this helps us to create the JSON Web Token and so inside that it'll
	allow me to supply the payload and
	the payload here comes in as the parameter here called user,
	and then the second parameter is
	the secret or private key which I get from config.secret key, */

    return jwt.sign(user, process.env.SECRETKEY,
        { expiresIn: 3600 });
};

var opts = {};

/* Now this option specifies
how the jsonwebtoken should be extracted from the incoming request message.
This is where we will use the extract JWT.
This extract JWT supports various methods
for extracting information from the header.
It'll say from authHeader from authHeader as bearer token,
from header which scheme and so on.
If you read the documentation it will tell
you various ways of extracting the jsonwebtoken. */
/* opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); */
/* jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token') */

/* The next one we'll say opts.secretOrKey,
this is the second parameter which helps me to
supply the secret key which I'm going to be using within my strategy for the sign-in */
/* opts.secretOrKey = config.secretKey; */


/* functionJWT_payload. */
/* Done. So, when this function is called, */
/* the done is the callback that is provided b y passport.*/
/* So, whenever you have passport which you're  configuring with a new strategy,/
/* you need to supply the second parameter don e.*/
/* Through this done parameter, */
/* you will be passing back information to pas sport which it will then*/
/* use for loading things onto the request mes sage.*/
/* So, when passport parses the request messag e,*/
/* it will use the strategy and then extract i nformation,*/
/* and then load it onto our request message.  */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
		console.log("JWT payload: ", jwt_payload);
		/* User.findOne and the second one
	is a callback function.
	As you realize, this user Mongoose method and you try to find.
	So, we'll say if err then, return done.
	What does this done? This done is the callback that
	passport will pass into your strategy here. */
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));


// We are creating no sessions, since we are using JWT based auth.
// WE AUTHENTICATE HERE WITH THE TOKEN AND VERIFY THE USERS:

// ANY PLACE WE WANT TO VERIFYUSER WE CAN USE THIS EXPORT.


exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = function (req, res, next) {
    User.findOne({ _id: req.user._id })
        .then((user) => {
            console.log("User: ", req.user);
            if (user.admin) {
                next();
            }
            else {
                err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
}