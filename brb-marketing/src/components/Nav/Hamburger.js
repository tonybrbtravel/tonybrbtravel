import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  width: 30px;
  height: 3px;
  background-color: currentColor;
  position: relative;

  &::before {
    content: '';
    width: 30px;
    height: 3px;
    background-color: currentColor;
    top: -8px;
    position: absolute;
  }

  &::after {
    content: '';
    width: 30px;
    height: 3px;
    background-color: currentColor;
    top: 8px;
    position: absolute;
  }
`;

const Wrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 18px;

  @media screen and (min-width: 600px) {
    display: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

// eslint-disable-line react/prefer-stateless-function
class Hamburger extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Menu />
      </Wrapper>
    );
  }
}

export default Hamburger;
