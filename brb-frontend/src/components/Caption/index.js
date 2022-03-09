import React from 'react';
import styled from 'styled-components';

const SubText = styled.p`
  font-size: 14px;
  line-height: 18px;
  @media screen and (min-width: 600px) {
    font-size: 18px;
    line-height: 23px;
  }
`;

export const StyledPoints = styled.div`
  @media screen and (max-width: 600px) {
    font-size: 10px;
    width: 150px;
    height: 15px;
    padding: 2px;
  }
  width: 258px;
  height: 33px;
  border-radius: 200px;
  font-size: 16px;
  margin-top: 20px;
  border: 1px solid black;
  margin: auto;
`;

export const StyledSubHeading = styled.span`
@media screen and (max-width: 600px) {
  font-size: ${(props) => props.mobileFontSize};
  margin-top: ${(props) => (props.mobileMarginTop ? props.mobileMarginTop : '0px')};
}
@media screen and (min-width: 600px) {
  font-size: ${(props) => props.webFontSize};
  margin-top: ${(props) => (props.webMarginTop ? props.webMarginTop : '0px')};
}
`;

export const Caption = (props) => <SubText {...props}>{props.children}</SubText>;
