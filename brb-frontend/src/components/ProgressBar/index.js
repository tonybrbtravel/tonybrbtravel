/**
 *
 * ProgressBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../themes/Colors';

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 12px;

  p {
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
`;

const Segment = styled.div`
  background-color: ${(props) => (props.complete ? Colors.red : Colors.lightShadow)};
  height: 10px;
  flex-direction: row;
  flex-grow: 1;
  text-align: center;
  font-size: 12px;
  color: ${(props) => (props.currentStep ? Colors.red : Colors.lightShadow)};
  border-right: 1px solid white;

  &:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  &:last-of-type {
    border-radius: 0 5px 5px 0;
    border-right: none;
  }

  &::after {
    content: ${(props) => (props.afterText ? `${props.afterText}` : '')};
  }
`;

class ProgressBar extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { steps, currentStep } = this.props;
    const stepIndex = currentStep - 1;

    return (
      <Wrapper>
        {steps.map((segment, index) => (
          <Segment
            key={segment}
            afterText={segment}
            currentStep={index === stepIndex}
            complete={index <= stepIndex}
          />
        ))}
        <p>
          step
          {' '}
          {currentStep}
          {' '}
          of
          {' '}
          {steps.length}
        </p>
      </Wrapper>
    );
  }
}

ProgressBar.propTypes = {};

export default ProgressBar;
