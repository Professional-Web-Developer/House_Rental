import express from 'express'
const datecalculationrouter=express.Router();
import { datecalculationcontroller } from '../Controllers/Datecalculationcontroller.js';
datecalculationrouter.get('/places/:id/bookings',datecalculationcontroller);
export {datecalculationrouter};