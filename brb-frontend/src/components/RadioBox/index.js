/**
 *
 * RadioBox
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from './styles';

// eslint-disable-line react/prefer-stateless-function
class RadioBox extends React.PureComponent {
  handleClick = () => {
    const {
      name, value, onChange, onClick,
    } = this.props;
    if (onChange) {
      onChange(name, value);
    } else {
      onClick();
    }
  };

  render() {
    const {
      text, image, selected, selectedText,
    } = this.props;
    return (
      <Container
        bg={image}
        selected={selected}
        onClick={this.handleClick}
        onTouchStart={() => {}}
        selectedText={selectedText}
      >
        <p>{text}</p>
      </Container>
    );
  }
}

RadioBox.propTypes = {
  text: PropTypes.string,
  image: PropTypes.string,
  selected: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.any,
};

export default RadioBox;
