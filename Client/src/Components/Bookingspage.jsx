import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Placeimg from './Placeimg';
import { Link, Navigate } from 'react-router-dom';
import Bookingdates from './Bookingdates';
import { UserContext } from '../UserContext';

// Used to show all the booked places of the specified user

function Bookingspage() {
  const [bookings, setBookings] = useState([]); // For storing booking data
  const { ready, user } = useContext(UserContext); // Access ready and user from UserContext

  // Fetch all bookings of the specified user
  useEffect(() => {
    axios.get('/bookings').then((response) => {
      // For getting data from backend which all are booked by user
      setBookings(response.data);
    });
  }, []);

  // Show loading message while user context is not ready
  if (!ready) {
    return <div>Loading...</div>;
  }

  // Redirect to login page if user is not logged in
  if (ready && !user) {
    return <Navigate to="/user/login" />;
  }

  return (
    <div>
      <div className='flex flex-col gap-3 '>
        {bookings.length > 0 && bookings.map((booking) => (
          // For getting each booking data and show all booked places
          <Link to={`/user/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-100 rounded-2xl overflow-hidden' key={booking._id}>
            <div className='w-48'>
              {booking.place && <Placeimg place={booking.place} />}
              {/* For displaying images of the booked place */}
            </div>
            <div className='py-3 pr-3 grow'>
              {booking.place ? (
                <>
                  <h2 className='text-xl'>{booking.place.title}</h2>
                  {/* Display the title of the place */}
                  <div className="text-xl">
                    <Bookingdates booking={booking} className='mb-1 mt-6 text-gray-500' />
                    {/* Display the booking dates */}
                    <div className="flex gap-1">
                      {/* Used to show the booked dates by user */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                      </svg>
                      <span className="text-2xl">
                        {/* Display the total price */}
                        Total Price: &#8377;{booking.price}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                // Display a message if place information is missing
                <div className='text-red-500'>Place information is missing</div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Bookingspage;
