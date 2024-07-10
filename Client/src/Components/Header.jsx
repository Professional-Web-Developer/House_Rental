import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { SearchContext } from '../SearchContext';

// contains searchbar and user profile link and logo
// header of this place


const Header = () => {
  const { user } = useContext(UserContext);
  // for user details
  const { setSearchTerm } = useContext(SearchContext);
  // for search bar

  const [place, setPlace] = useState('');
  const [checkin, setCheckin] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = () => {
    setSearchTerm({ place, checkin, guests });
  };

  return (
    <div>
      <header className='flex justify-between '>
        <Link to={'/'} className='flex items-center gap-1 sm:mr-14'>
          <img className='w-9 h-9' src="https://cartrabbit.io/wp-content/uploads/elementor/thumbs/cartrabbit_logo-pkzmj5imgyigk48dds0gvfykru9ke5f3ntqh4ssbjk.png" alt="cartrabbit" />
          <span className='font-bold text-xl pt-3'>Cartrabbit</span>
        </Link>
        {/* link to index pge by clicking the image */}
        <div className='flex gap-2 border border-gray-300 rounded-full  px-2 shadow-md shadow-gray-300'>
          {/* input for search by place adress name */}
          <input
            type="text"
            placeholder="Place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="outline-none border-none"
          />
          {/* search by dates */}
          <div className='border border-l border-gray-300'></div>
          <input 
            type="date"
            placeholder="Checkin time"
            value={checkin}
            onChange={(e) => setCheckin(e.target.value)}
            className="outline-none border-none m-3"
          />
          {/* search by number of guests */}
          <div className='border border-l border-gray-300'></div>
          <input
            type="number"
            min={1}
            placeholder="Number of Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="outline-none border-none "
          />
          {/* search button to call the handlesearch function */}
          <button onClick={handleSearch} className='bg-white text-black  rounded-full text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        {/* link to user profile */}
        <Link to={user ? '/user/account' : '/user/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 sm:ml-8'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          </div>
          {/* for checking loggedin or not */}
          {!!user && <div>{user.name}</div>}
        </Link>
      </header>
    </div>
  );
};

export default Header;
