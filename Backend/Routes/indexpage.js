import express from 'express'
import { indexpagecontroller } from '../Controllers/indexpagecontroller.js'
const indexpagerouter=express.Router();
indexpagerouter.get('/home',indexpagecontroller); //for show index page details

export default indexpagerouter