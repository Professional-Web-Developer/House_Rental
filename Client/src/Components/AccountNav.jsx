import React from 'react'
import Placespage from './Placespage.jsx'
import { Link, useLocation } from 'react-router-dom'

// account navigation for easy understand

const AccountNav = () => {
    const {pathname}=useLocation();
    let subpage=pathname.split('/')?.[3]
    let subpage1=pathname.split('/')?.[2]
    if(subpage===undefined && subpage1==='account')
    {
        subpage='profile'
    }
    if(subpage===undefined)
        {
            subpage='home'
        }


    // for add styles to elements
    function linkclasses(type=null){
        let classes= ' inline-flex  gap-1 py-2 px-6';
        if(type===subpage)
            {
                classes+=' bg-primary text-white rounded-full'
            }
        else{
            classes+=' bg-gray-200 rounded-full'
        }
            return classes;
        }
  return (
    <>
    <div>
    {/* redirect to new pages when we click the certain link*/}
    <nav className='w-full flex mt-5 justify-center mb-4 gap-2'>
        <Link className={linkclasses('home')} to={"/"}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        Home</Link> 
        {/* for home page */}
      
        <Link className={linkclasses('bookings')} to={'/user/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
        My Bookings</Link>
        {/* for bookings page */}
        <Link className={linkclasses('places')} to={'/user/account/places'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
        </svg>
        My Accomodations</Link>
        {/* for places page which all are posted by user */}
        <Link className={linkclasses('profile')} to={'/user/account'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        My Profile</Link>
        {/* for profile page */}
    </nav>
    
</div> 
    </>
  )
}

export default AccountNav