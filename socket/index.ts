import * as clientEmits from './contants/clientEmits';
import * as serverEmits from './contants/serverEmits';
import { Message } from '../mongoose';
import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
const options = {
    cors: {
        origin: '*',
    }
};
export const setupSocketIO = (httpServer: HttpServer) => {
    // const io = require("socket.io")(httpServer, options);
    const io = new Server(httpServer, options);
    io.on('connection', onConnection);
}
const onConnection = (socket: Socket) => {
    console.log('Socket ' + socket.id + ' connected');
    socket.on(clientEmits.SEND_MESSAGE, (data) => {
        let message = new Message({
            message: data.message
        });
        message.save();
        socket.emit(serverEmits.SAVE_MESSAGE, { message });
    })
}
