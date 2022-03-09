/**
 *
 * Button
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../themes/Colors';
// import LoadingSpinner from '../LoadingSpinner';

const Wrapper = styled.div`
  padding: 0 20px;
  text-align: center;
`;

const Btn = styled.div`
  background-color: ${Colors.red};
  color: white;
  font-size: ${(props) => (props.small ? '16px' : '18px')};
  line-height: ${(props) => (props.small ? '16px' : '18px')};
  border-radius: ${(props) => (props.small ? '3px' : '6px')};
  padding: ${(props) => (props.small ? '12px' : '20px')};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  transition: background-color 0.1s;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
  margin: 0 6px;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }

  @media screen and (min-width: 600px) {
    font-size: ${(props) => (props.small ? '16px' : '22px')};
    line-height: ${(props) => (props.small ? '16px' : '22px')};
  }
`;

class Button extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      onClick, disabled, noWrap, small,
    } = this.props;

    const button = <Btn onClick={onClick} disabled={disabled} small={small} />;

    if (noWrap) {
      return button;
    }

    return (
      <Wrapper>
        {button}
      </Wrapper>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  noWrap: PropTypes.bool,
  small: PropTypes.bool,
};

Button.defaultProps = {
  onClick: null,
  disabled: false,
  noWrap: false,
  small: false,
};

export default Button;
