var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('api/', apiRouter);


const PORT = 4000;
//socketio
const options ={
    cors: {
      origin: '*',
    }
};
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, options);
io.on('connection', function(socket){
    console.log('Socket '+ socket + ' connected');
})
httpServer.listen(PORT)


module.exports = app;
