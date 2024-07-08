import { Placebookingcontroller, showallbookings } from "../Controllers/placebookingcontroller.js";
import express from "express";
const placebookingrouter=express.Router();
placebookingrouter.post('/home/bookings',Placebookingcontroller); //for add bookings
placebookingrouter.get('/bookings',showallbookings) //for see bookings
export default placebookingrouter