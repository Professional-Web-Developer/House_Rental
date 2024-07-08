import place from "../models/Place.js";

// get all data from places to show in indexpage
const indexpagecontroller=async(req,res)=>{
    try
    {
        const places=await place.find();
        res.json(places)
    }
    catch(err)
    {
        res.json({message:err})
    }

}
export {indexpagecontroller}