/**
 *
 * SelectableSlat
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Block = styled.div`
  border: 1px solid #efefef;
  border-radius: 6px;
  padding: 12px;
  background-color: ${(props) => (props.toggled ? '#EFEFEF' : 'white')};
  color: ${(props) => (props.toggled ? '#BEBEBE' : 'black')};
  transform: scale(1);

  transition: color 200ms, background-color 200ms, transform 100ms;

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    cursor: pointer;
  }
`;

class SelectableSlat extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = { toggled: false };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
    this.setState((prevState) => ({
      toggled: !prevState.toggled,
    }));
  }

  render() {
    const { text, toggled } = this.props;
    return (
      <Block toggled={toggled} onClick={this.handleToggle}>
        {text}
      </Block>
    );
  }
}

SelectableSlat.propTypes = {
  text: PropTypes.string,
};

export default SelectableSlat;
