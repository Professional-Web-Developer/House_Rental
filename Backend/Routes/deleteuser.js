import { deleteusercontroller } from "../Controllers/Userdeletecontroller.js";
import express from 'express'
const deleteuserrouter=express.Router()
deleteuserrouter.delete('/user/delete/:id',deleteusercontroller)
export default deleteuserrouter;