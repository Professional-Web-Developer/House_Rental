import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Bookingwidget1 from './Bookingwidget1'
import Placegallery from './Placegallery'
import Addresslink from './Addresslink'
import { differenceInCalendarDays, format } from 'date-fns'

// for show the details of place and also contains the form for booking

const Singlebookingplace1 = () => {
    const { id } = useParams()
    const [places, setPlaces] = useState({})
    // check perks are available or not
    const perks = places && Array.isArray(places.perks) ? places.perks : [];

    // used to get the details for place

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/account/places/' + id).then(
            res => {
                setPlaces(res.data)
            }
        )
    }, [id])

    // for check the given date is valid or not

    const checkInDate = new Date(places.checkIn)
    const isValidCheckInDate = !isNaN(checkInDate.getTime())

    const checkOutDate = new Date(places.checkOut)
    const isValidCheckOutDate = !isNaN(checkOutDate.getTime())

    return (
        // details about place
        <>
            <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8 '>
                <h1 className='text-3xl'>{places.title}</h1>
                <Addresslink places={places} />
                <Placegallery places={places} />
                <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] '>
                    <div>
                        <div className='my-4'>
                            <h2 className='font-semibold text-2xl'>Description</h2>
                            {places.description}
                        </div>
                        Check-in: {isValidCheckInDate ? format(checkInDate, 'yyyy-MM-dd') : 'Invalid Date'} <br />
                        Check-out: {isValidCheckOutDate ? format(checkOutDate, 'yyyy-MM-dd') : 'Invalid Date'} <br />
                        Max Number of guests: {places.maxGuests}<br/>
                        Extra Features:
                        <div className='ml-5'>
                            {perks.length > 0 ? (
                            perks.map((perk, index) => (
                            <div key={index} >{perk}</div>
                            ))
                            ) : (
                            <div>No perks available</div>
                            )}
                        </div>
                        
                    </div>

                    <div>
                        {/* for booking form */}
                        <Bookingwidget1 places={places} />
                    </div>
                </div>
                <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <div>
                        {/* to show extra info */}
                        <h2 className='font-semibold text-2xl'>Extra info</h2>
                    </div>
                    <div className='mb-4 mt-2 text-sm text-gray-700 leading-4'>{places.extraInfo}</div>
                </div>
            </div>
        </>
    )
}

export default Singlebookingplace1
