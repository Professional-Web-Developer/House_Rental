import express from 'express'
import { showuserplacescontroller } from '../Controllers/showuserplacescontroller.js'
const showuserplacerouter=express.Router();
showuserplacerouter.get('/account/places/:id',showuserplacescontroller);

// show the specific place details
export default showuserplacerouter;