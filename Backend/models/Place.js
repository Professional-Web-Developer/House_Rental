import mongoose from 'mongoose'

// schema for place collection or table
const placeschema=mongoose.Schema(
    {
        owner:{
            type:mongoose.Schema.Types.ObjectId,ref:'User'
        },
    title:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    photos:{
        type:[String],
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    perks:{
        type:[String],
        required:true,

    },
    extraInfo:{
        type:String,
        required:true,

    },
    checkIn:{
        type:Date,
        required:true,

    },
    checkOut:{
        type:Date,
        required:true,

    },
    maxGuests:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
})

//create model for place

const place=mongoose.model('Place',placeschema)
export default place;