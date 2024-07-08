import { addplacecontroller, updateplacecontroller } from "../Controllers/addplacecontroller.js";
import express from 'express'
const addplacerouter=express.Router()
addplacerouter.post('/addplaces',addplacecontroller)    //for add places by owner
addplacerouter.put('/addplaces',updateplacecontroller)   //for update places by owner
export default addplacerouter