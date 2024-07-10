import React, { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Placesformpage from './Placesformpage.jsx';
import axios from 'axios';
import {differenceInCalendarDays, format} from 'date-fns'

import Bookingdates from './Bookingdates.jsx';
import Bookedplaces from './Bookedplaces.jsx';

// for accomodations page to show all the places posted by owner

const Placespage = () => {
    const [places, setPlaces] = useState([]) //used to store the places details
        useEffect(()=>{
            // get the details of multiple places  from backend
            axios.get('/showplaces').then(({data})=>{
                setPlaces(data);
            })

        },[])
   
  return (
    <div>
        <div className='text-center'>
            {/* for adding new place */}
            <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full ' to={'/user/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add New Place
            </Link>

        </div>
        {/* used to show the user listed places in accomendations */}
        <div className=' flex flex-col gap-3 mt-4'>
            {places.length>0 && places.map((place,index)=>(
    //    if we click the data then we can link to the page of the specified id details
       <Link to={'/user/account/places/'+place._id} className='flex gap-4 bg-gray-100 p-4 rounded-2xl' key={index}>
                   <div className='flex max-w-32 h-32 bg-gray-300 grow shrink-0'>
                   {place.photos.length>0 && (
                        <img className='object-cover w-full h-full' src={'http://localhost:3069/user/uploads/'+place.photos[0]} alt="" />
                    )}
                    {/* images */}
                   </div>
                   <div className='grow-0 shrink '>
                        <h2 className='text-xl'>{place.title}</h2>
                         {/* heading */}
                        <p className='text-sm mt-3 mb-6 '>{place.description}</p>
                            {/* description */}
                            <div className={"flex gap-1 "}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                    {/* for calculate number of days in calendar */}
                    {/* {differenceInCalendarDays(new Date(place.checkOut),new Date(place.checIn) )} nights : 
                     */}
                     Avaiability:
                    <div className=' flex gap-1 items-center  ml-2'>
                    {/* for showing the dates of booked */}
                        <div className='flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                    {/* chek in date */}

                            {format(new Date(place.checkIn), 'yyyy-MM-dd')} 
                        </div>
                        &rarr; 
                        <div className='flex gap-1 items-center'>
                        
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>
                            {/* check out date */}
                            {format(new Date(place.checkOut), 'yyyy-MM-dd')} 
                        </div>
                    </div>
                    </div>
                   </div>
                                      
                </Link>
            ))}
        </div>
        

</div>
  );
}

export default Placespage