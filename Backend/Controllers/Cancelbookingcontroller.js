import Bookings from '../models/Booking.js'


// for cancel booking
const cancelbookingcontroller=async(req,res)=>{
    try{
        const {id}=req.params;
        await Bookings.findByIdAndDelete(id);
        res.status(200).send('Booking cancelled');
    }
    catch{
        res.status(500).json({message:"something went wrong"})
    }

}
export default cancelbookingcontroller;