import React, { useState, useRef, useEffect } from 'react';
import './MyTrips.less';

const TimeDisplay = (props) => {
  const [timeDays, setTimeDays] = useState('00');
  const [timeHours, setTimeHours] = useState('00');
  const [timeMins, setTimeMins] = useState('00');
  const [timeSecs, setTimeSec] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countsDownDate = new Date('July 31 2021 00:00:00').getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countsDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimeDays(days);
        setTimeHours(hours);
        setTimeMins(mins);
        setTimeSec(sec);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });
  const numberStyle = {
    fontWeight: '900',
    marginTop: '15px',
    fontSize: 'x-large',
  };

  const textStyle = {
    fontSize: 'xx-small',
  };

  const colorSemi = {
    color: 'white',
    marginTop: '20px',
  };
  const flexDisplay = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '75px',
  };
  return (
    <div style={flexDisplay}>
      <div className="hourDisplay">
        <p style={numberStyle}>{timeDays}</p>
        <p style={textStyle}>DAYS</p>
      </div>
      {' '}
      &nbsp;
      {' '}
      <span style={colorSemi}>:</span>
&nbsp;&nbsp;
      <div className="hourDisplay">
        <p style={numberStyle}>{timeHours}</p>
        <p style={textStyle}>HOURS</p>
      </div>
      {' '}
      &nbsp;&nbsp;
      {' '}
      <span style={colorSemi}>:</span>
&nbsp;&nbsp;
      <div className="hourDisplay">
        <p style={numberStyle}>{timeMins}</p>
        <p style={textStyle}>MIN</p>
      </div>
      {' '}
      &nbsp;&nbsp;
      {' '}
      <span style={colorSemi}>:</span>
&nbsp;&nbsp;
      <div className="hourDisplay">
        <p style={numberStyle}>{timeSecs}</p>
        <p style={textStyle}>SECS</p>
      </div>
    </div>
  );
};

export default TimeDisplay;
