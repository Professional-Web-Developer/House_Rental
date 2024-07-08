import mongoose from "mongoose";

// schema for user to store the data in user collection

const userschema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true,

    },
    email:
    {
        type:String,
        required:true,
        unique:true,

    },
    mobile:
    {
        type:Number,
        required:true,
        unique:true,

    },
    password:
    {
        type:String,
        required:true,
        minLength:8
    }

})

const user=mongoose.model("User",userschema)  //create model for user
export default user;