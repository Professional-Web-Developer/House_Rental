import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import place from '../models/Place.js'
dotenv.config()

// used to show the places for owner which all are  added by owner

const showplacescontroller=async(req,res)=>{
    try{
        const {token}=req.cookies;  //get token from req cookies
const decoded=jwt.verify(token,process.env.JWT_SECRET); //get the user id by cookies
const userid=decoded.id;
res.json(await place.find({owner:userid}))
}
    catch(err){
        res.status(401).json({msg:"unauthorized user"})
        }

}

export {showplacescontroller}