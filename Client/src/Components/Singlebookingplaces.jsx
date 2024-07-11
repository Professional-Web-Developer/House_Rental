import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Addresslink from './Addresslink';
import Placegallery from './Placegallery';
import Bookingdates from './Bookingdates';

const Singlebookingplaces = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [cancellationFee, setCancellationFee] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (id) {
          const usebooking = await axios.get('/bookings');
          setBooking(usebooking.data.find((booking) => booking._id === id));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooking();
  }, [id]);

  const handleCancelBooking = async () => {
    try {
      const response = await axios.get(`/cancel-bookings/${id}`);
      setCancellationFee(response.data.cancellationFee);
      setShowConfirmation(true);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmCancellation = async () => {
    try {
      await axios.delete(`/cancel-bookings/${id}`);
      navigate('/user/account/bookings');
    } catch (err) {
      console.log(err);
    }
  };

  if (!booking) {
    return ' ';
  }

  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <Addresslink places={booking.place} />
      <div className='bg-gray-100 p-6 my-6 rounded-2xl flex items-center justify-between'>
        <div>
          <h2 className='text-2xl mb-4'>Your Booking Information</h2>
          <Bookingdates booking={booking} />
        </div>
        <div className='flex flex-row gap-2'>
          <button onClick={handleCancelBooking} className='bg-red-500 p-6 text-white rounded-2xl'>
            <div>Cancel</div>
            <div className='text-3xl'>&#8377;{booking.price}</div>
          </button>
          <div className='bg-primary p-6 text-white rounded-2xl'>
            <div>Total Price</div>
            <div className='text-3xl'>&#8377;{booking.price}</div>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className='bg-yellow-100 p-6 my-6 rounded-2xl'>
          <h2 className='text-2xl mb-4'>Confirm Cancellation</h2>
          <p>The cancellation fee is &#8377;{cancellationFee}. Are you sure you want to cancel this booking?</p>
          <button onClick={confirmCancellation} className='bg-red-500 p-2 text-white rounded-2xl'>Confirm Cancellation</button>
        </div>
      )}
      <Placegallery places={booking.place} />
    </div>
  );
};

export default Singlebookingplaces;
