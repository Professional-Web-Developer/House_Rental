import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

const Bookingwidget1 = ({ place, bookedDates }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isDateBooked = date => {
    return bookedDates.some(booking => {
      const checkin = new Date(booking.checkin);
      const checkout = new Date(booking.checkout);
      return date >= checkin && date <= checkout;
    });
  };

  const isOutsideRange = date => {
    return isDateBooked(date);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        inline
        filterDate={isOutsideRange}
        minDate={new Date()}
        placeholderText="Check-in date"
      />
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        inline
        filterDate={isOutsideRange}
        minDate={addDays(startDate, 1)}
        placeholderText="Check-out date"
      />
      {/* Add additional booking form elements here */}
    </div>
  );
};

export default Bookingwidget1;
