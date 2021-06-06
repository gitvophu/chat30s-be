"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Message = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
try {
    mongoose_1.default.connect('mongodb://127.0.0.1:27017/chat30s');
    console.log("Mongodb connected");
}
catch (error) {
    console.log("Connect mongodb failed", error);
}
var messageSchema = new mongoose_1.default.Schema({
    message: String
});
var userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
    fullname: String,
});
exports.Message = mongoose_1.default.model('Message', messageSchema);
exports.User = mongoose_1.default.model('User', userSchema);
exports.default = mongoose_1.default;
//# sourceMappingURL=index.js.map