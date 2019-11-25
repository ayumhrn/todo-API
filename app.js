/* istanbul ignore file */ 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var todoRouter = require('./routes/v1/todo');

var app = express();
var env = require('dotenv').config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setting cors
app.use(cors());

app.use('/', todoRouter);

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

var mongoose = require('mongoose')

/**
 * Database Connection.
 */

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true)
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://ayumhrn:todo123@cluster0-runch.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => {
    console.log('Database successfully connect!')
  })
mongoose.Promise = Promise;

module.exports = app;
