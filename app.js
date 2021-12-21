var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var addfriendRouter = require('./routes/addfriend');
var addgroupRouter = require('./routes/addgroup');
var getfriendlistRouter = require('./routes/getfriendlist');
var getgrouplistRouter = require('./routes/getgrouplist');
var getuserinfoRouter = require('./routes/getuserinfo');

var sendmessageRouter = require('./routes/sendmessage');
var readmessageRouter = require('./routes/readmessage');
var socketmessageRouter = require('./routes/socketmessage');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'main')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register_post', registerRouter);
app.use('/login_post', loginRouter);
app.use('/logout_post', logoutRouter);
app.use('/addfriend', addfriendRouter);
app.use('/addgroup', addgroupRouter);
app.use('/getfriendlist', getfriendlistRouter);
app.use('/getgrouplist', getgrouplistRouter);
app.use('/getuserinfo', getuserinfoRouter);

app.use('/login', express.static('login'));
app.use('/register', express.static('register'));
app.use('/main', express.static('main'));
app.use('/singlechat', express.static('singlechat'));
app.use('/groupchat', express.static('groupchat'));
app.use('/sendmessage', sendmessageRouter);
app.use('/readmessage', readmessageRouter);

app.use('/socketmessage', socketmessageRouter);



module.exports = app;
