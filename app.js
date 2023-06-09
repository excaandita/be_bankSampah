var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const flash = require('connect-flash');
var cors = require('cors')

var categoryRouter = require('./app/category/router');
var garbageRouter = require('./app/garbage/router');
var groupUserRouter = require('./app/group_user/router');
var userRouter = require('./app/user/router');
var authRouter = require('./app/auth/router');
var transactionRouter = require('./app/transaction/router');


var app = express();
var URL = `/api/v1`;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,  
  cookie: { }
}))
app.use(cors());
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${URL}/category`, categoryRouter);
app.use(`${URL}/garbage`, garbageRouter);
app.use(`${URL}/groupUser`, groupUserRouter);
app.use(`${URL}/user`, userRouter);
app.use(`${URL}/auth`, authRouter);
app.use(`${URL}/transaction`, transactionRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
