import express, {Express} from 'express';
import path from 'path';
import cookieParser  from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import apiRouter from './routes/api';
import {setupSocketIO} from './socket';
import http , {Server} from 'http';
var app: Express = express();
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

const httpServer: Server = http.createServer(app);
//socketio

setupSocketIO(httpServer);

httpServer.listen(PORT)


export default app;
