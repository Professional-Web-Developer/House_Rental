import mongoose from 'mongoose';
import Place from './Place.js';
// schema for booking details
const bookingSchema=new mongoose.Schema({
    place:{
        type:mongoose.Schema.Types.ObjectId,ref:Place,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
        },
    checkin:{
        type:Date,
        required:true
    },
    checkout:{
        type:Date,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    price:
    {
        type:Number,
        required:true
    }

})
const Bookings=mongoose.model('Booking',bookingSchema);
export default Bookings;