import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby'

import Colors from '../../../../themes/Colors';
import Timings from '../../../../themes/Timings';
import Metrics from '../../../../themes/Metrics';
import Breakpoints from '../../../../themes/Breakpoints';
import Decorations from '../../../../themes/Decorations';

const Wrapper = styled.div`
  color: ${Colors.white};
  font-size: 4vw;
  font-weight: 700;
  display: grid;
  grid-template-columns: 2em 2em 2em 2em 2em 2em 2em;
  grid-template-rows: 2em 2em 2em 2em;
  grid-column-gap: .25em;
  grid-row-gap: .25em;
  filter: drop-shadow(${Decorations.shadow.default});
  pointer-events: none;
  margin: ${Metrics.smallSpacer} auto;
  user-select: none;

  @media (min-width: ${Breakpoints.medium}) {
    margin-top: auto;
    margin-bottom: ${Metrics.smallSpacer};
    margin-right: ${Metrics.massiveSpacer};
    font-size: 2vw;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: .125em .25em;
  width: 2em;
  height: 2em;
  transition:
    color ${Timings.transition.slow} ease-in-out,
    border ${Timings.transition.slow} ease-in-out;

  &.active {
    color: ${Colors.red};
    border: 1px solid ${Colors.white};
  }
`;

const randomiseArray = (size, minActive = 0, maxActive) => {
  maxActive = Math.max(minActive, Math.min(size, maxActive || size));
  const numberActive = Math.floor(Math.random() * (maxActive - minActive + 1) + minActive);
  const offset = Math.floor(Math.random() * (size - numberActive + 1));
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(i >= offset && i < offset + numberActive);
  }
  return arr;
};

const defaultSettings = {
  startDay: 4, // Offset of first date on the calendar
  startDate: 11,
  endDate: 27,
  minDuration: 2,
  maxDuration: 6,
};

const Calendar = () => {

  const queryResult = useStaticQuery(
    graphql`
      {
        contentfulConfigurationItem(name: {eq: "How it works - calendar"}) {
          data {
            startDay
            startDate
            endDate
            minDuration
            maxDuration
           }
         }
       }
  `);

  const settings = {...defaultSettings};

  if (queryResult.contentfulConfigurationItem) {
    Object.assign(settings, queryResult.contentfulConfigurationItem.data);
  }

  const {startDay, startDate, endDate, minDuration, maxDuration} = settings;

  const [activeArray, setActiveArray] = useState(randomiseArray(endDate - startDate + 1, minDuration, maxDuration));

  const buffer = [];
  for (let i = 0; i < startDay; i++) {
    buffer.push(<Item key={i}/>);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArray(randomiseArray(endDate - startDate + 1, minDuration, maxDuration));
    }, 2000);
    return () => clearInterval(interval);
  }, [startDate, endDate, minDuration, maxDuration]);

  return <Wrapper>

    { buffer }

    { activeArray.map( (value, index) =>
      <Item key={index} className={ value ? ' active': '' }>
        { startDate + index }
      </Item>
    ) }

  </Wrapper>;
};

export default Calendar;
