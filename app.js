var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var setupSocketIO = require('./socket/').setupSocketIO;
console.log(123123);
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/', apiRouter);


const PORT = 4000;

const httpServer = require("http").createServer(app);
//socketio

setupSocketIO(httpServer);

httpServer.listen(PORT)


module.exports = app;
