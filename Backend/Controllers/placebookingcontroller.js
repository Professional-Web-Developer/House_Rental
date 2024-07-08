import Bookings from '../models/Booking.js';
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Place from '../models/Place.js'

// for get userdetails from token
function getuserdatafromtoken(req){

    return new Promise((resolve,reject)=>{
        const userdetails= jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        resolve(userdetails)
    }) 
}

// for adding booking details in database

const Placebookingcontroller=async(req,res)=>{
const {
    place,checkin,checkout,numberofguests,name,mobile,price
}=req.body;
try{
    const userdetails=await getuserdatafromtoken(req);
    const bookedDates=userdetails.checkin

    const newBooking=await Bookings.create({
        place,user:userdetails.id,checkin,checkout,numberofguests,name,mobile,price,
        });
        res.json(newBooking)
        console.log(newBooking)

}
catch(err)
{
    res.status(500).json({message:err.message})
    console.log(err)

}
}


// for show all bookings of user

const showallbookings=async(req,res)=>{
    try{
        const userdetails=await getuserdatafromtoken(req);
        const bookings=await Bookings.find({user:userdetails.id}).populate('place') //to get full details of place it gets the  object
        res.json(bookings)
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
}

export {Placebookingcontroller,showallbookings}