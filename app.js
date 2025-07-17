var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var mongoStore = require("connect-mongo");
var logger = require('morgan');

var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
  session({
    name: "sid", // 设置cookie的名称 默认值是connect.sid
    secret: "secret", // 用于加密cookie的字符串
    saveUninitialized: false, // 是否为每次请求都设置一个cookie用来保存session的id
    resave: true, // 是否在每次请求时都重新保存session
    store: mongoStore.create({
      // 使用connect-mongo将session存储到mongodb中
      mongoUrl: "mongodb://localhost:27017/Green",
    }),
    cookie: {
      httpOnly: true, // 是否只允许http请求访问cookie
      maxAge: 1000 * 60 * 5, // cookie的过期时间
    },
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', usersRouter);

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
