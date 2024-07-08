import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../UserContext'


const Header = () => {
  // usecontext is used to transfer the data from one component to another
  const {user}=useContext(UserContext)
  return (
    <div>
        <header className=' flex justify-between' >
          <Link to={'/'}className='flex items-center gap-1'>
            <img className='w-9 h-9 ' src="https://cartrabbit.io/wp-content/uploads/elementor/thumbs/cartrabbit_logo-pkzmj5imgyigk48dds0gvfykru9ke5f3ntqh4ssbjk.png" alt="cartrabbit" />
            <span className='font-bold text-xl pt-3' >Cartrabbit</span>
          </Link>
          {/* Logo for our web application */}
          <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
            <div >AnyWhere</div>
            <div className='border border-l border-gray-300'></div>
            <div>Any Week</div>
            <div className='border border-l border-gray-300'></div>

            <div>Add guests</div>
            
              <button className='bg-primary text-white p-1 rounded-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            
              </button>
              {/* Search button with icon  */}
          </div>
          {/* menu bar starts */}
          <Link to={user?'/user/account':'/user/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 '>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />

              </svg>

            </div>
          {/* for menu bar to register and user profile */}
          
          {/* check if user logged in or not */}
          {!!user && (
            <div>
              {user.name} 
            </div>
          )}
          
          </Link>

          
        </header>
    </div>
  )
}

export default Header