import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// for booking form


const Bookingwidget1 = ({ places }) => {
    const [checkin, setCheckin] = useState(null)
    const [checkout, setCheckout] = useState(null)
    const [numberofguests, setNumberofguests] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState()
    const [bookedDates, setBookedDates] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const { user } = useContext(UserContext)
    let numberofdays = 0

// for check user available or not


    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])

// for get details of bookings of the specified place


    useEffect(() => {
        if (places._id) {
            axios.get(`/places/${places._id}/bookings`).then(res => {
                const dates = res.data.flatMap(booking => {
                    const { checkin, checkout } = booking
                    return eachDayOfInterval({ start: new Date(checkin), end: new Date(checkout) })
                })
                setBookedDates(dates)
            })

// for getting details of places

            axios.get(`/account/places/${places._id}`).then(res => {
                const { checkIn, checkOut } = res.data
                setStartDate(new Date(checkIn))
                setEndDate(new Date(checkOut))
            }).catch(error => {
                console.error('Error fetching place data:', error)
            })
        }
    }, [places._id])


    // for booking function and set the redirect path



    async function bookthisplace() {
        const data = {
            checkin, checkout, numberofguests, name, mobile,
            place: places._id,
            price: numberofdays * places.price
        }
        const bookings = await axios.post('/home/bookings', data)
        const bookingid = bookings.data._id
        setRedirect(`/user/account/bookings/${bookingid}`)
    }

// after booking redirect


    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (checkin && checkout) {
        numberofdays = differenceInCalendarDays(new Date(checkout), new Date(checkin))
    }

// to get the booked dates to hide in calendar for booking

    const isBooked = date => {
        return bookedDates.some(d => differenceInCalendarDays(d, date) === 0)
    }

    // to show the calendar dates within range filter process

    const isWithinAvailableDates = date => {
        return date >= startDate && date <= endDate
    }

    return (
        // to show the details of place
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
                Price: ${places.price} / per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='flex'>
                    {/* for check in date picker */}
                    <div className='py-4 px-4'>
                        <label>Check in:</label>
                        <DatePicker
                            selected={checkin}
                            onChange={date => setCheckin(date)}
                            selectsStart
                            startDate={checkin}
                            endDate={checkout}
                            minDate={startDate}
                            maxDate={endDate}
                            excludeDates={bookedDates}
                            filterDate={isWithinAvailableDates}
                            dateFormat='yyyy-MM-dd'
                        />
                    </div>
                    {/* for check out date picker calendar*/}
                    <div className='py-4 px-4 border-l'>
                        <label>Check out:</label>
                        <DatePicker
                            selected={checkout}
                            onChange={date => setCheckout(date)}
                            selectsEnd
                            startDate={checkin}
                            endDate={checkout}
                            minDate={checkin}
                            maxDate={endDate}
                            excludeDates={bookedDates}
                            filterDate={isWithinAvailableDates}
                            dateFormat='yyyy-MM-dd'
                        />
                    </div>
                </div>
                {/* number of guests */}
                <div className='px-3 py-3 border-t'>
                    <label>Number of Guests:</label>
                    <input type='number' value={numberofguests} onChange={e => setNumberofguests(e.target.value)} />
                </div>
                {/* to check the user give the correct date */}
                {numberofdays > 0 && (
                    <>
                        <div className='px-3 py-3 border-t'>
                            <label>Your Full Name:</label>
                            <input type='text' value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='px-3 py-3 border-t'>
                            <label>Your Mobile:</label>
                            <input type='tel' value={mobile} onChange={e => setMobile(e.target.value)} />
                        </div>
                    </>
                )}
            </div>
            {/* button for booking with some constraints */}
            <button onClick={bookthisplace} className='primary mt-4'>Book this place
                {numberofdays > 0 && (<span> &nbsp; ${numberofdays * places.price}</span>)}
            </button>
        </div>
    )
}

export default Bookingwidget1
