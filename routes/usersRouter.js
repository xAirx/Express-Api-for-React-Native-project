const passport = require('passport');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const UsersRouter = express.Router();
UsersRouter.use(bodyParser.json());
const authenticate = require('../authenticate');
/* UsersRouter.post('/signup', (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        var err = new Error('User ' + req.body.username + ' already exists!');
        err.status = 403;
        next(err);
      }
      else {
        return User.create({
          username: req.body.username,
          password: req.body.password
        });
      }
    })
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'Registration Successful!', user: user });
    }, (err) => next(err))
    .catch((err) => next(err));
}); */

//////// Using PASSPORT //////////

UsersRouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
  User.find({})
  .then((users) => {
    console.log("we are inside the promise"),
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});


// We should restrict admin only signup functionality.. but for non production purposes.. whatever

UsersRouter.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname)
          user.firstname = req.body.firstname;
        if (req.body.lastname)
          user.lastname = req.body.lastname;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});



UsersRouter.post('/login', passport.authenticate('local'), (req, res) => {

  // CREATING TOKEN UPON LOGGING IN
  /*  we'll say id: req.user._id.
   That is sufficient enough for creating the JsonWebToken.
   We don't want to include any other of the user's information.
   If you choose to, you can include other parts of the user information,
   but I would suggest that keep the JsonWebToken small.
   The user ID is sufficient enough because if you need to search for the user,
   the user ID is enough to search in the MongoDB for the user. */

  const token = authenticate.getToken({ _id: req.user._id });
  const userInfo = User.findOne({ _id: req.user._id })
		.then((user) => {
      // Checking if user is logged in.
      console.log("User: ", req.user);
      if (req.user) {
        console.log("you are already logged in");
      /*   console.log("THIS IS THE req session", req.session) */
			}
			else {
			   console.log("you are not logged in")
      }

			if (req.user.admin) {
        console.log("you are admin");
      /*   console.log("THIS IS THE req session", req.session) */
			}
			else {
			   console.log("you are not admin")
      }

		}, (err) => next(err))
		.catch((err) => next(err))
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  // SENDING THE TOKEN IN THE HEADER HERE:
  res.json({success: true, token: token, status: 'You are successfully logged in!' });

});

/*
UsersRouter.post('/login', (req, res, next) => {

  if (!req.session.user) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    User.findOne({ username: username })
      .then((user) => {
        if (user === null) {
          var err = new Error('User ' + username + ' does not exist!');
          err.status = 403;
          return next(err);
        }
        else if (user.password !== password) {
          var err = new Error('Your password is incorrect!');
          err.status = 403;
          return next(err);
        }
        else if (user.username === username && user.password === password) {
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!')
        }
      })
      .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
}) */


 /////////////// You can't logout now. USING POSTMAN ///////////////
/* As I said, RESTful apis are stateless (ie) they don't remember the information sent by client.
 Neither it remembers the tokens. If you have a front end with a login page, and when you login the first time,
 the server sends back a token.. This token will then be saved in the browser(it can be headers or anywhere).
 When the client logs out, the client-side code has to fetch the token from the headers(or where it is stored)
 and empty it(simply pass a empty string or any other way). And so the client-side forgets the token.
Thats how you log out with tokens. Try building a front end and test it. */

/* You cant invalidate tokens from server-side unless some special methods are used.
 In client-side, you can just forget the token.
 Usually tokens will be stored in browsers so that we dont have to specifically include it in the header everytime.
 So, if a client wants a logout, the token will be removed and hence user has to login again to generate token. */

/* UsersRouter.get('/logout', (req, res,next) => {
  console.log("THIS IS REQSESSION", req.session, "THIS IS REQ.user", req.user);
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    console.log("You are not logged in",err);
    err.status = 403;
    next();
  }
});
 */

////// NO SESSIONS ARE USED ANYLONGER SINCE WE USE PASSPORT JWT //////

UsersRouter.get('/logout', (req, res) => {

req.logout();

res.redirect('/');

});

module.exports = UsersRouter;