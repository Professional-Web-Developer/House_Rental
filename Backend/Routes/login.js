import express from 'express'
const loginrouter=express.Router()
import { forgetpasswordToken, logincontroller, profilecontroller, updatepasswordcontroller } from '../Controllers/logincontrol.js'
// router for login purpose and maintain account as login state
loginrouter.post('/login',logincontroller)  //for checking login details
loginrouter.get('/profile',profilecontroller)  //get the details to store the data in cookies
loginrouter.post('/forget-password',forgetpasswordToken)
loginrouter.post('/new-password/:token',updatepasswordcontroller)

export default loginrouter