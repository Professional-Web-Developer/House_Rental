import asyncHandler from 'express-async-handler'
import user from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {sendEmail} from './Emaicontrol/emailcontrol.js'
dotenv.config()
//logincontroller is used for manage the login functionalities
const logincontroller=asyncHandler(async(req,res)=>{
try{
    const {email,password}=req.body;
    const existuser=await user.findOne({email})
    if(existuser){
        // check  the password which user give in login and already encrypted password
        const isMatch=await bcrypt.compare(password,existuser.password)
        if(isMatch){
            // generate the token for the user to store in cookies
            const token=jwt.sign({email:existuser.email,id:existuser._id,name:existuser.name},process.env.JWT_SECRET,{})
            res.cookie('token',token).json(existuser)
            res.status(200).json(existuser)
            }else{
                res.status(400).json({message:"password is incorrect"})
                }
                }else{
                    res.status(400).json({message:"user not found"})
                    }

}
catch(err)
{
    res.status(500).json(err)

}
})

// profile controller is used to get the data from cookies and make user no need to login everytime
const profilecontroller=(req,res)=>{
    try{
        const {token}=req.cookies;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
            if(err){
                res.status(401).json({message:"token is not valid"})
                }
                else{
                    const {name,email,_id}=await user.findById(decoded.id)
                    res.status(200).json({name,email,_id})
                    }
                    })
                    }else{
                        res.json(null)
    }

}
    catch(err)
    {
        console.log(err)
    }
    
}



//forget paassword
const forgetpasswordToken=asyncHandler(async(req,res)=>{
    const {email}=req.body
    const user1=await user.findOne({email});
    if(!user1){
        throw new Error("user not found for this email")
    }
    try{
        const token=jwt.sign({email:user1.email,userid:user1._id},process.env.JWT_SECRET, { expiresIn: '10m' })
        const resetURL=`Pleasse follow this url to reset your password it will only valid for 10 minutes from now. <a href="http://localhost:5173/user/forget-password/${token}">Click Here</>`
        const data={
            to:email,
            text:"Hey User",
            subject:"Forgot Password Link",
            htm:resetURL
        }
        sendEmail(data)
        res.json({token,email})
    }
    catch(err){
        throw new Error(err)
    }
    
    })


    const updatepasswordcontroller = async (req, res) => {
        const { password } = req.body;
        const { token } = req.params;
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user1 = await user.findOne({ email: decoded.email, _id: decoded.userid });
          
          if (!user1) {
            return res.status(404).json({ message: "User not found" });
          }
          
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          user1.password =hashedPassword
          await user1.save();
          
          res.json({ message: "Password updated successfully" });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: err.message });
        }
      };



export {logincontroller,profilecontroller,forgetpasswordToken,updatepasswordcontroller};