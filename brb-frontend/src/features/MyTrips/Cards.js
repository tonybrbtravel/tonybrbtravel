import React from 'react';
import './MyTrips.less';
import logo from './image/aeroplane.png';
import tick from './image/tick.png';

const Cards = (props) => {
  const imageSection = {
    width: '366px',
    height: '300px',
  };

  const textSection = {
    width: '366px',
    height: '412px',
  };

  const flexDirectionDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const durationButton = {
    width: '366px',
    height: '58px',
    backgroundColor: '#E94560',
    color: 'white',
  };

  const tripDetailsHeading = {
    marginLeft: '35px',
    paddingTop: '40px',
  };

  const buttonStyle = {
    width: '284px',
    height: '54px',
    marginLeft: '42px',
    borderRadius: '4px',
    backgroundColor: '#E94560',
    color: 'white',
    marginTop: '28px',
  };

  return (
    <>
      <div style={flexDirectionDiv}>
        <div style={imageSection} className="cardImage" />
        <div style={textSection}>
          <button type="button" style={durationButton}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}
            >
              Nov17,2020 Friday
              <img src={logo} alt="aeroplane" />
              Nov17,2020 Friday
            </div>
          </button>
          <div className="cardBcakground">
            <h2 className="tripDetails">Trip Details : </h2>
            <div
              style={{
                boreder: '1px solid blue',
                width: '364px',
                height: '200px',
                marginTop: '50px',
                paddingLeft: '40px',
              }}
            >
              <p>
                <img src={tick} alt="Tick" />
                {' '}
                Travel for 2 people
              </p>
              <p>
                <img src={tick} alt="Tick" />
                {' '}
                From London Gatwick
              </p>
              <p>
                <img src={tick} alt="Tick" />
                {' '}
                Your Flights & Hotel included
              </p>
              <p>
                <img src={tick} alt="Tick" />
                {' '}
                Deluxe double rooms
              </p>
              <p>
                <img src={tick} alt="Tick" />
                {' '}
                ATOL protected
              </p>
            </div>
            <button type="button" style={buttonStyle}>View Trip</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
