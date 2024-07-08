import express from 'express'
import logoutcontrol from '../Controllers/logoutcontrol.js'
// router for logout process
const logoutrouter=express.Router()
logoutrouter.post('/logout',logoutcontrol)   // for logout 
export default logoutrouter