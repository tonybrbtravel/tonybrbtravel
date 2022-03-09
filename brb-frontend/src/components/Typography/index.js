import React from 'react';
import styled from 'styled-components';

const Div = styled.h3`
  margin: 0;
  text-align: center;
  
  font-size: ${(props) => (props.mobileFontSize ? props.mobileFontSize : '14px')};
  line-height: 18px;
  margin-bottom: 18px;
  letter-spacing: 0px;
  @media screen and (min-width: 600px) {
    font-size: ${(props) => (props.webFontSize ? props.webFontSize : '24px')};
    line-height: 30px;
    margin-bottom: 22px;
    text-align: center;
  }
`;

export function Typography(props) {
  return <Div {...props}>{props.children}</Div>;
}
