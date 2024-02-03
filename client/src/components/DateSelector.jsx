import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './DateSelector.module.css'

const DateSelector = ({dateChange, selectedDate, onDateBlur, name}) => {
    return (
      <DatePicker 
        selected={selectedDate}
        onBlur={onDateBlur}
        onChange={(date) => {dateChange(date)}}
        calendarClassName={classes['react-datepicker']}
        placeholderText="Select Date"
        name={name}
      />
    );
  };

export default DateSelector