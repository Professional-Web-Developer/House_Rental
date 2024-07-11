import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

// for user registration

const Registerpage = () => {
  // here we can use "useState hook to track state in a function component "
  // one  is variable and another is function to change the value and store it in varialbe
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [mobile,setMobile]=useState('')
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState('')
  const [alertMessage, setAlertMessage] = useState(null);
  // function to manage register when they click the register button
  const handlesubmit=async(e)=>{
    e.preventDefault()
    try
    {
      // axios is used to conncet the client and server or frontend and backend
    await axios.post('/register',{
      name,
      email,
      mobile,
      password
    });
    
    setAlertMessage("User created successfully. Now you can login");

    setTimeout(() => {
      setAlertMessage(null);
      setRedirect(true);
    }, 500); // 5 seconds
  } catch (err) {
    setAlertMessage("Email or Mobile Number already exists");

    setTimeout(() => {
      setAlertMessage(null);
    }, 2000); // 5 seconds
  }
};

  // redirect is used to redirect the page from register to login
  if(redirect)
    {
      return <Navigate to={'/user/login'}/>
    }
  return (
    <div className='mt-4  grow flex items-center justify-around'>
      <div className='mb-32'>
      <h1 className='text-4xl text-center mb-4' >Register</h1>
      {/* form for registration purpose */}
        <form className='max-w-md mx-auto ' onSubmit={handlesubmit}>
          {/* onSubmit works when we click the submit button in the form it calls the handle submit function */}
            <input type="text" autoComplete='off' required placeholder='John Doe' value={name} onChange={e=>{
              setName(e.target.value)
            }} />
            {/* onchange is used to store the value in the variable by using useState hook */}
          <input type="email" autoComplete='off' required placeholder='your@email.com' value={email} onChange={e=>{
            setEmail(e.target.value)
          }}  />
          {/* email */}
          <input type="number" autoComplete='off' required placeholder='Mobile' value={mobile}  onChange={e=>{
            setMobile(e.target.value)
          }}  />
          {/* mobile */}
          <input type="password" autoComplete='off' required placeholder='Password' value={password}  onChange={e=>{
            setPassword(e.target.value)
          }}  />
          {/* password */}
          <button className='bg-primary p-2 w-full text-white rounded-2xl'>Register</button>

          <div className='text-center py-2 text-gray-500 '>
            Already a member?<Link className='underline text-black' to={'/user/login'}>Login now</Link>
            {/* if we already have an account we can login here */}
        {/* This is a react component that renders a clickable link */}
          </div>
        </form>
        {alertMessage && (
          // alert message for show the status to user
          <div className='mt-4 text-center text-red-500'>
            {alertMessage}
          </div>
        )}

      </div>
      
    </div>
    )
}

export default Registerpage