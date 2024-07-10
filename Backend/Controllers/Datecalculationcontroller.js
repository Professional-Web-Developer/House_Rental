import Booking from '../models/Booking.js'
import place from '../models/Place.js'
const datecalculationcontroller=async(req,res)=>{
    try {
        const bookings = await Booking.find({ place: req.params.id }).populate('place');
        res.json(bookings);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
export {datecalculationcontroller}