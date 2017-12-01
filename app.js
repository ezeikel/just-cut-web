const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

// kept from express-generator
const logger = require('morgan');
const favicon = require('serve-favicon');

// create our Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validation data
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// sessions allow us to store data on visitors from request to request
// this keeps user logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// passportjs is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// the flash middleware lets us use req.flash('error', 'Shit!'), which will then pass thatg message to the next page the user requests
app.use(flash());

// pass variables to our templates + helpers
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// after allll that above middleware, we finally handle our own routes!
app.use('/', routes);

// if that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// one of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// otherwise this was a really bad error we didnt expect!
if(app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export is so we can start the site in start.js
module.exports = app;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));