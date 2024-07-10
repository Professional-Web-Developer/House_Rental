import React from 'react'
import Header from './Header'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
// for login page
const Loginpage = () => {
// get the data from user and store it in variable by using useState hook
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [redirect,setRedirect]=useState('')
  const {setUser}=useContext(UserContext)
  const [alertMessage, setAlertMessage] = useState(null);

  
  // function to handle the login
  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      // axios is used to connect frontend and backend
      const {data}=await axios.post('/login',{email,password})
      setUser(data)
      setAlertMessage("Login successful");

      setTimeout(() => {
        setAlertMessage(null);
        setRedirect(true);
      }, 500); // 5 seconds
    } catch (err) {
      setAlertMessage("Email or Password is wrong");

      setTimeout(() => {
        setAlertMessage(null);
      }, 1000); // 5 seconds
    }
  };
  // if redirect is true then it will redirect to home page
  if(redirect)
    {
      return <Navigate to={"/"} />
    }
  return (
    <div className='mt-4  grow flex items-center justify-around'>
      <div className='mb-32'>
      <h1 className='text-4xl text-center mb-4'>Login</h1>
      {/* form for login purpose */}
        <form className='max-w-md mx-auto ' onSubmit={handlesubmit}>
          <input type="email" placeholder='your@email.com' value={email} onChange={(e)=>{
            setEmail(e.target.value)
            // email
          }}/>
          <input type="password" placeholder='Password' value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          {/* password */}
          <button className='bg-primary p-2 w-full text-white rounded-2xl'>Login</button>
          <div className='text-center py-2 underline to-blue-500'>
          <Link to={'/user/new-password'}>Forget password</Link>
          </div>
          
          <div className='text-center py-2 text-gray-500 '>
            {/* used for redirect to register page to register account */}
            Don't have an account yet?<Link className='underline text-black' to={'/user/register'}>Register Now</Link>
        {/* This is a react component that renders a clickable link */}
          </div>
        </form>
        {/* alert message is the login credentials are correct or not */}
        {alertMessage && (
          <div className='mt-4 text-center text-red-500'>
            {alertMessage}
            </div>
        )}

      </div>
      
    </div>
  )
}

export default Loginpage