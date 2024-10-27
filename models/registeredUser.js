const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId : {
        type:Number,
        required:false
    },
   email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    createdOn: { 
        type: Date,
        default: Date.now 
    }
})


const UserData = new mongoose.model('Users' , UserSchema)

module.exports = UserData;