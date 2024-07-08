import Booking from '../models/Booking.js'
import Place from '../models/Place.js'
const datecalculationcontroller=async(req,res)=>{
    try {
        const bookings = await Booking.find({ place: req.params.id });
        res.json(bookings);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
export {datecalculationcontroller}