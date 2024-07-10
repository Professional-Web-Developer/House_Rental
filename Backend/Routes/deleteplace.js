import { deleteplacecontroller } from "../Controllers/Deleteplacecontroller.js";
import express from 'express'
const deleteplacerouter=express.Router()
deleteplacerouter.delete('/place/delete/:id',deleteplacecontroller)
export default deleteplacerouter;