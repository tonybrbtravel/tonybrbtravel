import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby'
import { shuffle } from 'lodash';

import Colors from '../../../../themes/Colors';
import Timings from '../../../../themes/Timings';
import Metrics from '../../../../themes/Metrics';
import Decorations from '../../../../themes/Decorations';
import Breakpoints from '../../../../themes/Breakpoints';

const Wrapper = styled.div`
  color: ${Colors.black};
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  pointer-events: none;
  user-select: none;
  margin: ${Metrics.smallSpacer};
  margin-left: auto;
  filter: drop-shadow(${Decorations.shadow.default});

  @media (min-width: ${Breakpoints.medium}) {
    margin-top: auto;
    margin-left: ${Metrics.bigSpacer};
    margin-right: auto;
  }
`;

const Item = styled.div`
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: .25em .5em;
  margin: .1em 0;
  white-space: nowrap;
  transition:
    color ${Timings.transition.slow} ease-in-out,
    border ${Timings.transition.slow} ease-in-out;

  &.active {
    color: ${Colors.white};
    border: 1px solid ${Colors.white};
  }
`;

const defaultItems = [
  "Culture",
  "Romance",
  "Nightlife",
  "Beach",
  "Good Eats",
  "Relax"
];

const randomiseArray = (size, minActive = 0, maxActive) => {
  maxActive = Math.max(minActive, Math.min(size, maxActive || size));
  const numberActive = Math.floor(Math.random() * (maxActive - minActive + 1) + minActive);
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(i < numberActive);
  }
  return shuffle(arr);
};

const updateInterval = 2000; // ms

const AboutYou = () => {

  const items = [];

  const queryResult = useStaticQuery(
    graphql`
      {
        contentfulConfigurationItem(name: {eq: "How it works - about you list"}) {
          data {
            stringArray
          }
        }
      }
  `);

  if (queryResult.contentfulConfigurationItem) {
    queryResult.contentfulConfigurationItem.data.stringArray.forEach((item) => {
      items.push(item);
    });
  } else {
    items.push(...defaultItems);
  }

  const [activeArray, setActiveArray] = useState(randomiseArray(items.length, 2, items.length - 1));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveArray(randomiseArray(items.length, 2, items.length - 2));
    }, updateInterval);
    return () => clearInterval(interval);
  }, [items]);

  return <Wrapper>

    { items.map( (el, index) =>
      <Item key={index} className={ activeArray[index] ? ' active': '' }>
        { el }
      </Item>
    ) }

  </Wrapper>;
};

export default AboutYou;
