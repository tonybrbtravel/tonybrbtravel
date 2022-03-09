import React from 'react';
import styled from 'styled-components';

import Colors from '../../themes/Colors';

export const SubmitButton = (props) => {
  let fontColour;
  let borderColour;
  let backgroundColour;
  if (props.blue) {
    backgroundColour = props.inActive ? '#9FA2A5' : Colors.blue;
  } else {
    backgroundColour = props.inActive ? '#e0e0eb' : Colors.red;
  }

  const Btn = styled.input.attrs({
    type: 'submit',
  })`
      width: 100%;
      background-color: ${backgroundColour};
      color: ${(props) => (props.inActive ? 'white' : 'white')};
      font-size: ${(props) => (props.small ? '16px' : '18px')};
      font-weight: 600;
      line-height: 18px;
      border-radius: 6px;
      padding: 20px;
      transition: background-color 0.1s;
      display: block;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      }

      @media screen and (min-width: 600px) {
        font-size: ${(props) => (props.small ? '16px' : '18px')};
        line-height: ${(props) => (props.small ? '16px' : '18px')};
      }
    `;

  return <Btn {...props} />;
};
