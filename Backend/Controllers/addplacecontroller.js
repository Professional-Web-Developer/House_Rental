import place from '../models/Place.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
// add places details in database from owner
const addplacecontroller=(async(req,res)=>{
    const{token}=req.cookies;
    // console.log(req.body)
    const {title,address,addedphotos,description,perks,checkin,checkout,extrainfo,maxguests,price}=req.body;

try{
    jwt.verify(token,process.env.JWT_SECRET,{},async(err,userData)=>{   //decode the token to get the data
        if(err) throw err;
        // add details in database
        const placedoc=await place.create({
        
            owner:userData.id,   //get id from users schema because it is a reference
            title:title,address:address,photos:addedphotos,description:description,perks:perks,extraInfo:extrainfo,checkIn:checkin,checkOut:checkout,maxGuests:maxguests,price:price
        })
        res.json(placedoc)
    })
    
}
catch(err){
    res.json({message:err.message})
    }
})




// update the place details from owner
const updateplacecontroller=async(req,res)=>{
    const {token}=req.cookies; //getcookies for token
    const {id,title,address,addedphotos,description,perks,checkin,checkout,extrainfo,maxguests,price}=req.body;
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)  //decode the jwt token 
        const placedoc=await place.findById(id);
        if(decoded.id.toString()===placedoc.owner.toString())
        {
            const placedoc1=placedoc.set({title:title,address:address,photos:addedphotos,description:description,perks:perks,extraInfo:extrainfo,checkIn:checkin,checkOut:checkout,maxGuests:maxguests,price:price});
            placedoc.save();  //save the updated data
            res.json(placedoc1)
        
        }
        
    }
    catch(err)
    {
        res.json({message:err.message})
    }

}
export {addplacecontroller,updateplacecontroller}