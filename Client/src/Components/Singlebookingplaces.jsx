import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Addresslink from './Addresslink';
import Placegallery from './Placegallery';
import Bookingdates from './Bookingdates';
import Singlebookingplace1 from './singlebookingplace1';

// used to show the detailed booked details of user

const Singlebookingplaces = () => {
  const {id}=useParams();
  const [booking,setBooking]=useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    try{
    const fb=async()=>{
    if(id)
    {
      const usebooking=await axios.get('/bookings');
      setBooking(usebooking.data.find((booking)=>booking._id===id));
      
    }
    // get details of specific booked id
  }
  fb();
}
catch(err)
{
  console.log(err);
}
  },[]);

  const cancelBooking = async () => {
    try {
      await axios.delete(`/cancel-bookings/${id}`);
      navigate('/user/account/bookings') // Redirect to the bookings list page
    } catch (err) {
      console.log(err);
    }
  };
  if(!booking)
  {
    return ' ';
  }
  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <Addresslink places={booking.place} />
      {/* address link */}
      <div className='bg-gray-100 p-6 my-6 rounded-2xl flex items-center justify-between'>
        <div>
          <h2 className='text-2xl mb-4'>Your Booking Information</h2>
          <Bookingdates booking={booking} />
          {/* booked dates */}
        </div>

        <div className='flex flex-row gap-2'>
          
        <button onClick={cancelBooking} className='bg-red-500 p-6 text-white rounded-2xl'>
          <div >
            Cancel
            {/* for price */}
          </div>
          <div className='text-3xl'>
            &#8377;{booking.price}
          </div>
          
        </button>
        
        <div className='bg-primary p-6 text-white rounded-2xl'>
          <div >
            Total Price
            {/* for price */}
          </div>
          <div className='text-3xl'>
            &#8377;{booking.price}
          </div>
          
        </div>

        </div>

        {/* <div className='bg-primary p-6 text-white rounded-2xl'>
          <div >
            Total Price
            {/* for price */}
          {/*</div>
          <div className='text-3xl'>
            &#8377;{booking.price}
          </div>
          
        </div>*/}
      </div>
      <Placegallery places={booking.place}/>   
      {/* to show the images of specified places */}
        


    </div>
  )
}

export default Singlebookingplaces