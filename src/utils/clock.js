/* eslint-disable react/style-prop-object */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

function Clock() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = dateTime.toLocaleDateString();

  return (
    <div style={{ color: 'black' }}>
      <div>{formattedTime}</div>
      <div>{formattedDate}</div>
    </div>
  );
}

export default Clock;