var express = require('express');
var path = require('path');
/* var favicon = require('serve-favicon'); */
var logger = require('morgan');
/* var cookieParser = require('cookie-parser'); */
var bodyParser = require('body-parser');
/* var session = require('express-session');
var FileStore = require('session-file-store')(session); */
const uploadRouter = require('./routes/uploadRouter');
var index = require('./routes/index');
var usersRouter = require('./routes/usersRouter');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var favoritesRouter = require('./routes/favoritesRouter');
var uploadRouter = require('./routes/uploadRouter');
/* var config = require('./config'); */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

var passport = require('passport');
var authenticate = require('./authenticate');
require('dotenv').config()
// Connection URL
/* const url = config.mongoUrl; */
const url = process.env.MONGODB_URI;

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();



/* // Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
}); */

// view engine setupx
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));

// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

app.use(passport.initialize());
/* app.use(passport.session()); */
console.log("init passport correctly");

app.use('/', index);
app.use('/users', usersRouter);

// function auth (req, res, next) {
//   console.log(req.user);

//   if (!req.user) {
//     var err = new Error('You are not authenticated!');
//     res.setHeader('WWW-Authenticate', 'Basic');
//     err.status = 401;
//     next(err);
//   }
//   else {
//         next();
//   }
// }

// app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoritesRouter);
app.use('/users', usersRouter);
app.use('/uploads', uploadRouter);
console.log("Routes Setup");
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

const port = process.env.PORT || 3000;app.listen(port);
console.log("Listening on port", port)

module.exports = app;