import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number
    },
    address:{
        type:Object
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    updatedAt:{
        type:Date,
        default:null
    }
})

const User = mongoose.model("User",userSchema);
export default User;

