import { useEffect, useState } from "react";
import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Perks from './Perks.jsx'
import Photosuploader from './Photosuploader.jsx';
import axios from 'axios';

const Placesformpage = () => {      //to store the data of places
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [description,setDescription]=useState('');
    const [addedphotos,setAddedphotos]=useState('');
    const [perks,setPerks]=useState([])
    const [extrainfo,setExtrainfo]=useState('')
    const [checkin,setCheckin]=useState('');
    const [checkout,setCheckout]=useState('');
    const [maxguests,setMaxguests]=useState(1);
    const [price,setPrice]=useState(100)
    const [redirect,setRedirect]=useState(false)

    useEffect(()=>{
        if(!id){            //check if id or not to find new data or update
            return ;
        }
        axios.get('/account/places/'+id).then(           //to get the specified data and show for update
            response=>{
                const {data}=response;
                console.log(data)
                setTitle(data.title);
                setAddress(data.address);
                setDescription(data.description);
                setAddedphotos(data.photos);
                setPerks(data.perks);
                setExtrainfo(data.extraInfo);
                setCheckin(data.checkIn);
                setCheckout(data.checkOut);
                setMaxguests(data.maxGuests);
                setPrice(data.price)
            }
        )
    },[id])

// functions to header2 and paragraph for form because of easy understanding
    // function for header element
    function inputHeader(text){
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }
    // function for paragraph element
    function inputText(text){
        return(
            <p className='text-gray-500 text-sm'>{text}</p>
        )
        }
        // function to combine header and description
    function preinput(header,description)
    {
        return (
            <>
            {inputHeader(header)}
            {inputText(description)}

            </>
        )
    }



    // function for add new place in backend form submission
    const saveplace=async(e)=>{
        e.preventDefault();
        const placedata={
            title,address,addedphotos,description,perks,checkin,checkout,extrainfo,maxguests,price
        }
        if(id){
            const data={id,
                ...placedata
            };
        const {responsedata}=await axios.put('/addplaces/',data)
        setRedirect(true)
        }
        else{
        const {responsedata}=await axios.post('/addplaces',placedata)
        setRedirect(true)

        }
        
    }
// if add places it navigate to places accomedation page
    if(redirect)
    {
        return <Navigate to={'/user/account/places'} />
    }

  return (
    <>
        <div>
            <form onSubmit={saveplace}>
                    {preinput('Title','Title for your place. should be short and catchy as in advertisement')}
                    <input type="text" placeholder="Title,for example:Web is my favorite" value={title} onChange={(e)=>{
                        setTitle(e.target.value)
                    }}/>
                    {preinput('Address','Address to this place')}
                    <input type="text" placeholder='Address' value={address} onChange={(e)=>{
                        setAddress(e.target.value)
                    }
                    }/>
                    
                    <Photosuploader addedphotos={addedphotos} onChange={setAddedphotos}/>  
                    {/* for photo link upload and photo upload */}
                   
                    {preinput('Description','Description of your place')}
                    <textarea value={description} onChange={(e)=>{
                        setDescription(e.target.value)
                    }} placeholder='Description'/>
                    {preinput('Perks','Select perks of your place')}
                    <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6' >
                    {/*  for easy understanging we take pers checksbox inputs as new component */}

                        <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    
                    {preinput('Extra-Info','house rules,etc')}
                    <textarea value={extrainfo} onChange={e=>{
                        setExtrainfo(e.target.value)
                    }}/>
                    {preinput('Check In&Out times','add check in and out times,remember to have some window for cleaning the room between guests')}
                    <div className='grid gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 mb-8'>
                        <div className='flex'>
                            <div className='py-4 px-4'>
                                <label >Check in:</label>
                                {/* check out date */}
                                <input type="date" value={checkin} onChange={e=>setCheckin(e.target.value)}/>
                            </div>
                            <div className=' py-4 px-4 border-l'>
                                <label >Check out:</label>
                                {/* check in date */}
                                <input type="date" value={checkout} onChange={e=>setCheckout(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                            <input type="number" placeholder='1'value={maxguests} onChange={e=>{
                                setMaxguests(e.target.value)
                            }}/>
                            {/* for max number of guests */}
                        </div>
                        <div>
                            <h3 className='mt-2 -mb-1'>Price</h3>
                            <input type="number" placeholder='100'value={price} onChange={e=>{
                                setPrice(e.target.value)
                            }}/>
                            {/* for price */}
                        </div>
                        
                    </div>
                    <button className='primary'>Save</button>
                </form>
            </div>
        
    </>
  )
}

export default Placesformpage