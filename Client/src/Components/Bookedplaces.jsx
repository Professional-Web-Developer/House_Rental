import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Placeimg from './Placeimg';
import {differenceInCalendarDays, format} from 'date-fns'
import { Link } from 'react-router-dom';
import Bookingdates from './Bookingdates';

//used for show the booked details to owner under the owner place details updation page  


const Bookedplaces = ({id}) => {
    const [bookings, setBookings] = useState([]);  //for storing booking data
//how many users booked this place getting  by placeid
    useEffect(() => {
      axios.get(`/already/bookings/${id}`).then((response) => {  // for getting data from backend
        setBookings(response.data);
      });
    }, []);
  
    return (
      <div>
        <h1 className='text-2xl text-center mt-10'>BookedPlaces</h1>
        <div className='flex flex-col gap-3 '>
          {bookings.length > 0 && bookings.map((booking) => (     //for getting each data in variable and show from booked detils
            <Link to={`/user/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-100 rounded-2xl overflow-hidden' key={booking._id}> {/** links to redirect the page to view the details of specific booing */}
              <div className='w-48'>
                <Placeimg place={booking.place} />   
                {/* for getting images from url and show  */}
              </div>
              <div className='py-3 pr-3 grow'>
                <h2 className='text-xl'>{booking.place.title}</h2> 
                {/* for title */}
                <div className="text-xl">
                    <Bookingdates booking={booking} className='mb-1 mt-6 text-gray-500' />
                     {/* used to show the booked dates by user*/ }
                    <div className="flex gap-1">
                    
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>  
                      <span className="text-2xl">
                          {/* for total price they booked place as per the day calculation */}
                          Total Price: ${booking.price}
                      </span>
                    </div>
                </div>
              </div>
  
            </Link>
          ))}
        </div>
      </div>
    );
  }
  

export default Bookedplaces