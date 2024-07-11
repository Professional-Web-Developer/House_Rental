import express from 'express';
import { getCancellationFee, confirmCancellation } from '../Controllers/Cancelbookingcontroller.js';

const cancelbookingroutes = express.Router();

// Route to get the cancellation fee
cancelbookingroutes.get('/cancel-bookings/:id', getCancellationFee);

// Route to confirm cancellation
cancelbookingroutes.delete('/cancel-bookings/:id', confirmCancellation);

export default cancelbookingroutes;
