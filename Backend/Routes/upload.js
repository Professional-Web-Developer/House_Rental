import express from 'express';
import { photomiddleware, uploadcontroller, uploadphoto } from '../Controllers/uploadcontroller.js';
const uploadrouter=express.Router();

// used to download the image from link
uploadrouter.post('/upload-by-link',uploadcontroller);
uploadrouter.post('/upload',photomiddleware.array('photos',100),uploadphoto)

// used to store the photo in specified place and database

export default uploadrouter;