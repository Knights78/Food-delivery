import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:email,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    cartData:{
        type:Object,
        default:{}
    }

},{minimize:false})
