import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const Forgetpassword = () => {
    const {token}=useParams()
    const [message, setMessage] = useState('');
  const [error, setError] = useState('');
    const [password,setPassword]=useState('')
    const [redirect,setRedirect]=useState('')
    async function update(){
      try
        {
          const res=await axios.post(`/new-password/${token}`,{password})
        setMessage('Password updated');
      setError('');
      setRedirect('/user/login')
        }
        catch{
          setError('Something went wrong');
        }
    }
    if(redirect){
      return <Navigate to={redirect} />
    }
  return (
    <div className=' min-h-full p-20 text-center m-52 bg-green-300'>
        <h2 className='text-2xl'>Forget password</h2>
        <div className='mt-5 '>
        <label className='text-xl mr-5'>Enter new password</label>
        <input className='max-w-44' type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
        </div>
        <button className='bg-white p-2 mt-5' onClick={update}>Update Password</button>
        {message && <p className="text-green-500 mt-5">{message}</p>}
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}

export default Forgetpassword