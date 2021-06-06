"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocketIO = void 0;
var clientEmits = __importStar(require("./contants/clientEmits"));
var serverEmits = __importStar(require("./contants/serverEmits"));
var mongoose_1 = require("../mongoose");
var socket_io_1 = require("socket.io");
var options = {
    cors: {
        origin: '*',
    }
};
var setupSocketIO = function (httpServer) {
    // const io = require("socket.io")(httpServer, options);
    var io = new socket_io_1.Server(httpServer, options);
    io.on('connection', onConnection);
};
exports.setupSocketIO = setupSocketIO;
var onConnection = function (socket) {
    console.log('Socket ' + socket.id + ' connected');
    socket.on(clientEmits.SEND_MESSAGE, function (data) {
        var message = new mongoose_1.Message({
            message: data.message
        });
        message.save();
        socket.emit(serverEmits.SAVE_MESSAGE, { message: message });
    });
};
//# sourceMappingURL=index.js.map