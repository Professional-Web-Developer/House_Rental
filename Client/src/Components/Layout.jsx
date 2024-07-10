import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import AccountNav from './AccountNav'
// A layout which is used to appear header and navigation bar  in every child
const Layout = () => {
  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
        <Header/>
        <AccountNav />
        <Outlet/>
        {/* An <Outlet> should be used in parent route elements to render their child route elements */}
    </div>
  )
}

export default Layout