import './App.css'
import { Route,Routes } from 'react-router-dom'
import  Indexpage  from './Components/Indexpage'
import Loginpage from './Components/Loginpage'
import Layout from './Components/Layout'
import Registerpage from './Components/Registerpage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './Components/Profile'
import Placespage from './Components/Placespage'
import Placesformpage from './Components/Placesformpage'
import Singlepage from './Components/Singlepage'
import Bookingspage from './Components/Bookingspage'
import Singlebookingplaces from './Components/Singlebookingplaces'
import Forgetpassword from './Components/Forgetpassword'
import Forgetpasswordemail from './Components/Forgetpasswordemail'
axios.defaults.baseURL='http://localhost:3069/user'
axios.defaults.withCredentials=true

function App() {
 

  return (
    // UserContextProvider function is used for share data across the component tree.
    <UserContextProvider>
    {/* Routes are used to redirect the page depend upon path which we given in url and also element is specified page */}
          <Routes>
            <Route path='/' element={<Layout/>}>
            {/* Layout is used to parent route element render the child element  */}
            <Route index element={<Indexpage/>}/>
            <Route path='/user/login' element={<Loginpage/>}/> 
            {/* for login page */}
            <Route path='/user/register' element={<Registerpage/>}/>
            {/* for registration page */}
            <Route path='/user/account' element={<Account/>}/>
            {/* for user accound details like profile or bookings or accomendatations */}
            <Route path='/user/account/places' element={<Placespage/>}/>
            {/* for in user profile user can see the places tab here they can add places and update places */}
            <Route path='/user/account/places/new' element={<Placesformpage/>}/>
            {/* for add new places */}
            <Route path='/user/account/places/:id' element={<Placesformpage/>}/>
            {/* for update place */}
            <Route path='/user/home/place/:id' element={<Singlepage />} />
            {/* in index page they can visit specific place cards */}
            <Route path='/user/account/bookings' element={
              <Bookingspage />
            } />
            <Route path='/user/account/bookings/:id' element={
              <Singlebookingplaces />
            } />
            {/* here they can see the user specific booking details */}
            
            </Route>
            <Route path='/user/forget-password/:token' element={
              <Forgetpassword />
            }/>
            <Route path='/user/new-password' element={
              <Forgetpasswordemail />
            }/>
           
          </Routes>
    </UserContextProvider>

  )
}

export default App
