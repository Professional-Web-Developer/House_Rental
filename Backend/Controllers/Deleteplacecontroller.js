import Place from '../models/Place.js'
import Bookings from '../models/Booking.js'
// used for delete place by owner
const deleteplacecontroller=async(req,res)=>{
    try{
        const bookings=await Bookings.deleteMany({place:req.params.id})
        const place=await Place.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Place deleted successfully",place})
        }catch(err){
            res.status(500).json({message:"Something went wrong",err})
        }
}
export {deleteplacecontroller}