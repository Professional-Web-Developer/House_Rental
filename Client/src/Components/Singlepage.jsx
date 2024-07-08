import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Bookingwidget from './Bookingwidget'
import AccountNav from './AccountNav'
import Placegallery from './Placegallery'
import Addresslink from './Addresslink'
import {differenceInCalendarDays, format} from 'date-fns'



const Singlepage = () => {
    const {id} = useParams()
    const [places,setPlaces]=useState({})
    
    useEffect(()=>{
        if(!id){
            return;
        }
        // to get specified places from backend
        axios.get('/account/places/'+id).then(
            res=>{
                setPlaces(res.data)
                // console.log(res.data)
            }
        )
    },[id]);
    const checkInDate = new Date(places.checkIn);
  const isValidCheckInDate = !isNaN(checkInDate.getTime());

  const checkOutDate = new Date(places.checkOut);
  const isValidCheckOutDate = !isNaN(checkOutDate.getTime());

    
  return (
    <>
    <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8 '>

        <h1 className='text-3xl'>{places.title}</h1>
       {/* to get location of that place  in google map */}   
      <Addresslink places={places} />
       <Placegallery places={places}/>
      {/* for booking details */}
            <div className=' mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] '>
                
            
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {places.description}
                    </div>
                    
                    Check-in: {isValidCheckInDate ? format(checkInDate, 'yyyy-MM-dd') : 'Invalid Date'} <br/>
      Check-out: {isValidCheckOutDate ? format(checkOutDate, 'yyyy-MM-dd') : 'Invalid Date'} <br/>
                    Max Number of guests:{places.maxGuests}
                </div>
                <div>
                    {/* used to get the details from user */}
                    <Bookingwidget places={places}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div >
                <h2 className='font-semibold text-2xl'>Extra info</h2>
            </div>
            <div className=' mb-4 mt-2 text-sm text-gray-700 leading-4'>{places.extraInfo}</div>
            </div>
            

    </div>
    </>
  )
}

export default Singlepage