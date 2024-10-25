const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const UserData = new mongoose.model('InstagramUsers' , UserSchema)

module.exports = UserData;