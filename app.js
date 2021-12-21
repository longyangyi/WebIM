var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'main')));


var registerRouter = require('./routes/register');
app.use('/register_post', registerRouter);

var loginRouter = require('./routes/login');
app.use('/login_post', loginRouter);

var logoutRouter = require('./routes/logout');
app.use('/logout_post', logoutRouter);

var addfriendRouter = require('./routes/addfriend');
app.use('/addfriend', addfriendRouter);

var addgroupRouter = require('./routes/addgroup');
app.use('/addgroup', addgroupRouter);

var getfriendlistRouter = require('./routes/getfriendlist');
app.use('/getfriendlist', getfriendlistRouter);

var getgrouplistRouter = require('./routes/getgrouplist');
app.use('/getgrouplist', getgrouplistRouter);

var getuserinfoRouter = require('./routes/getuserinfo');
app.use('/getuserinfo', getuserinfoRouter);

var readmessageRouter = require('./routes/readmessage');
app.use('/readmessage', readmessageRouter);

var socketmessageRouter = require('./routes/socketmessage');
app.use('/socketmessage', socketmessageRouter);




module.exports = app;
