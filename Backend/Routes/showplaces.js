import express from 'express'
import { showplacescontroller } from '../Controllers/showplacescontroller.js'
const showplacesrouter=express.Router()
showplacesrouter.get('/showplaces',showplacescontroller)
export default showplacesrouter
// used to show the user added places