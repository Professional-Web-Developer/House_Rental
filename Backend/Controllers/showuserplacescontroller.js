import place from '../models/Place.js'
const showuserplacescontroller=async(req,res)=>{
   
//    to show the details of specified place 
    const {id}=req.params;
    const places=await place.findById(id)
    res.json(places)

}
export {showuserplacescontroller}