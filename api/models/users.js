//import required dependencies
const mongoose = require('mongoose');

const  userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String},
    lastName: { type: String },
    email:{
        type:String, 
        required:true, 
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/},
    userId: { type: Number, required:true},
    userStatus: { type: Number, required:true},
    userName:{type:String, required:true, },
    psswrd: { type: String, required:true},
    date: {type: String, required:true},
    address: {type:String, required: true},
    userImg:{type: String}
});

module.exports = mongoose.model('Users', userSchema)