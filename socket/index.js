const clientEmits = require('./contants/clientEmits');
const options ={
    cors: {
      origin: '*',
    }
};
module.exports.setupSocketIO = (httpServer)=>{
    const io = require("socket.io")(httpServer, options);
    io.on('connection', onConnection);
}
const onConnection = (socket)=>{ 
    console.log('Socket '+ socket.id + ' connected');
    socket.on(clientEmits.SEND_MESSAGE, (data)=>{
        console.log('Server:' + 'on ' + clientEmits.SEND_MESSAGE);
        console.log({data});
    })
}
