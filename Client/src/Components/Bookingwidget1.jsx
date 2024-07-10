import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

    useEffect(() => {
        if (user) {
            setName(user.name)
        }
    }, [user])

    useEffect(() => {
        if (places._id) {
            axios.get(`/places/${places._id}/bookings`).then(res => {
                const dates = res.data.flatMap(booking => {
                    const { checkin, checkout } = booking
                    return eachDayOfInterval({ start: new Date(checkin), end: new Date(checkout) })
                })
                setBookedDates(dates)
            })

            axios.get(`/account/places/${places._id}`).then(res => {
                const { checkIn, checkOut } = res.data
                setStartDate(new Date(checkIn))
                setEndDate(new Date(checkOut))
            }).catch(error => {
                console.error('Error fetching place data:', error)
            })
        }
    }, [places._id])

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

    if (redirect) {
        return <Navigate to={redirect} />
    }

    if (checkin && checkout) {
        numberofdays = differenceInCalendarDays(new Date(checkout), new Date(checkin))
    }

    const isBooked = date => {
        return bookedDates.some(d => differenceInCalendarDays(d, date) === 0)
    }

    const isWithinAvailableDates = date => {
        return date >= startDate && date <= endDate
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
                Price: ${places.price} / per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='flex'>
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
                <div className='px-3 py-3 border-t'>
                    <label>Number of Guests:</label>
                    <input type='number' value={numberofguests} onChange={e => setNumberofguests(e.target.value)} />
                </div>
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
            <button onClick={bookthisplace} className='primary mt-4'>Book this place
                {numberofdays > 0 && (<span> &nbsp;{numberofdays * places.price}</span>)}
            </button>
        </div>
    )
}

export default Bookingwidget1
