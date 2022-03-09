import React from 'react';
import './MyTrips.less';
import TimeDisplay from './TimeDisplay';

const Label = (props) => {
  const buttonStyle = {
    width: '284px',
    height: '54px',
    top: '3656px',
    left: '584px',
    borderRadius: '4px',
    backgroundColor: '#E94560',
    color: 'white',
    marginTop: '172px',
  };
  return (
    <div style={{ marginTop: '36px' }}>
      <div className="divSizing">
        <h3>{props.label}</h3>
        <div className="box-scale" />
      </div>

      <TimeDisplay />

      <button style={buttonStyle}>
        View Trip
        <br />
        <small>Earn Points</small>
      </button>
    </div>
  );
};

export default Label;
