import Bookings from '../models/Booking.js';
import {sendEmail} from '../Controllers/Emaicontrol/emailcontrol.js'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const getCancellationFee = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Bookings.findById(id).populate('place');

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Calculate the cancellation fee based on your policy
    const currentDate = new Date();
    const bookingDate = new Date(booking.checkin);
    const daysUntilBooking = Math.ceil((bookingDate - currentDate) / (1000 * 60 * 60 * 24));
    let cancellationFee = 0;

    if (daysUntilBooking < 7) {
      cancellationFee = booking.price * 0.5; // 50% fee if canceled within 7 days
    }

    // Return the cancellation fee
    res.status(200).json({ cancellationFee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const confirmCancellation = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Bookings.findById(id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Extract JWT token from cookies
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Prepare and send cancellation email
    const data = {
      to: decoded.email,
      subject: 'Booking Cancellation Confirmation',
      text: `Your booking with ID ${id} has been successfully canceled.`,
      html: `<p>Your booking with ID ${id} has been successfully canceled.</p>`,
    };
    await sendEmail(data);

    // Delete the booking
    await Bookings.findByIdAndDelete(id);

    // Return success message
    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { getCancellationFee, confirmCancellation };
