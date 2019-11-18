const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const config = require('./config');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/usersRouter');
const dishesRouter = require('./routes/dishRouter')
const promoRouter = require('./routes/promoRouter')
const leaderRouter = require('./routes/leaderRouter')
const passport = require('passport');
const authenticate = require('./authenticate')
/* const swaggerJSDoc = require('swagger-jsdoc');
 */
/* const options = {
  definition: {
    openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: 'Hello World', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  // Path to the API docs
  apis: ['./routes.js'],
}; */

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
/* const swaggerSpec = swaggerJSDoc(options);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', function (req, res, next) {
  swaggerDocument.host = req.get('host');
  req.swaggerDoc = swaggerDocument;
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
  next();
}, swaggerUi.serve, swaggerUi.setup()); */

const app = express();

//// CONNECT TO MONGOOSE SERVER ////
const mongoose = require('mongoose');

const Dishes = require('./models/dishes');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

/////////////////////////////////// f

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/// Setting a key to be used by the cookieparser to encrypt the information and sign the cookie that is sent from the server to the client
app.use(cookieParser('12345-67890-09876-54321'));


//Adding authentication to allow the client to grab data after being authenticated.

//basic auth which runs before all other middleware.
/* app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
})); */

/* at the login stage,
the passport authenticate local will
automatically add the user property to the request message.
So, it'll add req.user and then,
the passport session that we have done here will automatically
serialize that user information and then store it in the session.
So, and subsequently, whenever
a incoming request comes in from the client side
with the session cookie already in place,
then this will automatically load the req.user onto the incoming request.  */

app.use(passport.initialize());
/* app.use(passport.session()); */

// User authentication with routing
// an incoming user can access the index file and acccess the users endpoint without being authenticated. any other endpoint will require authentication below.
app.use('/', indexRouter);
app.use('/users', usersRouter);

/* function auth(req, res, next) { */
/*
  So, your authentication code becomes lot more simpler because if req.user is not present,
then that means that the authentication has not been done correctly so,
that's why you indicate the error.
Otherwise, you are authenticated.
If req.user is present,
that means the passport has done the authentication and the
req.user user is loaded on to the request message,
and so you can just go on further down. */


/*   if (!req.session.user) { */
/* if (!req.user) {
  var err = new Error('You are not authenticated!');
  err.status = 403;
  return next(err);
} */
/*   else { */
/*    if (req.user === 'authenticated') { */
/*   next(); */
/* }
else {
  var err = new Error('You are not authenticated!');
  err.status = 403;
  return next(err);
} */
/*  }
}
*/

// COOKIE AND SESSION EXAMPLE

/* function auth(req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
      req.session.user = 'admin';
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.session.user === 'admin') {
      console.log('req.session: ', req.session);
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
} */

/* app.use(auth); */


// Requiring authentication on CERTAIN routes.

// Enables us to serve static data from our public folder.
app.use(express.static(path.join(__dirname, 'public')));


//////////////////////////// AUTHENTICATION ON ROUTES ////////////////////////////
/* the dishes,
promotions, and the leaders' endpoint,
All the get requests.
I will let those be replied to without requiring any authentication.
Now why would I want to do that?
If a user is doing a get request,
the user just wants to retrieve information. */

/* So, basic information can be displayed there.
But if you want to change anything,
then you expect the user to be authenticated.
So, you will allow POST operations, put operations,
and delete operations to be done only by authenticated users.
Similarly, for comments for example,
you can say that comments can be only posted or modified by authenticated users.
So, you can restrict only some routes for authenticated users,
the other route you can leave them open. */

app.use('/dishes', dishesRouter)
app.use('/promotions', promoRouter)
app.use('/leaders', leaderRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
