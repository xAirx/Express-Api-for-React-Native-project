var passport = require('passport');
// Exports a strategy that we can use for our application.
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

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