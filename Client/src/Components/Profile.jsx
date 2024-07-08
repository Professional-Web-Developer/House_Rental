import React, { useContext } from 'react'
import { UserContext } from '../UserContext.jsx'
import { Navigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import AccountNav from './AccountNav.jsx'
const Account = () => {
    const [redirect,setRedirect]=useState(null)
    const {ready,user,setUser}=useContext(UserContext)
    // check if we have user and it it takes time to means it shows loading
    
        // function logout to execute logout process from backend and connect to frontend

        async function logout(){
            await axios.post('/logout')
            // setuser null to logout from all places because user variable can store data of user
            setRedirect('/')
            setUser(null)
            
        }
// if the data is ready but page is not ready means it shows loading
    if(!ready)
        {
            return <h1>Loading...</h1>
        }

        // if we dont have redirect link and user we can navigate to login page
    if(ready && !user && !redirect){
        return <Navigate to='/user/login' />
    }
        // if we haven't user then we can navigate to login page
    if(ready && !user)
        {
            return<Navigate to={'/user/login'}/>
        }

    

        // function to change the styling for Link name depend upon page parameter


// after logout redirect to home page
if (redirect)
    {
        return <Navigate to={redirect}/>
    }

  return (
    <>
    <div className='text-center max-w-lg mx-auto'>
        {/* for show logged in user name*/}
        <h3>Logged in as {user.name} ({user.email})<br/></h3>
        <button className='primary max-w-sm mt-2' onClick={logout}>Logout</button>
        {/* for logout */}
    </div>
</>
 );
}

export default Account