const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishesRouter = require('./routes/dishRouter')
const promoRouter = require('./routes/promoRouter')
const leaderRouter = require('./routes/leaderRouter')

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

const url = 'mongodb://localhost:27017/conFusion';
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
function auth(req, res, next) {
  console.log(req.signedCookies);

  // if the user field in the cookie does not contain the user, the user is not authenticated
  if (!req.signedCookies.user) {

    // Expect user to authenticate.
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
      return;
    }

    // we are splitting the headers here, extracting user and pass.
    // including your base-64 encoded username and password
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];

    // checking for authorization.
    // If basic authentication is successfull we setup cookie. and send cookie to the client from backend.
    if (user == 'admin' && pass == 'password') {
      // Setting cookie name as user admin, and signing cookie that is returned by backend.
      res.cookie('user', 'admin', { signed: true })
      // Will call the NEXT middleware in the chain.
      next(); // authorized
    } else {
      var err = new Error('You are not authenticated!');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  }
  else {
    if (req.signedCookies.user === 'admin') {
      //allow request to be passed since the cookie is true with the user === admin.
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 401;
      next(err);
    }
  }
  console.log(req.headers);
}
app.use(auth);


// Enables us to serve static data from our public folder.
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
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
