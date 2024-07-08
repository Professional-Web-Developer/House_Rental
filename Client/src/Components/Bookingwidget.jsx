import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
// used to get the booking details from user
const Bookingwidget= ({places,bookedDates}) => {
    const [checkin,setCheckin]=useState('')
    const [checkout,setCheckout]=useState('')
    const [numberofguests,setNumberofguests]=useState(1)
    const [name,setName]=useState('')
    const [mobile,setMobile]=useState('')
    const [redirect,setRedirect]=useState()
    const {user}=useContext(UserContext)  
    // check if user logged in or not
    let numberofdays=0;
    // to fill the user name in booking area automatically
    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])
    // used to calculate number days they need to book a place
    async function bookthisplace()
    // used for connect backend to store the details of bookings after click submit button
    {
        const data={checkin,checkout,numberofguests,name,mobile,
            place:places._id,
            price:numberofdays*places.price
        }
        // backend connection
        const bookings=await axios.post('/home/bookings',data)
        const bookingid=bookings.data._id;
        // after finish booking reddirect page
        setRedirect(`/user/account/bookings/${bookingid}`)
    }
    // check if we have redirect page or not if we have we need to navigate
    if (redirect){
        return <Navigate to={redirect} />
    }
// if we have can check user can fill the check in and checkout date to calculate price
    if(checkin && checkout)
    {
        numberofdays=differenceInCalendarDays(new Date(checkout),new Date(checkin))
    }
  return (
    // form for booking
    < div className='bg-white shadow p-4 rounded-2xl'>
        <div className='text-2xl text-center'>
            Price:${places.price} / per night
            {/* price per night */}
        </div>
        <div className='border rounded-2xl mt-4'>
            <div className='flex'>
                <div className='py-4 px-4'>
                    <label >Check in:</label>
                    {/* check out date */}
                    <input type="date" value={checkin} onChange={e=>setCheckin(e.target.value)}/>
                </div>
                <div className=' py-4 px-4 border-l'>
                    <label >Check out:</label>
                    {/* check in date */}
                    <input type="date" value={checkout} onChange={e=>setCheckout(e.target.value)}/>
                </div>
            </div>
            <div className='px-3 py-3 border-t'>
                <label>Number ofGuests:</label>
                {/* number of guests  */}
                <input type="number" value={numberofguests} onChange={e=>setNumberofguests(e.target.value)} />
            </div>
            <div>
                {numberofdays>0 &&(
                    <>
                        <div className='px-3 py-3 border-t'>
                            <label>your full name:</label>
                            {/* full name */}
                            <input type="text" value={name} onChange={e=>setName(e.target.value)} />
                        </div>
                        <div className='px-3 py-3 border-t'>
                            <label>your Mobile:</label>
                            {/* mobile number */}
                            <input type="tel" value={mobile} onChange={e=>setMobile(e.target.value)} />
                        </div>
                    </>
                ) }

            </div>
        </div>
        <button onClick={bookthisplace} className='primary mt-4'>Book this place  
            {numberofdays>0 && (<span> &nbsp;{ numberofdays*places.price}</span>)}</button>
    </div>
  )
}

export default Bookingwidget
