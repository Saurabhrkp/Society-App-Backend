const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const app = express();

// Passport Config
require('./lib/passport')(passport);

// Calling MongoDB
require('./models/database');

// Gets Status of Express app
app.use(require('express-status-monitor')());

// Calling routes
const userRouter = require('./routes/users');
const indexRouter = require('./routes/index');

// Logging
app.use(logger('dev'));

// Body parser for Forms
app.use(bodyParser.json());

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Servering static files
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(
  session({
    secret: 'secret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14 /* expires in 14 days*/,
      httpOnly: true,
    }, // week
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  /* custom middleware to put our user data (from passport)
   * on the req.user so we can access it as such anywhere
   * in our app
   */
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use('/api', userRouter);
app.use('/', indexRouter);

/* Error handling from async / await functions */
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).json(message);
});

module.exports = app;
