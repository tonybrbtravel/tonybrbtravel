/**
 *
 * ModalWindow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Colors from '../../themes/Colors';

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(53, 53, 53, 0.5);
  justify-content: center;
  align-items: center;
  padding: 12px;
  opacity: ${(props) => (props.active ? '1' : '0')};
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};

  transition: opacity 300ms;

  z-index: 9999;
`;

const Container = styled.div`
  padding: 0px 20px 40px 20px;
  background-color: white;
  border-radius: 6px;
  width: 100%;
  max-width: 700px;
  text-align: center;
  pointer-events: ${(props) => (props.active ? 'auto' : 'none')};
  transition-delay: 300ms;
  transform: ${(props) => (props.active ? 'scale(1)' : 'scale(1.5)')};
  opacity: ${(props) => (props.active ? '1' : '0')};
  transition: transform 300ms, opacity 100ms;

  h2 {
    font-size: 32px;
    line-height: 61px;
    letter-spacing: -1.5px;
    margin-bottom: 0px;
  }

  p {
    font-size: 16px !important;
    font-weight: 500;
  }
`;

const A = styled.a`
  color: ${Colors.red};
  text-decoration: underline;
  font-size: 18px;
  font-weight: 500;
`;

class ModalWindow extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = { modalOpen: this.props.active };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    const { active, closeModal, cancelOverride } = this.props;
    return (
      <Wrapper active={active}>
        <Container active={active}>
          <div>{this.props.children}</div>
          <A onClick={closeModal}>{cancelOverride || 'Cancel'}</A>
        </Container>
      </Wrapper>
    );
  }
}

ModalWindow.propTypes = {
  active: PropTypes.bool,
  closeModal: PropTypes.any,
  children: PropTypes.any,
  cancelOverride: PropTypes.string,
};

export default ModalWindow;
