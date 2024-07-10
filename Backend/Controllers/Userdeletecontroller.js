import User from '../models/User.js'

// used for delete the uer

const deleteusercontroller=async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"User deleted successfully",user})
        }catch(err){
            res.status(500).json({message:"Something went wrong",err})
        }
}
export {deleteusercontroller}