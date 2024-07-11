import express from 'express'
import path from 'path';
import { __dirname } from './Controllers/uploadcontroller.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import registerrouter from './Routes/register.js'
import loginrouter from './Routes/login.js'
import logoutrouter from './Routes/logout.js'
import uploadrouter from './Routes/upload.js'
import cors from 'cors'
import addplacerouter from './Routes/addplace.js';
// cookie-parser is used to get the data from cookies without any restrictions
import cookieParser from 'cookie-parser'
import showplacesrouter from './Routes/showplaces.js';
import showuserplacerouter from './Routes/showuserplace.js';
import indexpagerouter from './Routes/indexpage.js';
import placebookingrouter from './Routes/placebookings.js';
import { EventEmitter } from 'events';
import { datecalculationrouter } from './Routes/datecalculation.js';
import profilerouter from './Routes/Profile.js';
import deleteplacerouter from './Routes/deleteplace.js';
import deleteuserrouter from './Routes/deleteuser.js';
EventEmitter.defaultMaxListeners = 20;

// express is REST API for node js to do post, get ,put ,delete and some other operations
const app=express()
// dotenv is used to store our secret data safely
dotenv.config()
// cors is used to allow cross origin request
app.use(cors({
    credentials:true,
    origin:true,
}
))
app.use(express.json())
app.use(cookieParser())
// here we can check the path of url and make changes in path
app.use('/user/uploads',express
    .static(path.join(__dirname,'uploads')))

// this is a middleware function.This middleware function parses incoming requests with JSON payloads and makes the data available in the req.body object.
const port=process.env.PORT
const mongo_url=process.env.MONGO_URL
await mongoose.connect(mongo_url)
.then(
    console.log("database connected successfully")
).catch(error=>{
    console.log(error)
})

// Mongodb atlas database connection 
app.use('/user',registerrouter)   //for user registration
app.use('/user',loginrouter)  //for user login
app.use('/user',logoutrouter)   //for user logout
app.use('/user',uploadrouter)   //for upload photos for places
app.use('/user',addplacerouter)   //for add places 
app.use('/user',showplacesrouter)  //for show places for user 
app.use('/user',showuserplacerouter)  //for show the detailed view of specific places which all are added by user
app.use('/user',indexpagerouter) //for home page
app.use('/user',placebookingrouter)  //for user bookings details purpose 
app.use('/user',datecalculationrouter)  //for showing  dates which all are available
app.use('/user',profilerouter) //for profilepage
app.use('/user',deleteplacerouter) //for delete places by owner
app.use('/user',deleteuserrouter) //to delete user

// app.listen is uesd to start the server or make the server to listen in specified port
app.listen(port,()=>{
    console.log('server is running');
}
)