import React from 'react';
import './MyTrips.less';
import { BsFillBriefcaseFill } from 'react-icons/bs';

const WeekesDropHeading = (props) => {
  const briefCaseDesign = {
    color: 'white',
    width: '46px',
    height: '70px',
    marginLeft: '91px',
  };
  return (
    <>
      <BsFillBriefcaseFill style={briefCaseDesign} />
    </>
  );
};

export default WeekesDropHeading;
