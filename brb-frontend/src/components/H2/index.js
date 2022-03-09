import React from 'react';
import styled from 'styled-components';

const Div = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 18px;
  letter-spacing: -0.02em;

  @media screen and (min-width: 600px) {
    font-size: 2.5rem;
    line-height: 61px;
    margin-bottom: 22px;
  }
`;

export function H2(props) {
  return <Div {...props}>{props.children}</Div>;
}
