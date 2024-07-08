// logoutcontrol function is used to done logout process
const logoutcontrol=async(req,res)=>{
    try{
        res.cookie('token','').json(true)   //clear the token cookie from cookies which contains the user details in encoded format
    }
    catch(err)
    {
        console.log(err.message)
    }
}
export default logoutcontrol 