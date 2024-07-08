import express from 'express'
import { registercontroller } from '../Controllers/registercontrol.js'
const registerrouter=express.Router()

// for registering the data

registerrouter.post('/register',registercontroller)

export default registerrouter
