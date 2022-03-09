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
    const { name, value, onChange } = this.props;
    onChange(name, value);
  };

  render() {
    const { text, image, selected } = this.props;
    return (
      <Container
        bg={image}
        selected={selected}
        onClick={this.handleClick}
        onTouchStart={() => {}}
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
