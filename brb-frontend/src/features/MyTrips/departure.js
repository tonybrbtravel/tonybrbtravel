import React, { useState, useEffect, useRef } from 'react';

export const Departure = (date) => {
  const [timer, setTimer] = useState({
    days: 0,
    hours: '00',
    minutes: '00',
    timeUp: null,
  });
  useEffect(() => {
    setInterval(() => {
      const eventDate = +new Date(date?.date);
      const difference = +eventDate - +new Date();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      setTimer({
        hours: Math.abs(hours),
        minutes: Math.abs(minutes),
        days: Math.abs(days),
        timeUp: null,
      });
    }, 1000);
  });

  return (

    <div className="mytripbox-head">
      <div className="banner-trip-box">
        <div className="trip-count-title">
          <span />
          <h4>Departure</h4>
          <span />
        </div>
        <form>
          <ul className="d-flex">
            <li>
              <p>Days</p>
              <div className="banner-count-box">
                <input className="banner-count" type="text" value={timer.days} disabled />
              </div>
            </li>
            <li>
              <p>Hours</p>
              <div className="banner-count-box">
                <input className="banner-count" type="text" value={timer.hours} disabled />
              </div>
            </li>
            <li>
              <p>Min</p>
              <div className="banner-count-box">
                <input className="banner-count" type="text" value={timer.minutes} disabled />
              </div>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default Departure;
