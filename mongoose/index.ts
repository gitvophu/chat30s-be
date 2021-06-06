import mongoose from 'mongoose';
try{
    mongoose.connect('mongodb://127.0.0.1:27017/chat30s');
    console.log("Mongodb connected");
}catch(error){
    console.log("Connect mongodb failed", error);
}

const messageSchema = new mongoose.Schema({
    message: String
});
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
});

export const Message = mongoose.model('Message', messageSchema);
export const User   = mongoose.model('User', userSchema);
export default mongoose;

