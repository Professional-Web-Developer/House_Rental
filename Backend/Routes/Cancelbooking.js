import cancelbookingcontroller from "../Controllers/Cancelbookingcontroller.js";
import express from 'express'
const cancelbookingroutes=express.Router()
cancelbookingroutes.delete('/cancel-bookings/:id',cancelbookingcontroller)

export default cancelbookingroutes