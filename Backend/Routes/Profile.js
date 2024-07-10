import { Profilecontroller } from "../Controllers/Profilecontroller.js";
import express from "express";
const profilerouter=express.Router()
profilerouter.get('/profile/:id',Profilecontroller)
export default profilerouter
