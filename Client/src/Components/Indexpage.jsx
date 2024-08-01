import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { SearchContext } from '../SearchContext'; // Import SearchContext
import { UserContext } from '../UserContext'; // Import UserContext

// home page of this platform

const IndexPage = () => {
  const { searchTerm } = useContext(SearchContext); // Get searchTerm from context
  const { user } = useContext(UserContext); // Get user from context
  const [places, setPlaces] = useState([]); // Use to store places
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Get data from backend and store it in places variable
  useEffect(() => {
    axios.get('/home').then((response) => {
      setPlaces(response.data);
    });
  }, []);

  // Filter places based on search criteria
  const filteredPlaces = places.filter(place => {
    const { place: placeTerm, checkin, guests } = searchTerm;
    const placeMatch = placeTerm ? place.address.toLowerCase().includes(placeTerm.toLowerCase()) : true;
    const checkinMatch = checkin ? format(new Date(place.checkIn), 'yyyy-MM-dd') === checkin : true;
    const guestsMatch = guests ? place.maxGuests >= guests : true;

    return placeMatch && checkinMatch && guestsMatch;
  });

  const handlePlaceClick = (placeId) => {
    if (user) {
      navigate(`/user/home/place/${placeId}`);
    } else {
      navigate('/user/login');
    }
  };

  return (
    <>
      <div className="mt-4 grid gap-x-6 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredPlaces.length > 0 && filteredPlaces.map((place, index) => (
          <div key={index} onClick={() => handlePlaceClick(place._id)} className="cursor-pointer">
            {/* link for every single place in home page */}
            <div className="bg-white rounded-2xl flex flex-col">
              {/* cards for places */}
              {place.photos?.[0] && (
                <img
                  // to check and get places
                  className="rounded-2xl object-cover aspect-square w-full h-52"
                  src={`http://localhost:3069/user/uploads/${place.photos[0]}`}
                  alt=""
                />
              )}
              <div className="p-2">
                <h2 className="font-bold ">{place.address}</h2>
                {/* address of place */}
                <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
                {/* title of place */}
                <div className="mt-1">
                  {/* price of place */}
                  <span className="font-bold ">&#8377;{place.price} / day</span>
                </div>
                <div className='flex items-center'>
                  {/* for showing the dates of booked */}
                  <div className='flex gap-1 items-center text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    {/* check in date */}
                    {format(new Date(place.checkIn), 'yyyy-MM-dd')}
                  </div>
                  &rarr;
                  <div className='flex gap-1 items-center text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                    </svg>
                    {/* check out date */}
                    {format(new Date(place.checkOut), 'yyyy-MM-dd')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default IndexPage;
