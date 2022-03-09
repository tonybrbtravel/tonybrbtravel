/**
 *
 * StickyButton
 *
 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Colors from '../../themes/Colors';
import Button from '../Button';

const FixedContainer = styled.div`
  position: -webkit-sticky; /* Safari */
  position: fixed;
  bottom: ${window.innerWidth < 700 ? '70px' : '0px'};
  left: 0;
  width: 100%;
  border-top: 1px solid #efefef;
  background-color: white;

  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    --safe-area-inset-bottom: env(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const CTAContainer = styled.div`
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding: 18px;
`;

const InactiveButton = styled(Button)`
  opacity: 0.3;
  cursor: default;

  &:hover {
    transform: translate(0);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: ${Colors.lightShadow};
  width: 100%;
  min-width: 320px;
  max-width: 600px;
  left: 50%;
  margin-left: -50%;
  bottom: 80px;
  text-align: center;
  border-radius: 3px;
  padding: 8px;
  font-size: 14px;
  transform: ${(props) => (props.active ? 'rotateY(0deg) scale(1)' : 'rotateY(90deg) scale(0.5)')};
  opacity: ${(props) => (props.active ? '1' : '0')};
  transition: transform 500ms, opacity 100ms;

  &::before {
    width: 20px;
    z-index: -1;
    height: 20px;
    background-color: inherit;
    content: "";
    border-radius: 3px;
    position: absolute;
    left: 50%;
    margin-left: -10px;
    transform: rotate(45deg);
    bottom: -5px;
  }
`;

function StickyButton(props) {
  if (props.inActive) {
    return (
      <FixedContainer>
        <CTAContainer>
          <Tooltip active={props.tooltipActive}>{props.tooltipMessage}</Tooltip>
          <InactiveButton>{props.children}</InactiveButton>
        </CTAContainer>
      </FixedContainer>
    );
  }
  return (
    <FixedContainer isTop={props.displayTop}>
      <CTAContainer>
        <Tooltip active={props.tooltipActive}>{props.tooltipMessage}</Tooltip>
        <Button onClick={props.onClick}>{props.children}</Button>
      </CTAContainer>
    </FixedContainer>
  );
}

StickyButton.propTypes = {
  onClick: PropTypes.any,
  children: PropTypes.any,
  inActive: PropTypes.bool,
  tooltipActive: PropTypes.bool,
  tooltipMessage: PropTypes.string,
};

export default StickyButton;
