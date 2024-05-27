import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '16px',
  marginTop: '8px',
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}40`,
  },
}));



const TimeSelector = ({ onSelectTime }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const formatTime = (time) => {
    if (!time) return null;
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    onSelectTime(formatTime(time));
  };

  return (
    <Box mb={2}>
      <Typography>
        Select a Time
      </Typography>
      <StyledDatePicker
        selected={selectedTime}
        onChange={handleTimeChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="h:mm aa"
        placeholderText="Select a time"
      />
    </Box>
  );
};

export default TimeSelector;
